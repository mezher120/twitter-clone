import { atom } from "recoil";

export const modalState = atom({
    key: 'modalState', // unique ID (with respect to other atoms/selectors)
    default: false, // because we want the modal to be close when it starts
  });

export const postStateId = atom({
    key: 'postStateId', // unique ID (with respect to other atoms/selectors)
    default: 'id', // because we want the modal to be close when it starts
  });