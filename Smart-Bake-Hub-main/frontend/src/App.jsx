import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SmartDeals from './pages/public/SmartDeals';
import MenusPage from './pages/public/Menus';
import OrderPage from './pages/public/Order';

// Admin Pages
import AdminLogin from './pages/auth/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Products from './pages/admin/Products';
import WasteReduction from './pages/admin/WasteReduction';
import ProductList from './pages/admin/ProductList';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import MenuList from './pages/admin/MenuList';
import AddMenu from './pages/admin/AddMenu';
import EditMenu from './pages/admin/EditMenu';

const PrivateRoute = ({ children, roles }) => {
    const { user } = useAuthStore();
    
    // Redirect logic
    if (!user) {
        if (roles && (roles.includes('admin') || roles.includes('staff'))) {
            return <Navigate to="/admin/login" />;
        }
        return <Navigate to="/login" />;
    }
    
    if (roles && !roles.includes(user.role)) {
        if (user.role === 'admin' || user.role === 'staff') {
            return <Navigate to="/admin" />;
        }
        return <Navigate to="/" />;
    }
    
    return children;
};

function App() {
    return (
        <Router>
            <Toaster position="top-right" />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/smart-deals" element={<SmartDeals />} />
                <Route path="/menus" element={<MenusPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <PrivateRoute roles={['admin', 'staff']}>
                        <AdminLayout />
                    </PrivateRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<PrivateRoute roles={['admin']}><Users /></PrivateRoute>} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/add" element={<AddProduct />} />
                    <Route path="products/edit/:id" element={<EditProduct />} />
                    <Route path="menus" element={<MenuList />} />
                    <Route path="menus/add" element={<AddMenu />} />
                    <Route path="menus/edit/:id" element={<EditMenu />} />
                    <Route path="ai/waste" element={<WasteReduction />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
