const OrderModel = require("../models/order");


exports.getOrdersHandler = async (req, res) => {
    try {
        const orders = await OrderModel
            .find({})
            .populate('status')
            .populate('products.product')
            .populate('products.product.category')
            .exec();
        if (!orders || orders.length === 0) {
            res.status(404).json({ message: 'Orders not found'});
            return;
        }
        res.status(200).json({ message: 'Orders retrieved', data: orders });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving orders', error: err });
    }
};