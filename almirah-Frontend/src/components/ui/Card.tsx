import type { ReactElement } from 'react';
import { MdDelete } from 'react-icons/md';
import { GetPosts } from '../../utils/embedUrl';
import { MdEdit } from 'react-icons/md';

interface CardProps {
  title: string;
  URL: string;
  icon: ReactElement;
  _id: string;
  onDelete: (contentId: string) => Promise<void>;
}

export const Card = (props: CardProps) => {
  return (
    <div className="p-1 relative">
      <div className="p-4 mt-10 bg-white rounded-md border-2 shadow-[5px_5px_0px_#000] w-58 md:w-72">
        <div className="flex items-center justify-between max-w-54 md:max-w-70">
          <div className="flex items-center justify-center space-x-2 font-clashdisplay font-medium">
            {props.icon}
            <span>{props.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MdEdit className="w-6 h-6 text-neutral-700" />
            <MdDelete
              onClick={() => {
                props.onDelete(props._id);
              }}
              className="w-6 h-6 text-neutral-700 cursor-pointer"
            />
          </div>
        </div>
        <div>
          <GetPosts URLString={props.URL} />
        </div>
      </div>
    </div>
  );
};
