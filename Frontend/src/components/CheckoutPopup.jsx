const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="checkoutPopup"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.55)',
        display: 'grid',
        placeItems: 'center',
        padding: '1rem',
        zIndex: 1050,
      }}
    >
      <div
        style={{
          width: 'min(720px, 100%)',
          maxHeight: '85vh',
          overflowY: 'auto',
          background: 'var(--card-bg-clr)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Checkout</h4>
          <button className="btn btn-sm btn-outline-secondary" onClick={handleClose}>
            Close
          </button>
        </div>

        <div className="checkout-items">
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <img
                src={item.imageUrl || item.image || 'https://via.placeholder.com/120x120?text=Item'}
                alt={item.name}
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <div>
                <h6 className="mb-1">{item.name}</h6>
                <p className="mb-1">Quantity: {item.quantity}</p>
                <p className="mb-0">Price: ${Number(item.price || 0) * Number(item.quantity || 0)}</p>
              </div>
            </div>
          ))}

          <div className="total mt-3" >
            <h5>Total: ${totalPrice}</h5>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;