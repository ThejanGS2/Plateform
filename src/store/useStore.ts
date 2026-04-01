import { create } from 'zustand';

interface AppState {
  user: any | null;
  currentAddress: string;
  setUser: (user: any) => void;
  setCurrentAddress: (address: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  currentAddress: 'Halal Lab office',
  setUser: (user) => set({ user }),
  setCurrentAddress: (address) => set({ currentAddress: address }),
}));
