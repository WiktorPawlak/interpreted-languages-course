const ProductModel = require("../models/product");
const {validateId} = require("./validation/idValidator");


exports.putProductHandler = async (req, res) => {
    res.set('Content-Type', 'application/json')

    const id = req.params['_id'];
    const pName = req.body['productName'];
    const pDescription = req.body['description'];
    const pCategory = req.body['category'];
    const pPrice = req.body['price'];
    const pWeight = req.body['weight'];

    try {
        validateId(id, res)
    } catch(err) {
        res.status(400).send({ errors: err.message });
        return;
    }

    if (pName === "") {
        res.status(400).send({ errors: 'Product name can not be empty' });
        return;
    }

    if (pDescription === "") {
        res.status(400).send({ errors: 'Product description can not be empty' });
        return;
    }

    if (pCategory === "") {
        res.status(400).send({ errors: 'Product category can not be empty' });
        return;
    }

    const format = /^[0-9]+.[0-9]{2}$/;
    if (!format.test(pPrice)) {
        res.status(400).send({ errors: 'Product price is invalid' });
        return;
    }

    if (!format.test(pWeight)) {
        res.status(400).send({ errors: 'Product weight is invalid' });
        return;
    }

    const updateProduct = {
        productName: pName,
        category: pCategory,
        description: pDescription,
        price: pPrice,
        weight: pWeight
    }

    ProductModel
        .findByIdAndUpdate(id, updateProduct, { new: true })
        .then((product) => {
            if (!product) {
                res.status(404).send({ errors: `Product ${id} not found` });
            } else {
                console.log(updateProduct)
                res.status(200).send({ response: 'Product successfully updated' });
            }
        })
        .catch((err) => {
            res.status(400).send({ errors: 'Unable to update product' + err });
        });
}