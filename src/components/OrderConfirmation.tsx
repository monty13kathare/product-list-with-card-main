// OrderConfirmation.tsx
import React from 'react';
import '../styles/orderConfirmation.scss';
import img from "../../public/assets/images/image-baklava-mobile.jpg"



interface OrderConfirmationProps {
    items: any[];
    onStartNewOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ items, onStartNewOrder }) => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);


    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal__header">
                    <span className="modal__checkmark">✔</span>
                    <h2 className='title'>Order Confirmed</h2>
                    <p className='subTitle'>We hope you enjoy your food!</p>
                </div>

                <div className="modal__items">
                    {items.map((item) => (
                        <div key={item.product.id} className="item-row">
                            <img src={item.product?.image?.thumbnail} alt={item.product.name} className="item-image" />
                            <div className="item-details">
                                <div className="box">
                                    <h4>{item.product.category}</h4>
                                    <div className="price">
                                        {item.quantity > 1 && <span className="item-qty">{item.quantity}x</span>}
                                        <span className="item-qty">@${item.product.price}</span>
                                    </div>
                                </div>
                                <p>${(item.product.price * item.quantity).toFixed(2)}</p>


                            </div>
                        </div>
                    ))}

                    <div className="total-row">
                        <span>Order Total</span>
                        <span className="total-amount">${total.toFixed(2)}</span>
                    </div>
                </div>

                <button className="new-order-btn" onClick={onStartNewOrder}>
                    Start New Order
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmation;
