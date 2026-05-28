import { useContext, useMemo, useState } from 'react';
import CheckoutPopup from './CheckoutPopup';
import { AppContext } from '../context/Context';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
    [cart]
  );

  const handleCheckout = () => {
    clearCart();
    setShowCheckout(false);
    alert('Order placed successfully!');
  };

  return (
    <div style={{ padding: '7rem 1rem 2rem', minHeight: '100vh' }}>
      <div className="container" style={{ display: 'block' }}>
        <h2 className="text-center mb-4">Your Cart</h2>

        {!cart.length ? (
          <h4 className="text-center" style={{ padding: '4rem 1rem' }}>
            Your cart is empty.
          </h4>
        ) : (
          <>
            <div className="row g-3">
              {cart.map((item) => (
                <div className="col-12" key={item.id}>
                  <div className="card p-3 d-flex flex-row align-items-center justify-content-between" style={{ paddingTop: 0 }}>
                    <div>
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="mb-1">Brand: {item.brand}</p>
                      <p className="mb-1">Quantity: {item.quantity}</p>
                      <p className="mb-0">Price: ${Number(item.price || 0) * Number(item.quantity || 0)}</p>
                    </div>
                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 p-3 rounded" style={{ background: 'var(--card-bg-clr)' }}>
              <h4 className="mb-0">Total: ${totalPrice.toFixed(2)}</h4>
              <button className="btn btn-primary" onClick={() => setShowCheckout(true)}>
                Checkout
              </button>
            </div>
          </>
        )}

        <CheckoutPopup
          show={showCheckout}
          handleClose={() => setShowCheckout(false)}
          cartItems={cart}
          totalPrice={totalPrice.toFixed(2)}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  )
}

export default Cart