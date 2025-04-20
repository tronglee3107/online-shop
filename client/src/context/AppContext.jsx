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
        toast.success("Added To Cart")
        
    }

    const updateCartQuantity = (itemId, quantity) => {
        let cartData = _.cloneDeep(cartItems)
        cartData[itemId] = quantity;
        setCartItems(cartData)
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
        toast.success("Removed Item")
    }

    useEffect(() => {
        console.log("Fetching productfs")
        fetchProducts()
    }, [])


    const value = {navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartQuantity, removeFromCart, cartItems};
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}