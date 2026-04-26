import { Link } from 'react-router-dom';
import useCartStore from '../../../store/cartStore';

export default function Cart() {
  const { items, removeItem, clearCart, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Tu Carrito</h1>
          <div className="card-bg rounded-lg shadow-md p-8">
            <div className="text-secondary mb-6">
              <svg className="mx-auto h-24 w-24 text-[var(--color-brand-border)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13H5.4m1.6 0h10M9 21h6m-3-3v3" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-primary mb-2">Tu carrito está vacío</h2>
            <p className="text-secondary mb-6">¡Agrega algunos productos para comenzar!</p>
            <Link
              to="/gallery"
              className="inline-flex items-center px-6 py-3 border border-[var(--color-brand-blue)] text-primary rounded-md hover:bg-[var(--color-brand-border)] transition-colors"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Tu Carrito</h1>
        <button
          onClick={clearCart}
          className="px-4 py-2 text-sm font-medium text-red-400 bg-red-900/20 border border-red-800 rounded-md hover:bg-red-900/40 transition-colors"
        >
          Vaciar Carrito
        </button>
      </div>

      <div className="card-bg rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-[var(--color-brand-border)]">
          {items.map((item) => (
            <div key={item.product.id} className="p-6 flex items-center">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-md mr-6"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary">{item.product.title}</h3>
                <p className="text-secondary text-sm mt-1 line-clamp-2">{item.product.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold text-primary">${item.product.price}</span>
                  <span className="text-secondary ml-2">× {item.quantity}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-primary">
                  ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="p-2 text-red-400 hover:bg-red-900/20 rounded-md transition-colors"
                  title="Eliminar producto"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[var(--color-brand-dark)] px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p className="text-lg font-semibold text-primary">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-secondary">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
              </p>
            </div>
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-brand-blue)] text-white font-medium rounded-md hover:bg-[var(--color-accent)] transition-colors"
            >
              Proceder al Pago
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/gallery"
          className="inline-flex items-center px-6 py-3 border border-[var(--color-brand-blue)] text-primary rounded-md hover:bg-[var(--color-brand-border)] transition-colors"
        >
          ← Continuar Comprando
        </Link>
      </div>
    </div>
  );
}