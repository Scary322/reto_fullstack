import "../atoms/product/ProductImage"
import "../atoms/product/ProductTitle"
import "../atoms/product/ProductRate"
import "../atoms/product/ProductPrice"
import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import imagen_producto_mock from "../../assets/bolso.jpg"

function ProductCard({ product }) {
    return (<>
        <ProductImage src={imagen_producto_mock} alt="Bolso"  />
        <ProductTitle title="Bolso" />
        <ProductPrice price="$19.99" />
        <ProductRate rate={4.5} />
    </>);
}
export default ProductCard;