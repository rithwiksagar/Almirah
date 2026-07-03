import type { ReactElement } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { GetPosts } from '../../utils/embedUrl';
import type { TagType } from '../../storeAtoms/Atoms';

interface CardProps {
  title: string;
  URL: string;
  _id: string;
  tags: TagType[];
  onDelete: (contentId: string) => Promise<void>;
}

function getIcon(url: string): ReactElement {
  try {
    const { hostname } = new URL(url);
    if (hostname === 'youtu.be' || hostname.includes('youtube.com'))
      return <FaYoutube className="w-5 h-5 text-red-600" />;
    if (hostname === 'x.com' || hostname.includes('twitter.com'))
      return <FaXTwitter className="w-5 h-5 text-neutral-900" />;
  } catch {}
  return <span className="w-5 h-5" />;
}

export const Card = ({ title, URL, _id, tags, onDelete }: CardProps) => {
  return (
    <div className="p-1 relative">
      <div className="p-4 mt-10 bg-white rounded-md border-2 shadow-[5px_5px_0px_#000] w-58 md:w-72">

        {/* title row */}
        <div className="flex items-center justify-between max-w-54 md:max-w-70">
          <div className="flex items-center space-x-2 font-clashdisplay font-medium">
            {getIcon(URL)}
            <span className="truncate">{title}</span>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <MdEdit className="w-5 h-5 text-neutral-700 cursor-pointer" />
            <MdDelete
              onClick={() => onDelete(_id)}
              className="w-5 h-5 text-neutral-700 cursor-pointer"
            />
          </div>
        </div>

        {/* tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <span
                key={tag._id}
                className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full"
              >
                #{tag.title}
              </span>
            ))}
          </div>
        )}

        {/* embed */}
        <div className="mt-2">
          <GetPosts URLString={URL} />
        </div>

      </div>
    </div>
  );
};