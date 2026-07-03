import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { InputBox } from '../ui/inputBox';
import { Button } from '../ui/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { contentAtom, type contentType } from '../../storeAtoms/Atoms';
import { useSetRecoilState } from 'recoil';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const MAX_TAGS = 4;

type FormData = { title: string; link: string };

type propsType = {
  modal: boolean;
  toggleModal: () => void;
};

export const ContentModal = ({ modal, toggleModal }: propsType) => {
  const setContents = useSetRecoilState(contentAtom);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  function addTag() {
    const trimmed = tagInput.trim().toLowerCase();
    if (!trimmed || tags.includes(trimmed) || tags.length >= MAX_TAGS) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput('');
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  }

  async function addContent({ title, link }: FormData) {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      { title, link, tags },
      { headers: { Authorization: localStorage.getItem('token') } }
    );
    const newItem = response.data.contents;
    setContents((prev: contentType[]) => [...prev, newItem]);
    toggleModal();
    reset();
    setTags([]);
    setTagInput('');
  }

  if (!modal) return null;

  return (
    <div
      onClick={toggleModal}
      className="w-screen h-screen bg-black/70 fixed top-0 left-0 flex justify-center items-center z-50"
    >
      <div
        className="bg-lightPink p-6 rounded-md space-y-4 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-clashdisplay font-semibold text-xl">Add Content</h2>
          <RxCross2
            onClick={toggleModal}
            className="text-xl hover:bg-pink-200 w-fit h-fit p-1 rounded-full cursor-pointer transition-all"
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(addContent)}>
          <InputBox
            {...register('title', { required: true })}
            variant="secondary"
            placeholder="Title..."
          />
          <InputBox
            {...register('link', { required: true })}
            variant="secondary"
            placeholder="Link..."
          />

          {/* tags section */}
          <div className="space-y-2">
            <p className="text-xs font-medium">
              Tags{' '}
              <span className="text-gray-400 font-normal">(up to {MAX_TAGS})</span>
            </p>

            {/* existing tags as pills */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-cream text-xs px-2 py-0.5 rounded-full font-medium"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="cursor-pointer leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* tag input — same style as title/link */}
            {tags.length < MAX_TAGS && (
              <div className="">
                <InputBox
                  variant="secondary"
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <div className='flex justify-center mt-4'>
                     <Button onClick={addTag} type="button" variant="secondary" size="sm" title="Add" />
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400">
              {tags.length < MAX_TAGS
                ? `${MAX_TAGS - tags.length} more tag${MAX_TAGS - tags.length > 1 ? 's' : ''} allowed`
                : 'Max tags reached'}
            </p>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="secondary" size="sm" title="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};