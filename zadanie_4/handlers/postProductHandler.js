const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");

const ProductModel = require("../models/product");


exports.postProductHandler = async (req, res) => {
    res.set('Content-Type', 'application/json')

    const pName = req.body['productName'];
    const pDescription = req.body['description'];
    const pCategory = req.body['category'];
    const pPrice = req.body['price'];
    const pWeight = req.body['weight'];

    if (pName == null || pName === "") {
        res.status(400).send({ errors: 'Product name can not be empty', status: 400 });
        return;
    }

    if (pDescription == null || pDescription === "") {
        res.status(400).send({ errors: 'Product description can not be empty', status: 400 });
        return;
    }

    if (pCategory == null || pCategory === "") {
        res.status(400).send({ errors: 'Product category can not be empty', status: 400 });
        return;
    }

    const format = /^[0-9]+.[0-9]{2}$/;
    if (!format.test(pPrice)) {
        res.status(400).send({ errors: 'Product price is invalid', status: 400 });
        return;
    }

    if (!format.test(pWeight)) {
        res.status(400).send({ errors: 'Product weight is invalid', status: 400 });
        return;
    }

    const newProduct = new ProductModel({
        _id: new ObjectId,
        productName: pName,
        description: pDescription,
        category: mongoose.Types.ObjectId(pCategory),
        price: pPrice,
        weight: pWeight
    })

    newProduct
        .save()
        .then((product) => {
            console.log(product);

            res.status(201).send({ response: 'Product saved to the database', status: 201 });
        })
        .catch((err) => {
            res.status(400).send({ errors: 'Unable to save the product' + err, status: 400 });
        });
}
