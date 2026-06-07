import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { mockMenuCategories, mockProducts, mockMenus } from '../../data/mockMenus';

const EditMenu = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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

                // Load menu details
                const menuRes = await api.get(`/menus/${id}`).catch(() => null);
                if (menuRes && menuRes.data) {
                    const menu = menuRes.data;
                    setFormData({
                        name: menu.name,
                        description: menu.description,
                        category: menu.category_id || '',
                        price: menu.price,
                        status: menu.status || 'active'
                    });
                    // ensure each product has quantity
                    const prods = (menu.products || []).map(p => ({ ...p, quantity: p.quantity || 1 }));
                    setSelectedProducts(prods);
                } else {
                    // fallback to mock
                    const menu = mockMenus.find(m => m.id === parseInt(id));
                    if (menu) {
                        setFormData({
                            name: menu.name,
                            description: menu.description,
                            category: menu.category,
                            price: menu.price,
                            status: menu.status
                        });
                        setSelectedProducts(mockProducts.slice(0, menu.productsCount));
                    }
                }
            } catch (err) {
                setProductsList(mockProducts);
                setCategoriesList(mockMenuCategories);
            }
        };
        load();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProduct = (productId) => {
        const product = productsList.find(p => p.id === parseInt(productId));
        if (product && !selectedProducts.find(p => p.id === product.id)) {
            setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
        }
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    };

    const handleQuantityChange = (productId, value) => {
        const qty = Math.max(1, parseInt(value || 1, 10));
        setSelectedProducts(prev => prev.map(p => p.id === productId ? { ...p, quantity: qty } : p));
    };

    const calculateTotalPrice = () => {
        return selectedProducts.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Menu name is required');
            return false;
        }
        if (!formData.description.trim()) {
            toast.error('Menu description is required');
            return false;
        }
        if (!formData.category) {
            toast.error('Category is required');
            return false;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            toast.error('Valid price is required');
            return false;
        }
        if (selectedProducts.length === 0) {
            toast.error('Add at least one product to the menu');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

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

            await api.put(`/menus/${id}`, payload);
            toast.success('Menu updated successfully');
            navigate('/admin/menus');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update menu');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/menus');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-[#C8843B]/10 rounded-lg transition-colors text-[#2E1A12]"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-[#2E1A12] font-serif">Edit Menu</h1>
                    <p className="text-[#2E1A12]/60 text-sm mt-1">Update menu details and products</p>
                </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Menu Name */}
                        <div className="bg-white rounded-xl border border-[#C8843B]/20 p-6">
                            <label className="block text-sm font-semibold text-[#2E1A12] mb-2">
                                Menu Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g., Birthday Party Menu"
                                className="w-full px-4 py-2.5 border border-[#C8843B]/20 rounded-lg bg-white text-[#2E1A12] placeholder-[#2E1A12]/40 focus:outline-none focus:border-[#C8843B] transition-colors"
                            />
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl border border-[#C8843B]/20 p-6">
                            <label className="block text-sm font-semibold text-[#2E1A12] mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your menu..."
                                rows="4"
                                className="w-full px-4 py-2.5 border border-[#C8843B]/20 rounded-lg bg-white text-[#2E1A12] placeholder-[#2E1A12]/40 focus:outline-none focus:border-[#C8843B] transition-colors resize-none"
                            />
                        </div>

                        {/* Category and Price */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl border border-[#C8843B]/20 p-6">
                                <label className="block text-sm font-semibold text-[#2E1A12] mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-[#C8843B]/20 rounded-lg bg-white text-[#2E1A12] focus:outline-none focus:border-[#C8843B] transition-colors appearance-none"
                                >
                                    <option value="">Select Category</option>
                                    {(categoriesList.length ? categoriesList : mockMenuCategories).map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-white rounded-xl border border-[#C8843B]/20 p-6">
                                <label className="block text-sm font-semibold text-[#2E1A12] mb-2">
                                    Menu Price (Rs.) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className="w-full px-4 py-2.5 border border-[#C8843B]/20 rounded-lg bg-white text-[#2E1A12] placeholder-[#2E1A12]/40 focus:outline-none focus:border-[#C8843B] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="bg-white rounded-xl border border-[#C8843B]/20 p-6">
                            <label className="block text-sm font-semibold text-[#2E1A12] mb-2">
                                Availability Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border border-[#C8843B]/20 rounded-lg bg-white text-[#2E1A12] focus:outline-none focus:border-[#C8843B] transition-colors appearance-none"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 px-4 py-2.5 border border-[#C8843B]/20 text-[#2E1A12] rounded-lg hover:bg-[#C8843B]/5 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-2.5 bg-[#2E1A12] text-white rounded-lg hover:bg-[#2E1A12]/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Updating...' : 'Update Menu'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Products Section */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Available Products */}
                    <div className="bg-white rounded-xl border border-[#C8843B]/20 p-6">
                        <h3 className="text-sm font-semibold text-[#2E1A12] mb-4">Manage Products</h3>
                        <select
                            onChange={(e) => {
                                if (e.target.value) {
                                    handleAddProduct(e.target.value);
                                    e.target.value = '';
                                }
                            }}
                            className="w-full px-3 py-2 border border-[#C8843B]/20 rounded-lg text-[#2E1A12] focus:outline-none focus:border-[#C8843B] transition-colors appearance-none text-sm mb-4"
                        >
                            <option value="">Add a product...</option>
                            {(productsList.length ? productsList : mockProducts).map(product => (
                                !selectedProducts.find(p => p.id === product.id) && (
                                    <option key={product.id} value={product.id}>
                                        {product.name} - Rs. {product.price}
                                    </option>
                                )
                            ))}
                        </select>

                        {/* Selected Products */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-[#2E1A12]/60 uppercase tracking-wide mb-3">
                                Menu Items ({selectedProducts.length})
                            </h4>
                            {selectedProducts.length === 0 ? (
                                <p className="text-sm text-[#2E1A12]/60 text-center py-4">No products added yet</p>
                            ) : (
                                <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                                    {selectedProducts.map(product => (
                                        <div
                                            key={product.id}
                                            className="flex items-center justify-between p-3 bg-[#F7F4ED] rounded-lg border border-[#C8843B]/10"
                                        >
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-[#2E1A12]">{product.name}</p>
                                                <p className="text-xs text-[#2E1A12]/60">Rs. {product.price}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveProduct(product.id)}
                                                className="p-1 hover:bg-[#C8843B]/20 rounded transition-colors text-[#C8843B]"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Price Summary */}
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

export default EditMenu;
