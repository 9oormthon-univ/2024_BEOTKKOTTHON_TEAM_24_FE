import { create } from 'zustand';

interface Remind {
  answer: string;
  setAnswer: (input: string) => void;
}

export const useRemind = create<Remind>((set) => ({
  answer: '',
  setAnswer: (input: string) => set({ answer: input }),
}));
