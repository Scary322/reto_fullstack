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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu Carrito</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-gray-500 mb-6">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13H5.4m1.6 0h10M9 21h6m-3-3v3" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">¡Agrega algunos productos para comenzar!</p>
            <Link
              to="/gallery"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
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
        <h1 className="text-3xl font-bold text-gray-900">Tu Carrito</h1>
        <button
          onClick={clearCart}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
        >
          Vaciar Carrito
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.product.id} className="p-6 flex items-center">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-md mr-6"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.product.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.product.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold text-gray-900">${item.product.price}</span>
                  <span className="text-gray-500 ml-2">× {item.quantity}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-900">
                  ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
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

        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
              </p>
            </div>
            <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/gallery"
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          ← Continuar Comprando
        </Link>
      </div>
    </div>
  );
}