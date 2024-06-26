import { create } from 'zustand';

interface Navigation {
  color: {
    home: string;
    folder: string;
  };
  setNavigation: (input: string) => void;
}

export const useNavigation = create<Navigation>((set) => ({
  color: {
    home: '#3184FF',
    folder: '#A7A7A7',
  },
  setNavigation: (input: string) =>
    set((state: Navigation) => ({
      color: {
        ...state.color,
        home: input === 'home' ? '#3184FF' : '#A7A7A7',
        folder: input === 'folder' ? '#3184FF' : '#A7A7A7',
      },
    })),
}));
