import { createContext, useContext, useState, useEffect } from "react";
import _, { remove } from 'lodash'
import {useNavigate} from 'react-router-dom'
import { dummyProducts } from "../assets/assets";
import {toast} from 'react-hot-toast'
export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const [searchQuery, setSearchQuery] = useState({});

    const fetchProducts = async () => {
        setProducts(dummyProducts)
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
        fetchProducts()
    }, [])


    const value = {navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartQuantity, removeFromCart, cartItems,
                    searchQuery, setSearchQuery, getCartCount, getCartAmount
    };
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}