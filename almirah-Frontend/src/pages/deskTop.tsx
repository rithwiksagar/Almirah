import { useState } from "react";
import { ContentModal } from "../components/modal/ContentModal";
import { Card } from "../components/ui/Card";
import { Header } from "../components/Header";
import { SideBar, type FilterType } from "../components/sideBar";

import { useContent } from "../hooks/useContent";
import { LogoutModal } from "../components/modal/LogoutModal";
import axios from "axios";
import { contentAtom } from "../storeAtoms/Atoms";
import { useRecoilState } from "recoil";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function getContentType(url: string) {
  try {
    const host = new URL(url).hostname.replace("www.", "");

    if (host === "youtu.be" || host === "youtube.com") {
      return "youtube";
    }

    if (
      host === "x.com" ||
      host === "twitter.com" ||
      host === "mobile.twitter.com"
    ) {
      return "twitter";
    }

    return "other";
  } catch {
    return "other";
  }
}

export function DeskTop() {
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const contents = useContent();
  const [, setContents] = useRecoilState(contentAtom);

  const toggleModal = () => setModal(!modal);

  async function handleDelete(contentId: string) {
    const response = await axios.delete(
      `${BACKEND_URL}/api/v1/content/${contentId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      setContents((prev) => prev.filter((c) => c._id !== contentId));
    }
  }

  const filteredContents = contents.filter(({ title, tags, link }) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      title.toLowerCase().includes(q) ||
      (tags || []).some((tag) =>
        tag.title.toLowerCase().includes(q)
      );

    const matchesFilter =
      filter === "all" ||
      getContentType(link || "") === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="overflow-x-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-lightPink bg-[radial-gradient(#D3D3D3_1px,transparent_1px)] [background-size:16px_16px]" />

      <aside className="w-24 text-gray-500 h-full fixed left-0 top-0">
        <SideBar filter={filter} setFilter={setFilter} />
      </aside>

      <Header
        toggleModal={toggleModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 pl-4 pt-20 ml-12 md:ml-24">
        {filteredContents.length === 0 && searchQuery.trim() ? (
          <p className="text-gray-400 text-sm pt-8 pl-2">
            No results for "{searchQuery}"
          </p>
        ) : (
          <div className="flex flex-col md:flex-row flex-wrap gap-2">
            {filteredContents.map(({ _id, title, link, tags }) => (
              <Card
                key={_id}
                _id={_id}
                title={title}
                URL={link || ""}
                tags={tags || []}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <ContentModal modal={modal} toggleModal={toggleModal} />
      <LogoutModal />
    </div>
  );
}