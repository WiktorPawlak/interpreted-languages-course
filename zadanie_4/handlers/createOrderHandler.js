const ObjectId = require('mongodb').ObjectId;

const OrderModel = require("../models/order");
const StateModel = require("../models/state")


exports.createOrderHandler = async (req, res) => {
    res.set('Content-Type', 'application/json')

    const userData = req.body['userData'];
    const products = req.body['products'];

    const newOrder = new OrderModel({
        _id: new ObjectId,
        userData: userData,
        products: products,
        approvalDate: Date.now(),
        totalOrderPrice: products.reduce((acc, cur) => acc + cur.totalPrice, 0),
        status: await StateModel.findOne({stateName: 'UNAPPROVED'}).exec()
    })

    newOrder
        .save()
        .then((product) => {
            console.log(product);

            res.status(200).send({ response: 'Order saved to the database', status: 201 });
        })
        .catch((err) => {
            res.status(400).send({ errors: 'Unable to save order' + err, status: 400 });
        });
}