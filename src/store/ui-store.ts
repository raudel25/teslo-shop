import { create } from "zustand";

interface State {
  isSideMenu: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const uiStore = create<State>()((set) => ({
  isSideMenu: false,
  openSideMenu: () => set({ isSideMenu: true }),
  closeSideMenu: () => set({ isSideMenu: false }),
}));
