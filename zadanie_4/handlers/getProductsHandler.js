const ProductModel = require("../models/product");


exports.getProductsHandler = async (req, res) => {
    try {
        const products = await ProductModel
            .find()
            .populate('category')
            .exec();
        if (!products) {
            res.status(404).json({ message: 'Products not found' });
        } else {
            res.status(200).json({ message: 'Products retrieved', data: products });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving products', error: err });
    }
};
