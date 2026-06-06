/*
ProductCard
- Displays a single product: image, category, title, description, rating and price.
- Handles image fallback and dispatches `addToCart` (Redux) when the Add button is clicked.
*/

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Star, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleError = () => {
    setImgSrc(
      `https://via.placeholder.com/200x200?text=${encodeURIComponent(product.title)}`,
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      <div className="relative pt-[100%] bg-gray-50">
        <img
          src={imgSrc}
          alt={product.title}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="inline-block px-2 py-1 text-xs font-semibold tracking-wide uppercase bg-blue-100 text-blue-800 rounded-full mb-2 self-start">
          {product.category}
        </div>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 h-14">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center mb-4">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium text-gray-600">
            {product.rating?.rate} ({product.rating?.count} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
