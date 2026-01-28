import express from "express";
import bcrypt from "bcrypt";
import { UserModel, contentModel, linkModel } from "./db.js";
import { userMiddleware } from "./userMiddleware.js";
import { GenerateID } from "./utils/utils.js";
import { GenerateToken } from "./utils/jwtToken.js";
import { signupSchema, signinSchema } from "./signupSchema.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT =  process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://almirah-vault.vercel.app/"
  ],
  credentials: true
}));
//signup endpoint
app.post("/api/v1/signup", async (req, res) => {

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
    res.json({ message: "Successfully Signed Up", token });
  } catch (e) {
    res.status(400).json({ message: "username already taken" });
  }
});

//signin endpoint
app.post("/api/v1/signin", async (req, res) => {
  const userDetails = signinSchema.safeParse(req.body);
  if (!userDetails.success) {
    return res.json({ message: userDetails.error.issues[0]?.message });
  }
 
  const { email, password } = userDetails.data;
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: "user not found" });
  }


  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (passwordMatch) {
    const token = GenerateToken(existingUser._id.toString());
    res.json({ message: "welcome back", token });
  }
});

//contents endpoint
app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;

  await contentModel.create({
    title,
    link,
    userId: req.userId,
    tags: [],
  });

  res
    .status(200)
    .json({ message: "content added successfully", contents: { link, title } });
});

//getting the contents
app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const contents = await contentModel
    .find({
      userId: userId,
    })
    .populate("userId", "username");

  res.status(200).json({
    contents,
  });
});

//deleting the contents
app.delete("/api/v1/content/:contentId", userMiddleware, async (req, res) => {
  const { contentId } = req.params;
  try {
    await contentModel.deleteOne({
      userId: req.userId,
      _id: contentId
    });

    res.status(200).json({ messsage: "content deleted" });
  } catch (e) {
    res.status(400).json({ message: "error while deleting the contents" });
  }
});

//enable share brain
app.post("/api/v1/sharebrain", userMiddleware, (req, res) => {
  const share = req.body.share;
  if (share) {
    linkModel.create({
      userId: req.userId,
      linkId: GenerateID(),
    });
    res
      .status(200)
      .json({ message: "your link is activated!! ready to share" });
  }
});

//share brain
app.get("/api/v1/sharebrain/:sharebrain", async (req, res) => {
  const linkId = req.params.sharebrain;

  const link = await linkModel.findOne({
    linkId,
  });

  if (!link) {
    res.status(400).json({ message: "sorry invalid url" });
  } else {
    const contents = await contentModel
      .find({
        userId: link.userId,
      })
      .populate("userId", "username");

    res.status(200).json(contents);
  }
});

app.listen(PORT);
