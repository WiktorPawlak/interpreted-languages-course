const OrderModel = require("../models/order");

exports.getOrdersWithStateHandler = async (req, res) => {
    try {
        const { stateId } = req.params;
        const orders = await OrderModel
            .find({ status: stateId })
            .populate('status')
            .populate('products.product')
            .populate('products.product.category')
            .exec();
        if (!orders || orders.length === 0) {
            res.status(404).json({ message: 'Orders not found' });
        } else {
            res.status(200).json({ message: 'Orders retrieved', data: orders });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving orders', error: err });
    }
};