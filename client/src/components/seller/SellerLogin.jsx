import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const SellerLogin = () => {
    const {isSeller, setIsSeller, navigate, axios} = useAppContext();
    const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_USERNAME);
    const [password, setPassword] = useState(import.meta.env.VITE_PASSWORD);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const {data} = await axios.post('/api/admin/login', {email, password})
            if (data.success) {
                setIsSeller(true);
                navigate("/seller");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        if (isSeller) {
            navigate("/seller")
        }
    }, [isSeller])

    return !isSeller && (
        <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center text-sm text-gray-600">
            <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
                <p className="text-2xl font-medium m-auto"><span className="text-primary">Seller </span>Login</p>
                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" className="border border-gray-200 rounded w-full p-2 mt-1 ouline-primary" required />
                </div>
                <div className="w-full"> 
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter password" className="border border-gray-200 rounded w-full p-2 mt-1 ouline-primary" required/>
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">Login</button>
            </div>

        </form>
    )
};

export default SellerLogin;
