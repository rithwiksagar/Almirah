import { atom } from 'recoil';


export type TagType = {
  _id: string;
  title: string;
};

export type contentType = {
  _id: string;
  title: string;
  link: string;
  tags: TagType[];
};
export const contentAtom = atom<contentType[]>({
  key: 'contentAtom',
  default: [],
});

export const urlAtom = atom({
  key: 'urlAtom',
  default: '',
});

export const logoutAtom = atom({
  key: 'logoutAtom',
  default: false,
});

export const signUpAtom = atom<boolean>({
  key: 'signUpAtom',
  default: true,
});
