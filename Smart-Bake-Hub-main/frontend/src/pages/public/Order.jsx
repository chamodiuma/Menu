import React, { useEffect, useState } from 'react';
import { getCart, addToCart, clearCart } from '../../services/cart';
import { useLocation, useNavigate } from 'react-router-dom';

const Order = () => {
    const [items, setItems] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // If navigated with a menu in state, add to cart
        if (location.state && location.state.menu) {
            const menu = location.state.menu;
            addToCart({ id: `menu-${menu.id}`, menuId: menu.id, name: menu.name, price: menu.price, quantity: 1 });
        }
        setItems(getCart());
    }, [location.state]);

    const handleCheckout = () => {
        // This is a client-side demo checkout: clear cart and show success
        clearCart();
        setItems([]);
        alert('Order placed (demo).');
        navigate('/');
    };

    const total = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);

    if (!items || items.length === 0) return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <div className="text-gray-600">Your cart is empty.</div>
        </div>
    );

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <div className="space-y-3 mb-4">
                {items.map(it => (
                    <div key={it.id} className="flex items-center justify-between border rounded p-3 bg-white">
                        <div>
                            <div className="font-semibold">{it.name}</div>
                            <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                        </div>
                        <div className="font-bold">Rs. {(it.price || 0) * (it.quantity || 1)}</div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between font-bold text-lg mb-4">Total: Rs. {total}</div>
            <div className="flex gap-3">
                <button onClick={handleCheckout} className="bg-[#2E1A12] text-white px-4 py-2 rounded">Place Order</button>
                <button onClick={() => { clearCart(); setItems([]); }} className="border px-4 py-2 rounded">Clear</button>
            </div>
        </div>
    );
};

export default Order;
