import {
  useContext,
  createContext,
  ReactNode,
  useReducer,
  useEffect,
} from "react";
import reducer from "./reducer";
const url = "https://www.course-api.com/react-useReducer-cart-project";

import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./action";
import { getTotals } from "./utils";

export interface CartItem {
  id: string;
  amount: number;
  title: string;
  price: string;
  img: string;
}

const initialState: AppContextType = {
  loading: false,
  cart: new Map<string, CartItem>([]),
};

interface AppContextType {
  loading: boolean;
  cart: Map<string, CartItem>;
  totalAmount?: number;
  totalCost?: number;

  clearCart?: () => void;
  remove?: (id: string) => void;
  increase?: (id: string) => void;
  decrease?: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(initialState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalAmount, totalCost } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const remove = (id: string) => {
    // console.log("remove:",id);
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increase = (id: string) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decrease = (id: string) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...(state as AppContextType),
        clearCart,
        remove,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within an AppProvider component"
    );
  }
  return context;
};
