import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAddressesApi } from '@/api/addressApi';
import { fetchPaymentMethodsApi } from '@/api/paymentApi';

interface AppState {
  user: any | null;
  token: string | null;
  addresses: any[];
  paymentMethods: any[];
  currentAddress: string;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  setAddresses: (addresses: any[]) => void;
  setPaymentMethods: (methods: any[]) => void;
  setCurrentAddress: (address: string) => void;
  loadAddresses: () => Promise<void>;
  loadPaymentMethods: () => Promise<void>;
  logout: () => void;
  justLoggedIn: boolean;
  setJustLoggedIn: (val: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      addresses: [],
      paymentMethods: [],
      currentAddress: 'Halal Lab office',
      justLoggedIn: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAddresses: (addresses) => set({ addresses }),
      setPaymentMethods: (methods) => set({ paymentMethods: methods }),
      setCurrentAddress: (address) => set({ currentAddress: address }),
      setJustLoggedIn: (val) => set({ justLoggedIn: val }),
      logout: () => set({ user: null, token: null, addresses: [], paymentMethods: [] }),
      loadAddresses: async () => {
        const token = get().token;
        if (!token) return;
        try {
          const addresses = await fetchAddressesApi(token);
          set({ addresses });
        } catch (error) {
          console.error('Error loading addresses:', error);
        }
      },
      loadPaymentMethods: async () => {
        const token = get().token;
        if (!token) return;
        try {
          const methods = await fetchPaymentMethodsApi(token);
          set({ paymentMethods: methods });
        } catch (error) {
          console.error('Error loading payments:', error);
        }
      },
    }),
    {
      name: 'plateform-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
