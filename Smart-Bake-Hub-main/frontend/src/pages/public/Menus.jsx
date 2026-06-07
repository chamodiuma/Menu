import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { mockMenus, mockProducts } from '../../data/mockMenus';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../services/cart';
import toast from 'react-hot-toast';

const Menus = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await api.get('/menus').catch(() => ({ data: [] }));
                const fetched = res.data || [];
                if (!fetched || fetched.length === 0) setMenus(mockMenus);
                else setMenus(fetched.map(m => ({
                    id: m.id,
                    name: m.name,
                    description: m.description || m.desc || '',
                    price: m.price || m.amount || 0,
                    products: m.products || m.productItems || [],
                    image: m.image || `https://source.unsplash.com/collection/190727/800x600?sig=${m.id}`,
                })));
            } catch (e) {
                setMenus(mockMenus);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleBuyMenu = (menu) => {
        navigate('/order', { state: { menu } });
    };

    const handleAddToCart = (menu, qty) => {
        const item = { id: `menu-${menu.id}`, menuId: menu.id, name: menu.name, price: menu.price, quantity: qty || 1 };
        addToCart(item);
        toast.success('Added to cart');
    };

    if (loading) return <div className="p-6">Loading menus...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-extrabold">Our Menus</h2>
                <p className="text-gray-600">Choose a curated bundle, add to cart or buy instantly.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menus.map(menu => (
                    <div key={menu.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                        <div className="h-40 bg-gray-100 overflow-hidden">
                            <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{menu.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{menu.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-[#2E1A12]">Rs. {menu.price}</div>
                                    <div className="text-xs text-gray-400">per menu</div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <div className="text-sm font-medium text-gray-700 mb-1">Includes</div>
                                <ul className="text-sm text-gray-600 list-disc list-inside max-h-28 overflow-auto">
                                    {menu.products && menu.products.length > 0 ? (
                                        menu.products.map((p, idx) => (
                                            <li key={idx}>{p.name || p.product_name || `Item ${idx+1}`} {p.quantity ? `×${p.quantity}` : ''}</li>
                                        ))
                                    ) : (
                                        // show sample products from mockProducts
                                        mockProducts.slice(0,4).map((p, i) => (
                                            <li key={i}>{p.name}</li>
                                        ))
                                    )}
                                </ul>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleAddToCart(menu, 1)} className="bg-[#d68b3b] text-white px-3 py-2 rounded-lg shadow">Add to Cart</button>
                                    <button onClick={() => handleBuyMenu(menu)} className="border border-[#d68b3b] text-[#2E1A12] px-3 py-2 rounded-lg">Buy Now</button>
                                </div>
                                <div className="text-sm text-gray-500">Popular choice</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menus;
