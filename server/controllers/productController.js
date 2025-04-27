import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/Product.js';

// /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body?.productData);
        const images = req.files;

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;
            })
        )
        await Product.create({... productData, image: imagesUrl});
        res.json({success: true, message: "Product added"});
    } catch (error) {
        console.error("Error while adding product: ", error);
        res.json({success: false, message: error.message});
    }
}

// /api/product/list
export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({success: true, products});
    } catch (error) {
        console.error("Error while fetching products list:: ", error);
        res.json({success:false, message:error.message});
    }
}

// /api/product/:id
export const getProductById = async (req, res) => {
    try {
        const {id} = req.body;
        const product = await Product.findById(id)
        res.json({success: true, product});
    } catch (error) {
        console.error("Error while fetching product:: ", error);
        res.json({success:false, message:error.message});
    }
}


// update product stock --> /api/product/stock
export const changeProductStock = async (req, res) => {
    try {
        const {id, inStock} = req.body;
        await Product.findByIdAndUpdate(id, {inStock});
        res.json({success: true, product});
    } catch (error) {
        console.error("Error while updating product stock:: ", error);
        res.json({success:false, message:error.message});
    }
}

// /api/product/delete
export const deleteProduct = async (req, res) => {

}