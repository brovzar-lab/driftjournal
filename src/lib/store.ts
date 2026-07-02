import { create } from 'zustand';
import { isDemoMode } from './demo';

interface DriftStore {
  dailyCaptureCount: number;
  isPremium: boolean;
  toastMessage: string | null;
  incrementCapture: () => void;
  setIsPremium: (value: boolean) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
}

export const useStore = create<DriftStore>((set) => ({
  dailyCaptureCount: isDemoMode ? 3 : 0,
  isPremium: false,
  toastMessage: null,

  incrementCapture: () => {
    if (isDemoMode) {
      set({ toastMessage: 'Demo mode — not saved' });
      return;
    }
    set((state) => ({ dailyCaptureCount: state.dailyCaptureCount + 1 }));
  },

  setIsPremium: (value) => set({ isPremium: value }),
  showToast: (message) => set({ toastMessage: message }),
  clearToast: () => set({ toastMessage: null }),
}));
