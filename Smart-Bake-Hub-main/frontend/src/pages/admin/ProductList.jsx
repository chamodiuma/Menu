import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import DeleteConfirmation from '../../components/DeleteConfirmation';
 
const ProductList = () => {
    const user = useAuthStore(state => state.user);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
 
    useEffect(() => {
        fetchData();
    }, []);
 
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                api.get('/products'),
                api.get('/products/categories')
            ]);
            setProducts(productsRes.data || []);
            setCategories(categoriesRes.data || []);
        } catch (err) {
            console.error('Failed to fetch data:', err);
            setError('Failed to load products');
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };
 
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category_name === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);
 
    const handleDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };
 
    const confirmDelete = async () => {
        if (!productToDelete) return;
 
        setDeleting(true);
        try {
            await api.delete(`/products/${productToDelete.id}`);
            setProducts(products.filter(p => p.id !== productToDelete.id));
            toast.success('Product deleted successfully');
            setShowDeleteModal(false);
            setProductToDelete(null);
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to delete product';
            toast.error(message);
        } finally {
            setDeleting(false);
        }
    };
 
    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-[#2E1A12] font-serif">Products</h1>
                <div className="bg-white rounded-xl border border-[#C8843B]/20 p-12 text-center">
                    <p className="text-[#2E1A12]/60">Loading products...</p>
                </div>
            </div>
        );
    }
 
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#2E1A12] font-serif">Products</h1>
                    <p className="text-[#2E1A12]/60 text-sm mt-1">Manage your bakery products and items</p>
                </div>
                {(user?.role === 'admin' || user?.role === 'staff') && (
                    <Link
                        to="/admin/products/add"
                        className="flex items-center gap-2 px-4 py-2 bg-[#2E1A12] text-white rounded-lg hover:bg-[#2E1A12]/90 transition-colors shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Add Product</span>
                    </Link>
                )}
            </div>
 
            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-[#C8843B]" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C8843B]/20 rounded-lg text-[#2E1A12] placeholder-[#2E1A12]/50 focus:outline-none focus:border-[#C8843B] transition-colors"
                    />
                </div>
 
                <div className="relative">
                    <Filter className="absolute left-3 top-3 w-5 h-5 text-[#C8843B]" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C8843B]/20 rounded-lg text-[#2E1A12] focus:outline-none focus:border-[#C8843B] transition-colors appearance-none"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
 
            {/* Products Table */}
            <div className="grid grid-cols-1 gap-4">
                {error && (
                    <div className="col-span-full bg-red-50 rounded-xl border border-red-200 p-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full bg-white rounded-xl border border-[#C8843B]/20 p-12 text-center">
                        <p className="text-[#2E1A12]/60">
                            {searchTerm || selectedCategory !== 'all' ? 'No products match your filters' : 'No products found'}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-[#C8843B]/20 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#F7F4ED] border-b border-[#C8843B]/20">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E1A12]">Product</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E1A12]">Category</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E1A12]">Price</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E1A12]">Status</th>
                                        {(user?.role === 'admin' || user?.role === 'staff') && (
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E1A12]">Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="border-b border-[#C8843B]/20 hover:bg-[#F7F4ED]/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-[#D4BFA0] rounded-lg overflow-hidden flex-shrink-0 border border-[#C8843B]/20">
                                                        {product.image_url ? (
                                                            <img
                                                                src={product.image_url}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#C8843B]/10 flex items-center justify-center text-xs text-[#2E1A12]/50">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-[#2E1A12]">{product.name}</p>
                                                        <p className="text-xs text-[#2E1A12]/60">{product.description.substring(0, 40)}...</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-[#2E1A12]">{product.category_name || 'Uncategorized'}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-[#2E1A12]">Rs. {product.price}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                    product.availability === 'available'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {product.availability === 'available' ? 'Available' : 'Out of Stock'}
                                                </span>
                                            </td>
                                            {(user?.role === 'admin' || user?.role === 'staff') && (
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            to={`/admin/products/edit/${product.id}`}
                                                            className="p-2 hover:bg-[#C8843B]/10 rounded-lg transition-colors text-[#C8843B]"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(product)}
                                                            disabled={deleting}
                                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
 
            {/* Delete Confirmation Modal */}
            <DeleteConfirmation
                isOpen={showDeleteModal}
                title="Delete Product"
                message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                }}
            />
        </div>
    );
};
 
export default ProductList;