import { useState, useEffect } from "react";
import ProductCard from "../../molecules/ProductCard";
import { getProducts } from "../../../firebase/products";

export default function Gallery() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, []);
    
    

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedProducts = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    
    return (
    <section className="p-6">
        <h2 className="text-2xl font-bold mb-6">Nuestros Productos</h2>
        
        {/* Campo de búsqueda */}
        <div className="mb-6">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos por nombre..."
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>

        {/* Grid Layout Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {paginatedProducts.map((producto) => (
                <ProductCard key={producto.id} product={producto} />
            ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
                <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="px-4 py-2 border rounded disabled:opacity-50">
                    ← Anterior
                </button>
                <span className="px-4 py-2">Página {page} de {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="px-4 py-2 border rounded disabled:opacity-50">
                    Siguiente →
                </button>
            </div>
        )}
    </section>
    );
    
}
