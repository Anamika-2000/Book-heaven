import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

interface UserState {
  username: string | null;
}

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    username: null,
  },
  effects: [localStorageEffect('user')],
});
