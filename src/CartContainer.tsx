import CartItem from "./CartItem";
import { useGlobalContext } from "./context";


const CartContainer = () => {
  const {cart, totalCost, clearCart} = useGlobalContext();

  
  // const cartArray:CartItemType[] = cartItems.map((item)=>{
  //   return ({
  //     ...item,
  //     price:Number(item.price),
  //   })
  // });

  // const cartArray = Array.from(cart.entries())

  const cartArray = Array.from(cart.entries()).map(([id, item]) => {
    return {
      ...item,
      id,
      price: Number(item.price), // Convert the price to a number
    };
  });

  if (cartArray.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem) => {
          // const {id,item} = cartItem;
          const {id} = cartItem;
          
          return <CartItem key={id} {...cartItem} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total <span> $ {totalCost?.toFixed(2)}</span>
          </h5>
        </div>
        <button
          className="btn btn-hipster"
          onClick={clearCart}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
