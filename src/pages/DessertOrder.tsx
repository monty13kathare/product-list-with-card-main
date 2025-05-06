import React, { useState } from 'react';
import '../styles/dessertOrder.scss';
import { products } from "../../data"
import ProductCard from '../components/ProductCard';
import OrderConfirmation from '../components/OrderConfirmation';
import emptyImg from "../../public/assets/images/illustration-empty-cart.svg"



type Product = {
    id: number;
    name: string;
    price: number;
    image: {
        thumbnail: string;
        mobile: string;
        tablet: string;
        desktop: string;
    };
};

type CartItem = {
    product: Product;
    quantity: number;
};




const DessertOrder: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);



    const handleStartNewOrder = () => {
        console.log('Starting a new order...');
        setShowModal(false);
        setCart([])
    };




    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    };


    const getQuantity = (productId: number) => {
        const item = cart.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
    };

    const addToCart = (product: Product) => {
        setCart(prev => [...prev, { product, quantity: 1 }]);
    };

    const incrementQuantity = (productId: number) => {
        setCart(prev =>
            prev.map(item =>
                item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (productId: number) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };





    return (
        <div className="container">
            <div className="dessert-order">
                <div className="products">
                    <h2>Desserts</h2>
                    <div className="grid">
                        {products.map((product: any) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                                quantity={getQuantity(product.id)}
                                onAdd={() => addToCart(product)}
                                onIncrement={() => incrementQuantity(product.id)}
                                onDecrement={() => decrementQuantity(product.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="cart">
                    <h3 className='title'>Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
                    <ul>
                        {cart.map(item => (
                            <li key={item.product.id}>
                                <p>{item.product.name}</p>
                                <div className='item-field'>
                                    <p>
                                        <span className='quantity'>{item.quantity}x</span>
                                    </p>
                                    <span className='pTag'>@${item.product.price.toFixed(2)}</span>
                                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                    <button onClick={() => removeFromCart(item.product.id)}>×</button>
                                </div>

                            </li>
                        ))}
                    </ul>
                    {
                        cart.length === 0 ? (
                            <div className="emptyBox">
                                <img src={emptyImg} alt="img" />
                                <p>Your Added items appear here</p>
                            </div>
                        ) : (
                            <div className="summary">
                                <div className='totalPrice'>
                                    <p>Order Total: </p>
                                    <h2>${getTotal()}</h2>
                                </div>

                                <div className="note"><span>🌳</span>
                                    This is a carbon-neutral delivery</div>
                                <button className="confirm" onClick={() => setShowModal(true)}>Confirm Order</button>
                            </div>
                        )
                    }

                </div>

                {showModal && (
                    <OrderConfirmation
                        items={cart}
                        onStartNewOrder={handleStartNewOrder}
                    />
                )}
            </div>
        </div>

    );
};

export default DessertOrder;
