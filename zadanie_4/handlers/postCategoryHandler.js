const ObjectId = require('mongodb').ObjectId;

const CategoryModel = require("../models/category");


exports.postCategoryHandler = async (req, res) => {
    res.set('Content-Type', 'application/json')

    const name = req.body['categoryName'];

    if (name == null || name === "") {
        res.status(400).send({ errors: 'Category name can not be empty' });
        return;
    }

    const newCategory = new CategoryModel({
        _id: new ObjectId,
        categoryName: name
    })

    newCategory
        .save()
        .then((category) => {
            console.log(category);

            res.status(201).send({ response: 'Category saved to the database' });
        })
        .catch((err) => {
            res.status(400).send({ errors: 'Unable to save the category' + err });
        });
}
