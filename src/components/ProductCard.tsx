import { Link } from "react-router-dom";
import type { Product } from "../data/catalog";
import { categoryName } from "../data/catalog";
import Placeholder from "./Placeholder";
import { HeartIcon } from "./icons";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="card">
      <div className="card-media">
        {product.image ? (
          <>
            <img className="media-img" src={product.image} alt={product.name} loading="lazy" />
            {product.imageHover && (
              <img
                className="media-img media-img--hover"
                src={product.imageHover}
                alt=""
                aria-hidden
                loading="lazy"
              />
            )}
          </>
        ) : (
          <Placeholder tone={product.categorySlug} label={product.name} />
        )}
        <span className="card-fav" aria-hidden>
          <HeartIcon />
        </span>
      </div>
      <div className="card-body">
        <span className="card-cat">{categoryName(product.categorySlug)}</span>
        <span className="card-name">{product.name}</span>
        <div className="card-foot">
          <span className="card-price">€{product.price}</span>
          <span className="btn" style={{ padding: "8px 16px", fontSize: ".85rem" }}>
            View kit
          </span>
        </div>
      </div>
    </Link>
  );
}
