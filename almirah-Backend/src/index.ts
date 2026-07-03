import express from 'express';
import bcrypt from 'bcrypt';
import { UserModel, contentModel, linkModel,TagModel } from './db.js';
import { userMiddleware } from './userMiddleware.js';
import { GenerateID } from './utils/utils.js';
import { GenerateToken } from './utils/jwtToken.js';
import { signupSchema, signinSchema } from './signupSchema.js';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
//signup endpoint
app.post('/api/v1/signup', async (req, res) => {
  //zod validation
  const userDetails = signupSchema.safeParse(req.body);
  if (!userDetails.success) {
    return res.json({ message: userDetails.error.issues[0]?.message });
  }
  const { username, email, password } = userDetails.data;

  //password hashing
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    const user = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const token = GenerateToken(user._id.toString());
    res.json({ message: 'Successfully Signed Up', token });
  } catch (e) {
    res.status(400).json({ message: 'username already taken' });
  }
});

app.post('/api/v1/content', userMiddleware, async (req, res) => {
  const { link, title } = req.body;
  const tagTitles: string[] = (req.body.tags || []).slice(0, 4);

  // for each tag string, find existing or create new
  const tagIds = await Promise.all(
    tagTitles.map(async (tagTitle) => {
      const normalized = tagTitle.trim().toLowerCase();
      const existing = await TagModel.findOne({
        title: normalized,
        userId: req.userId,
      });
      if (existing) return existing._id;
      const created = await TagModel.create({
        title: normalized,
        userId: req.userId,
      });
      return created._id;
    })
  );

  const content = await contentModel.create({
    title,
    link,
    tags: tagIds,
    userId: req.userId,
  });

  // populate tags before sending back so frontend gets tag objects
  const populated = await content.populate('tags', 'title');

  res.status(200).json({
    message: 'content added successfully',
    contents: populated,
  });
});

app.get('/api/v1/content', userMiddleware, async (req, res) => {
  const contents = await contentModel
    .find({ userId: req.userId })
    .populate('userId', 'username')
    .populate('tags', 'title');    // add this

  res.status(200).json({ contents });
});

// important: define this BEFORE the /content/:contentId delete route
app.get('/api/v1/content/search', userMiddleware, async (req, res) => {
  const q = (req.query.q as string || '').trim().toLowerCase();
  if (!q) return res.status(400).json({ message: 'query required' });

  // first find matching tag IDs belonging to this user
  const matchingTags = await TagModel.find({
    userId: req.userId,
    title: { $regex: q, $options: 'i' },
  });
  const matchingTagIds = matchingTags.map((t) => t._id);

  const contents = await contentModel
    .find({
      userId: req.userId,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { tags: { $in: matchingTagIds } },
      ],
    })
    .populate('userId', 'username')
    .populate('tags', 'title');

  res.status(200).json({ contents });
});
//deleting the contents
app.delete('/api/v1/content/:contentId', userMiddleware, async (req, res) => {
  const { contentId } = req.params;
  try {
    await contentModel.deleteOne({
      userId: req.userId,
      _id: contentId,
    });

    res.status(200).json({ messsage: 'content deleted' });
  } catch (e) {
    res.status(400).json({ message: 'error while deleting the contents' });
  }
});

//enable share brain
app.post('/api/v1/sharebrain', userMiddleware, (req, res) => {
  const share = req.body.share;
  if (share) {
    linkModel.create({
      userId: req.userId,
      linkId: GenerateID(),
    });
    res
      .status(200)
      .json({ message: 'your link is activated!! ready to share' });
  }
});

//share brain
app.get('/api/v1/sharebrain/:sharebrain', async (req, res) => {
  const linkId = req.params.sharebrain;

  const link = await linkModel.findOne({
    linkId,
  });

  if (!link) {
    res.status(400).json({ message: 'sorry invalid url' });
  } else {
    const contents = await contentModel
      .find({
        userId: link.userId,
      })
      .populate('userId', 'username');

    res.status(200).json(contents);
  }
});

app.listen(PORT);
