import { AiOutlineYoutube } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { PiBrainBold } from 'react-icons/pi';
import { PiSignOutBold } from 'react-icons/pi';
import { useRecoilState } from 'recoil';
import { logoutAtom } from '../storeAtoms/Atoms';

interface SideBarItems {
  title: string;
  icon: React.ReactNode;
}

const sideBarItems: SideBarItems[] = [
  {
    title: 'Yotube',
    icon: <AiOutlineYoutube />,
  },
  {
    title: 'Twitter',
    icon: <FaXTwitter />,
  },
  {
    title: 'LinkedIn',
    icon: <FaLinkedinIn />,
  },
  {
    title: 'Pinterest',
    icon: <FaPinterestP />,
  },
];

export function SideBar({}) {
  //handlin the logout functionality
  const [logoutOpen, setLogOut] = useRecoilState(logoutAtom);
  function handleClose() {
    setLogOut(!logoutOpen);
  }
  return (
    <div className="h-screen w-12 bg-cream border-r md:w-24">
      <span className="text-3xl flex justify-center items-center pt-2 md:text-4xl">
        <PiBrainBold />
      </span>
      <div className="pt-10 text-4xl md:pt-20 space-y-64">
        <ul className="space-y-8">
          {sideBarItems.map((item) => (
            <li
              className="w-fit mx-auto p-2 border-2 rounded-md bg-white cursor-pointer
                                shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1
                      active:translate-y-1 transition-all duration-300 text-sm md:text-2xl"
            >
              {item.icon}
            </li>
          ))}
        </ul>
        <div
          className="w-fit mx-auto p-2 border-2 rounded-md bg-white cursor-pointer
                        shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1
                      active:translate-y-1 transition-all duration-300 text-sm md:text-2xl"
          onClick={handleClose}
        >
          <PiSignOutBold />
        </div>
      </div>
    </div>
  );
}
