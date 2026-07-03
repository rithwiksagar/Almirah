import { IoAddOutline } from 'react-icons/io5';
import { RiShareForwardFill } from 'react-icons/ri';
import { InputBox } from './ui/inputBox';
import { Button } from './ui/Button';
import { IoSearch } from 'react-icons/io5';

type ContentProps = {
  toggleModal: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
};

export function Header({ toggleModal, searchQuery, setSearchQuery }: ContentProps) {
  return (
    <div className="flex justify-between m-3 pb-2 pl-28 w-screen fixed">
      <InputBox
        variant="primary"
        type="text"
        placeholder="Search for something..."
        endIcon={<IoSearch />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex pr-6">
        <Button
          variant="secondary"
          size="lg"
          title="Add Content"
          onClick={toggleModal}
          startIcon={<IoAddOutline className="w-7 h-7" />}
        />
        <Button
          variant="primary"
          size="lg"
          title="Share Brain"
          startIcon={<RiShareForwardFill className="w-6 h-6" />}
        />
      </div>
    </div>
  );
}