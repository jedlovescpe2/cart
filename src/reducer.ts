import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./action";
import { CartItem } from "./context";

interface State {
  cart: Map<string, CartItem>;
}

type Action = {
  type: string;
  payload?: {
    id?: string;
    cart?: Map<string, CartItem>[];
  };
};

const reducer = (state: State, action: Action) => {
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: new Map(),
    };
  }

  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload?.id!);
    return { ...state, cart: newCart };
  }

  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload!.id!;
    const item = newCart.get(itemId);
    const newItem = { ...item!, amount: item!.amount + 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload!.id!;
    const item = newCart.get(itemId);

    if (item?.amount === 1) {
      newCart.delete(item.id);
      return {
        ...state,
        cart: newCart,
      };
    }

    const newItem = { ...item!, amount: item!.amount - 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(
      action.payload?.cart!.map((item:any) => [item.id, item])
    );
    return { ...state, loading: false, cart: newCart};
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default reducer;
