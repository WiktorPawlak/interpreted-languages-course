const Categories = require('../models/category');

exports.getCategoriesHandler = async (req, res) => {
    Categories.find({}, (err, categories) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving categories', error: err });
        } else if (!categories || categories.length === 0) {
            res.status(404).json({ message: 'Categories not found' });
        } else {
            res.status(200).json({ message: 'Categories retrieved', data: categories });
        }
    });
}