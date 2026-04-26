import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { subscribeToAuthChanges } from '../../../firebase/auth';
import useCartStore from '../../../store/cartStore';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart, getTotalItems, getTotalPrice } = useCartStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleConfirmPurchase = () => {
    clearCart();
    navigate('/gallery', { replace: true });
  };

  if (totalItems === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="card-bg rounded-3xl shadow-md p-10 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Resumen de compra</h1>
          <p className="text-secondary mb-6">No hay productos en el carrito.</p>
          <Link
            to="/gallery"
            className="inline-flex items-center px-6 py-3 bg-[var(--color-brand-blue)] text-white rounded-xl hover:bg-[var(--color-accent)] transition-colors"
          >
            Ir a la galería
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Resumen de compra</h1>
          <p className="text-secondary mt-2">Revisa los productos antes de confirmar tu pedido.</p>
        </div>
        <div className="rounded-3xl bg-[var(--color-brand-muted)] p-5 text-sm text-secondary border border-[var(--color-brand-blue)]">
          <p className="font-semibold text-primary">{user ? `Comprando como ${user.name}` : 'Comprando como invitado'}</p>
          <p>{user ? user.email : 'Inicia sesión para guardar tu compra en tu cuenta'}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="card-bg rounded-3xl shadow-sm p-6 flex gap-4">
              <img
                className="w-28 h-28 object-cover rounded-2xl"
                src={item.product.image}
                alt={item.product.title}
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-primary">{item.product.title}</h2>
                <p className="text-sm text-secondary mt-1 line-clamp-2">{item.product.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <span className="font-medium text-primary">Cantidad: {item.quantity}</span>
                  <span className="text-secondary">Precio unitario: ${item.product.price}</span>
                  <span className="font-semibold text-primary">Subtotal: ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="card-bg rounded-3xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Resumen de pago</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-secondary">
                <span>Productos</span>
                <span>{totalItems} {totalItems === 1 ? 'unidad' : 'unidades'}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div className="border-t border-[var(--color-brand-blue)] pt-4 flex justify-between items-center text-xl font-semibold text-primary">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="card-bg rounded-3xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Detalles de envío</h3>
            <p className="text-secondary mb-4">Estos datos son un resumen. Si deseas, completa la información final en una pasarela de pago real.</p>
            <div className="space-y-2 text-sm text-secondary">
              <p><span className="font-semibold text-primary">Nombre:</span> {user ? user.name : 'Invitado'}</p>
              <p><span className="font-semibold text-primary">Correo:</span> {user ? user.email : 'No disponible'}</p>
              <p><span className="font-semibold text-primary">Dirección:</span> {user ? 'Dirección registrada en perfil' : 'No disponible'}</p>
            </div>
          </div>

          <button
            onClick={handleConfirmPurchase}
            className="w-full rounded-3xl bg-[var(--color-brand-blue)] px-6 py-4 text-white text-lg font-semibold hover:bg-[var(--color-accent)] transition-colors"
          >
            Confirmar compra
          </button>
        </div>
      </div>
    </div>
  );
}
