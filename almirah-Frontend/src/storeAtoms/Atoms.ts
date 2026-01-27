import { atom } from "recoil";

export type contentType = {
  _id: string,
  title: string;
  link: string;
};
export const contentAtom = atom<contentType[]>({
  key: "contentAtom",
  default: [],
});

export const urlAtom = atom({
  key: "urlAtom",
  default: "",
});

export const logoutAtom = atom({
  key: "logoutAtom",
  default: false,
});
