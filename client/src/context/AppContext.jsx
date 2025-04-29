import { createContext, useContext, useState, useEffect } from "react";
import _, { remove } from 'lodash'
import {useNavigate} from 'react-router-dom'
import { dummyProducts } from "../assets/assets";
import {toast} from 'react-hot-toast'
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    const [searchQuery, setSearchQuery] = useState({});

    //fetch seller status
    const fetchSeller = async () => {
        try {
            const {data} = await axios.get('/api/admin/is-auth');
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems);
            }
        } catch (error) {
            setUser(null)
        }
    }

    const fetchProducts = async () => {
        try {
            const {data} = await axios.get('/api/product/list')
            if (data.success) {
                console.log(JSON.stringify(data.products));
                setProducts(data.products)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        setCartItems(cartData);
        toast.dismiss();
        toast.success("Added To Cart")
        
    }

    const updateCartQuantity = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.dismiss();
        toast.success("Cart Updated")
    }

    //remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
            setCartItems(cartData)
        }
        toast.dismiss();
        toast.success("Removed Item")
    }

    //TODO: handle cart count
    const getCartCount = () => {
        let totalCount = 0;
        for (let item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount;
    }

    const getCartAmount  = () => {
        let totalPrice = 0;
        for (let item in cartItems) {
            let itemInfo = products.find((product) => product._id === item);
            if (cartItems[item] > 0) {
                totalPrice += itemInfo.offerPrice * cartItems[item]
            }
        }
        return totalPrice;
    }
    useEffect(() => {
        console.log("Fetching productfs")
        fetchProducts();
        fetchSeller();
        fetchUser();
    }, [])

    useEffect(() => {
        const updateCart = async () => {
            try {
                const {data} = await axios.post('/api/cart/update', {cartItems});
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(data.message)
            }
        }
        if (user) {
            updateCart();
        }
    }, [cartItems])


    const value = {navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartQuantity, removeFromCart, cartItems,
                    searchQuery, setSearchQuery, getCartCount, getCartAmount, axios, fetchProducts, setCartItems
    };
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}