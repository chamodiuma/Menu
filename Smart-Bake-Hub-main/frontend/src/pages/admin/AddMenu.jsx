import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { mockMenuCategories, mockProducts } from '../../data/mockMenus';

const AddMenu = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        status: 'active'
    });

    useEffect(() => {
        const load = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    api.get('/products').catch(() => ({ data: mockProducts })),
                    api.get('/products/categories').catch(() => ({ data: mockMenuCategories }))
                ]);
                setProductsList(prodRes.data || mockProducts);
                setCategoriesList(catRes.data || mockMenuCategories);
            } catch (err) {
                setProductsList(mockProducts);
                setCategoriesList(mockMenuCategories);
            }
        };
        load();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = (productId) => {
        const product = productsList.find(p => p.id === parseInt(productId));
        if (product && !selectedProducts.find(p => p.id === product.id)) {
            const withQty = { ...product, quantity: 1 };
            setSelectedProducts(prev => [...prev, withQty]);
        }
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    };

    const handleQuantityChange = (productId, value) => {
        const qty = Math.max(1, parseInt(value || 1, 10));
        setSelectedProducts(prev => prev.map(p => p.id === productId ? { ...p, quantity: qty } : p));
    };

    const calculateTotalPrice = () => selectedProducts.reduce((sum, p) => sum + (Number(p.price || 0) * (Number(p.quantity || 1))), 0);

    const validateForm = () => {
        if (!formData.name.trim()) { toast.error('Menu name is required'); return false; }
        if (!formData.description.trim()) { toast.error('Menu description is required'); return false; }
        if (!formData.category) { toast.error('Category is required'); return false; }
        if (!formData.price || parseFloat(formData.price) <= 0) { toast.error('Valid price is required'); return false; }
        if (selectedProducts.length === 0) { toast.error('Add at least one product to the menu'); return false; }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                category_id: formData.category || null,
                price: parseFloat(formData.price) || 0,
                status: formData.status || 'active',
                productItems: selectedProducts.map(p => ({ product_id: p.id, quantity: p.quantity || 1 }))
            };

            await api.post('/menus', payload);
            toast.success('Menu created successfully');
            navigate('/admin/menus');
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to create menu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/admin/menus')} className="p-2 hover:bg-[#C8843B]/10 rounded-lg">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold">Create New Menu</h1>
                    <p className="text-sm mt-1">Combine products to create a custom menu</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-xl border p-6">
                            <label className="block text-sm font-semibold mb-2">Menu Name <span className="text-red-500">*</span></label>
                            <input name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 border rounded-lg" />
                        </div>

                        <div className="bg-white rounded-xl border p-6">
                            <label className="block text-sm font-semibold mb-2">Description <span className="text-red-500">*</span></label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full px-4 py-2.5 border rounded-lg" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl border p-6">
                                <label className="block text-sm font-semibold mb-2">Category <span className="text-red-500">*</span></label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2.5 border rounded-lg">
                                    <option value="">Select Category</option>
                                    {(categoriesList.length ? categoriesList : mockMenuCategories).map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-white rounded-xl border p-6">
                                <label className="block text-sm font-semibold mb-2">Menu Price (Rs.) <span className="text-red-500">*</span></label>
                                <input name="price" type="number" step="0.01" min="0" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2.5 border rounded-lg" />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border p-6">
                            <label className="block text-sm font-semibold mb-2">Availability Status</label>
                            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2.5 border rounded-lg">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button type="button" onClick={() => navigate('/admin/menus')} className="flex-1 px-4 py-2.5 border rounded-lg">Cancel</button>
                            <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 bg-[#2E1A12] text-white rounded-lg">{loading ? 'Creating...' : 'Create Menu'}</button>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl border p-6">
                        <h3 className="text-sm font-semibold mb-4">Available Products</h3>
                        <select onChange={(e) => { if (e.target.value) { handleAddProduct(e.target.value); e.target.value = ''; } }} className="w-full px-3 py-2 border rounded-lg text-sm mb-4">
                            <option value="">Add a product...</option>
                                    {(productsList.length ? productsList : mockProducts).map(product => (
                                        <option key={product.id} value={product.id}>{product.name} - Rs. {product.price}</option>
                                    ))}
                        </select>

                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wide mb-3">Menu Items ({selectedProducts.length})</h4>
                                    {selectedProducts.length === 0 ? (
                                <p className="text-sm text-center py-4">No products added yet</p>
                            ) : (
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {selectedProducts.map(product => (
                                        <div key={product.id} className="flex items-center justify-between p-3 bg-[#F7F4ED] rounded-lg border">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{product.name}</p>
                                                <p className="text-xs">Rs. {product.price}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input type="number" min="1" value={product.quantity || 1} onChange={(e) => handleQuantityChange(product.id, e.target.value)} className="w-20 px-2 py-1 border rounded" />
                                                <button onClick={() => handleRemoveProduct(product.id)} className="p-1 hover:bg-[#C8843B]/20 rounded">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedProducts.length > 0 && (
                        <div className="bg-gradient-to-r from-[#2E1A12] to-[#C8843B] rounded-xl p-6 text-white sticky top-20">
                            <h4 className="text-sm font-semibold mb-4">Menu Summary</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Items Added:</span>
                                    <span className="font-bold">{selectedProducts.length}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-white/20">
                                    <span>Suggested Price:</span>
                                    <span className="font-bold">Rs. {calculateTotalPrice()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddMenu;
