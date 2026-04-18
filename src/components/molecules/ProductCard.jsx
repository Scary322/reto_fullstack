import "../atoms/product/ProductImage"
import "../atoms/product/ProductTitle"
import "../atoms/product/ProductRate"
import "../atoms/product/ProductPrice"
import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import { imageMap } from "../../assets/imageMap";

function ProductCard({ product }) {
    // Resuelve el string de la imagen (ej: "01_item.jpg") al asset importado por Vite
    const resolvedImage = imageMap[product.image] ?? product.image;

    return (<div className="border rounded-lg p-4 shadow-md w-[180px] m-2">
        <ProductImage src={resolvedImage} alt={product.title}  />
        <ProductTitle title={product.title} />
        <ProductPrice price={product.price} />
        <ProductRate rate={product.rate} />
    </div>);
}
export default ProductCard;