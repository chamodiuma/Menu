// Mock Menus Data
export const mockMenuCategories = [
    { id: 1, name: 'Birthday Party' },
    { id: 2, name: 'Corporate Event' },
    { id: 3, name: 'Wedding' },
    { id: 4, name: 'Holiday' },
    { id: 5, name: 'Breakfast' }
];

export const mockMenus = [
    {
        id: 1,
        name: 'Birthday Party Bundle',
        description: 'Perfect collection for celebrating special occasions',
        category: 'Birthday Party',
        price: 3500,
        image: '/images/hero_cake_pastries.png',
        productsCount: 4,
        status: 'Active'
    },
    {
        id: 2,
        name: 'Corporate Meeting Spread',
        description: 'Professional assortment suitable for business gatherings',
        category: 'Corporate Event',
        price: 5200,
        image: '/images/hero_bread_basket_1779987305856.png',
        productsCount: 5,
        status: 'Active'
    },
    {
        id: 3,
        name: 'Wedding Deluxe Package',
        description: 'Elegant selection for your special day',
        category: 'Wedding',
        price: 8500,
        image: '/images/chocolate_cake_1779987318818.png',
        productsCount: 6,
        status: 'Active'
    },
    {
        id: 4,
        name: 'Holiday Special',
        description: 'Festive treats and traditional favorites',
        category: 'Holiday',
        price: 4200,
        image: '/images/butterscotch_pastry_1779987365708.png',
        productsCount: 5,
        status: 'Active'
    },
    {
        id: 5,
        name: 'Breakfast Combo',
        description: 'Start your day with our morning favorites',
        category: 'Breakfast',
        price: 1800,
        image: '/images/veg_puff_1779987334434.png',
        productsCount: 3,
        status: 'Active'
    }
];

// Products for menus (reusing from mockProducts)
import { mockProducts as products } from './mockProducts';

export { products as mockProducts };
