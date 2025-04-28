import Address from "../models/Address.js";


// add Address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const {address, userId} = req.body;
        await Address.create({...address, userId});
        res.json({success: true, message:"Address added"});
    } catch (error) {
        console.error("Error while adding address: ", error);
        res.json({success:false, message:error.message});
    }
}

// get address: /api/address/get
export const getAddress = async (req, res) => {
    try {
        const {userId} = req.body;
        const address = await Address.find({userId});
        res.json({success: true, address});
    } catch (error) {
        console.error("Error while fetching addresses:: ", error);
        res.json({success:false, messsage:error.message});
    }
}