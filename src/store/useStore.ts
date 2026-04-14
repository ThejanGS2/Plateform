import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAddressesApi } from '@/api/addressApi';
import { fetchPaymentMethodsApi } from '@/api/paymentApi';
import { fetchFoodsApi, addFoodApi, updateFoodApi, deleteFoodApi, fetchCategoriesApi } from '@/api/foodApi';
import { fetchAllOrdersApi, fetchMyOrdersApi, updateOrderStatusApi, placeOrderApi } from '@/api/orderApi';
import { fetchUsersApi } from '@/api/userApi';

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  _id: string;
  user: any;
  items: Array<{
    food: any;
    quantity: number;
    size: string;
    price: number;
  }>;
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  createdAt: string;
  // UI helper fields
  distance?: string;
  time?: string;
}

export interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: any;
  imageUrl: string;
  isAvailable: boolean;
  rating?: number;
}

export interface Category {
  _id: string;
  name: string;
  imageUrl?: string;
}

// Removing INITIAL_ORDERS

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
  logout: () => void;
  loadAddresses: () => Promise<void>;
  loadPaymentMethods: () => Promise<void>;
  justLoggedIn: boolean;
  setJustLoggedIn: (val: boolean) => void;
  orders: Order[];
  foods: Food[];
  categories: Category[];
  users: any[];
  loadOrders: (status?: string) => Promise<void>;
  updateOrderStatusRemote: (id: string, status: OrderStatus, locData?: any) => Promise<void>;
  loadFoods: () => Promise<void>;
  loadCategories: () => Promise<void>;
  loadUsers: () => Promise<void>;
  addProduct: (data: any) => Promise<void>;
  updateProduct: (id: string, data: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  placeNewOrder: () => Promise<void>;
  cart: any[];
  addToCart: (food: Food, size: string, qty: number) => void;
  updateCartQty: (foodId: string, size: string, delta: number) => void;
  removeFromCart: (foodId: string, size: string) => void;
  clearCart: () => void;
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
      orders: [],
      foods: [],
      categories: [],
      users: [],
      loadOrders: async (status) => {
        const token = get().token;
        if (!token) return;
        try {
          // If Admin/Chef, fetch all. If customer, fetch my. 
          // For simplicity in this demo, Admin/Chef screens call this with status
          const role = get().user?.role;
          const data = (role === 'ADMIN' || role === 'CHEF' || role === 'DRIVER') 
            ? await fetchAllOrdersApi(token, status)
            : await fetchMyOrdersApi(token);
          set({ orders: data });
        } catch (error) {
          console.error('Error loading orders:', error);
        }
      },
      updateOrderStatusRemote: async (id: string, status: OrderStatus, locData?: any) => {
        const token = get().token;
        if (!token) return;
        try {
          await updateOrderStatusApi(token, id, { status, ...locData });
          // Refresh orders after update
          const role = get().user?.role;
          const data = (role === 'ADMIN' || role === 'CHEF' || role === 'DRIVER') 
            ? await fetchAllOrdersApi(token)
            : await fetchMyOrdersApi(token);
          set({ orders: data });
        } catch (error) {
          console.error('Error updating order status:', error);
        }
      },
      loadFoods: async () => {
        try {
          const data = await fetchFoodsApi();
          set({ foods: data });
        } catch (error) {
          console.error('Error loading foods:', error);
        }
      },
      loadCategories: async () => {
        try {
          const data = await fetchCategoriesApi();
          set({ categories: data });
        } catch (error) {
          console.error('Error loading categories:', error);
        }
      },
      loadUsers: async () => {
        const token = get().token;
        if (!token) return;
        try {
          const data = await fetchUsersApi(token);
          set({ users: data });
        } catch (error) {
          console.error('Error loading users:', error);
        }
      },
      addProduct: async (data) => {
        const token = get().token;
        if (!token) return;
        await addFoodApi(token, data);
        await get().loadFoods();
      },
      updateProduct: async (id, data) => {
        const token = get().token;
        if (!token) return;
        await updateFoodApi(token, id, data);
        await get().loadFoods();
      },
      deleteProduct: async (id) => {
        const token = get().token;
        if (!token) return;
        await deleteFoodApi(token, id);
        await get().loadFoods();
      },
      placeNewOrder: async () => {
        const { token, cart, currentAddress } = get();
        if (!token || cart.length === 0) return;

        const subtotal = cart.reduce((sum, item) => sum + (item.food.price * item.qty), 0);
        const deliveryFee = 10;
        const totalAmount = subtotal + deliveryFee;

        const orderData = {
          totalAmount,
          deliveryAddress: currentAddress,
          items: cart.map(item => ({
            food: item.food._id,
            quantity: item.qty,
            size: item.size,
            price: item.food.price
          }))
        };

        try {
          await placeOrderApi(token, orderData);
          set({ cart: [] }); 
          await get().loadOrders();
        } catch (error) {
          console.error('Error in placeNewOrder store action:', error);
          throw error;
        }
      },
      logout: () => set({ user: null, token: null, addresses: [], paymentMethods: [], orders: [], foods: [] }),
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
      cart: [],
      addToCart: (food, size, qty) => {
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex(item => item.food._id === food._id && item.size === size);
        
        if (existingIndex > -1) {
          const updatedCart = [...currentCart];
          updatedCart[existingIndex].qty += qty;
          set({ cart: updatedCart });
        } else {
          set({ cart: [...currentCart, { id: Math.random().toString(), food, size, qty }] });
        }
      },
      updateCartQty: (foodId, size, delta) => {
        const updatedCart = get().cart.map(item => {
          if (item.food._id === foodId && item.size === size) {
            return { ...item, qty: Math.max(1, item.qty + delta) };
          }
          return item;
        });
        set({ cart: updatedCart });
      },
      removeFromCart: (foodId, size) => {
        set({ cart: get().cart.filter(item => !(item.food._id === foodId && item.size === size)) });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'plateform-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
