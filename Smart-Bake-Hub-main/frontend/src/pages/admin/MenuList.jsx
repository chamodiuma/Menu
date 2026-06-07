import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { mockMenuCategories, mockMenus } from '../../data/mockMenus';
import { useAuthStore } from '../../store/authStore';
import DeleteConfirmation from '../../components/DeleteConfirmation';

const MenuList = () => {
    const user = useAuthStore(state => state.user);
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [menusRes, categoriesRes] = await Promise.all([
                api.get('/menus').catch(() => ({ data: [] })),
                api.get('/products/categories').catch(() => ({ data: mockMenuCategories }))
            ]);

            const fetchedMenus = menusRes.data || [];
            // If API returned no menus, show demo sample menus
            if (!fetchedMenus || fetchedMenus.length === 0) {
                setMenus(mockMenus);
            } else {
                setMenus(fetchedMenus);
            }

            setCategories(categoriesRes.data || mockMenuCategories);
        } catch (err) {
            console.error('Failed to fetch data:', err);
            setError('Failed to load menus');
            toast.error('Failed to load menus');
        } finally {
            setLoading(false);
        }
    };

    const filteredMenus = useMemo(() => {
        return menus.filter(menu => {
            const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                menu.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || menu.category_name === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [menus, searchTerm, selectedCategory]);

    const handleDelete = (menu) => {
        setMenuToDelete(menu);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!menuToDelete) return;

        setDeleting(true);
        try {
            await api.delete(`/menus/${menuToDelete.id}`);
            setMenus(menus.filter(m => m.id !== menuToDelete.id));
            toast.success('Menu deleted successfully');
            setShowDeleteModal(false);
            setMenuToDelete(null);
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to delete menu';
            toast.error(message);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-[#2E1A12] font-serif">Menu Management</h1>
                <div className="bg-white rounded-xl border border-[#C8843B]/20 p-12 text-center">
                    <p className="text-[#2E1A12]/60">Loading menus...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#2E1A12] font-serif">Menu Management</h1>
                    <p className="text-[#2E1A12]/60 text-sm mt-1">Create and manage custom menus for your customers</p>
                </div>
                <Link
                    to="/admin/menus/add"
                    className="flex items-center gap-2 px-4 py-2 bg-[#2E1A12] text-white rounded-lg hover:bg-[#2E1A12]/90 transition-colors shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Menu</span>
                </Link>
            </div>

            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-[#C8843B]" />
                    <input
                        type="text"
                        placeholder="Search menus..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C8843B]/20 rounded-lg text-[#2E1A12] placeholder-[#2E1A12]/50 focus:outline-none focus:border-[#C8843B] transition-colors"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <Filter className="absolute left-3 top-3 w-5 h-5 text-[#C8843B]" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C8843B]/20 rounded-lg text-[#2E1A12] focus:outline-none focus:border-[#C8843B] transition-colors appearance-none"
                    >
                        <option value="all">All Categories</option>
                        {mockMenuCategories.map(category => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Menus Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenus.length === 0 ? (
                    <div className="col-span-full bg-white rounded-xl border border-[#C8843B]/20 p-12 text-center">
                        <p className="text-[#2E1A12]/60">No menus found</p>
                    </div>
                ) : (
                    filteredMenus.map((menu) => (
                        <div
                            key={menu.id}
                            className="bg-white rounded-xl border border-[#C8843B]/20 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Menu Header */}
                            <div className="bg-gradient-to-r from-[#2E1A12] to-[#C8843B] p-4 text-white">
                                <h3 className="font-bold text-lg font-serif">{menu.name}</h3>
                                <p className="text-sm text-white/80 mt-1">{menu.category_name || menu.category}</p>
                            </div>

                            {/* Menu Content */}
                            <div className="p-6 space-y-4">
                                {/* Description */}
                                <div>
                                    <p className="text-[#2E1A12]/80 text-sm">{menu.description}</p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#C8843B]/20">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-[#C8843B]">{menu.productsCount || menu.product_count || menu.products_count || 0}</p>
                                        <p className="text-xs text-[#2E1A12]/60">Products</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-[#C8843B]">Rs. {menu.price}</p>
                                        <p className="text-xs text-[#2E1A12]/60">Price</p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center justify-between">
                                    {(() => {
                                        const status = (menu.status || '').toString();
                                        const isActive = status.toLowerCase() === 'active';
                                        return (
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {status ? (status.charAt(0).toUpperCase() + status.slice(1)) : 'Unknown'}
                                            </span>
                                        );
                                    })()}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Link
                                        to={`/admin/menus/edit/${menu.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#C8843B]/10 text-[#C8843B] rounded-lg hover:bg-[#C8843B]/20 transition-colors font-medium text-sm"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(menu)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmation
                isOpen={showDeleteModal}
                title="Delete Menu"
                message={`Are you sure you want to delete "${menuToDelete?.name}"? This action cannot be undone.`}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setMenuToDelete(null);
                }}
            />
        </div>
    );
};

export default MenuList;
