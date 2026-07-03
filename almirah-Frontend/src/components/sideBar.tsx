import { AiOutlineYoutube } from "react-icons/ai";
import { FaLayerGroup, FaXTwitter } from "react-icons/fa6";
import { PiBrainBold, PiSignOutBold } from "react-icons/pi";
import { FaGlobe } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { logoutAtom } from "../storeAtoms/Atoms";

export type FilterType = "all" | "youtube" | "twitter" | "other";

interface SideBarProps {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

const sideBarItems = [
  {
    title: "All",
    value: "all" as FilterType,
    icon: <FaLayerGroup />

  },{
    title: "Youtube",
    value: "youtube" as FilterType,
    icon: <AiOutlineYoutube />,
  },
  {
    title: "Twitter",
    value: "twitter" as FilterType,
    icon: <FaXTwitter />,
  },
  {
    title: "Others",
    value: "other" as FilterType,
    icon: <FaGlobe />,
  },
  
];

export function SideBar({ filter, setFilter }: SideBarProps) {
  const [logoutOpen, setLogout] = useRecoilState(logoutAtom);

  function handleClose() {
    setLogout(!logoutOpen);
  }

  return (
    <div className="h-screen w-12 bg-cream border-r md:w-24">


      <div className="pt-10 text-4xl md:pt-31 space-y-64">
        <ul className="space-y-8">
          {sideBarItems.map((item) => (
            <li
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`w-fit mx-auto p-2 border-2 rounded-md cursor-pointer
              shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1
              active:translate-y-1 transition-all duration-300 text-sm md:text-2xl
              ${
                filter === item.value
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
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