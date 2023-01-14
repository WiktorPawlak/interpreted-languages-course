const ProductModel = require("../models/product");


exports.updateProductHandler = async (req, res) => {
    res.set('Content-Type', 'application/json')

    const id = req.params['_id'];
    const pName = req.body['productName'];
    const pDescription = req.body['description'];
    const pCategory = req.body['category'];
    const pPrice = req.body['price'];
    const pWeight = req.body['weight'];

    if (!id) {
        res.status(400).send({ errors: 'Product id is required', status: 400 });
        return;
    }

    if (pName === "") {
        res.status(400).send({ errors: 'Product name can not be empty', status: 400 });
        return;
    }

    if (pDescription === "") {
        res.status(400).send({ errors: 'Product description can not be empty', status: 400 });
        return;
    }

    if (pCategory === "") {
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

    const updateProduct = {
        productName: pName,
        category: pCategory,
        description: pDescription,
        price: pPrice,
        weight: pWeight
    }

    console.log(updateProduct)

    ProductModel
        .findByIdAndUpdate(id, updateProduct, { new: true })
        .then((product) => {
            if (!product) {
                res.status(404).send({ errors: 'Product not found', status: 404 });
            } else {
                res.status(200).send({ response: 'Product successfully updated', status: 200 });
            }
        })
        .catch((err) => {
            res.status(400).send({ errors: 'Unable to update product' + err, status: 400 });
        });
}