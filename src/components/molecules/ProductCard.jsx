import "../atoms/product/ProductImage"
import "../atoms/product/ProductTitle"
import "../atoms/product/ProductRate"
import "../atoms/product/ProductPrice"
import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";

function ProductCard({ product }) {
    return (<div className="border rounded-lg p-4 shadow-md w-[180px] m-2">
        <ProductImage src={product.image} alt={product.title}  />
        <ProductTitle title={product.title} />
        <ProductPrice price={product.price} />
        <ProductRate rate={product.rate} />
    </div>);
}
export default ProductCard;