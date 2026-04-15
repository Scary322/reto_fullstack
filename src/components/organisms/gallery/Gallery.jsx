import MOCK_PRODUCTS from "../../../mockdata/mock_products";
import ProductCard from "../../molecules/ProductCard";

export default function Gallery() {
    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold mb-6">Nuestros Productos</h2>

            {/* Grid Layout Responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {MOCK_PRODUCTS.map((producto) => (
                <ProductCard key={producto.id} product={producto} />
            ))}
            </div>
        </section>
    );
}