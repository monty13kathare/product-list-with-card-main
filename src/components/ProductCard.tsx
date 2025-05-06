import React, { useState } from 'react';
import type { Product } from '../types';
import "../styles/productCard.scss"

interface ProductCardProps {
    product: Product;
    quantity: number;
    onAdd: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onAdd, onIncrement, onDecrement }) => {


    return (
        <div className="card">
            <div className='img-box'>
                <picture className="image">
                    <source media="(min-width:1024px)" srcSet={product.image.desktop} />
                    <source media="(min-width:768px)" srcSet={product.image.tablet} />
                    <source media="(max-width:767px)" srcSet={product.image.mobile} />
                    <img src={product.image.thumbnail} alt={product.name} className={`${quantity !== 0 ? "active" : ""}`} />
                </picture>
                <div className="action">
                    {quantity === 0 ? (
                        <button className="addBtn" onClick={onAdd}>
                            🛒 Add to Cart
                        </button>
                    ) : (
                        <div className="quantityControl">
                            <button onClick={onDecrement}>−</button>
                            <span>{quantity}</span>
                            <button onClick={onIncrement}>+</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="info">
                <span className="category">{product.category}</span>
                <h3 className="title">{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
            </div>


        </div>
    );
};

export default ProductCard;
