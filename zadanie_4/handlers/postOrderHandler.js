const ObjectId = require('mongodb').ObjectId;

const OrderModel = require("../models/order");
const StateModel = require("../models/state")
const ProductModel = require("../models/product");


exports.postOrderHandler = async (req, res) => {
    res.set('Content-Type', 'application/json')

    const userData = req.body['userData'];
    const products = req.body['products'];

    if (userData.username == null || userData.username === "") {
        res.status(400).send({ errors: 'Username cannot be empty', status: 400 });
        return;
    }
    if (userData.email == null || userData.email === "") {
        res.status(400).send({ errors: 'User email cannot be empty', status: 400 });
        return;
    }
    if (userData.phoneNumber == null || userData.phoneNumber === "") {
        res.status(400).send({ errors: 'User phone number cannot be empty', status: 400 });
        return;
    }
    const phoneNumberFormat = /^[0-9]{9}$/;
    if (!phoneNumberFormat.test(userData.phoneNumber)) {
        res.status(400).send({ errors: 'User phone number has wrong format', status: 400 });
        return;
    }

    try {
        let productIds = products.map(p => {
            const idFormat = /^[0-9a-fA-F]{24}$/;
            if (!idFormat.test(p.product)) {
                throw new Error(`Product ${p.product} has invalid format`);
            }
            if (!p.product) {
                throw new Error('Product id is required');
            }
            return p.product
        });
        let duplicateIds = productIds.filter((item, index) => productIds.indexOf(item) !== index);
        if (duplicateIds.length > 0) {
            throw new Error(`Duplicate product IDs found: ${duplicateIds}`);
        }
        let foundProducts = await ProductModel.find({ _id: { $in: productIds } }).exec();
        if (foundProducts.length !== productIds.length) {
            throw new Error('One or more product IDs in the order are invalid');
        }
    } catch(err) {
        res.status(400).send({ errors: err.message, status: 400 });
        return;
    }

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