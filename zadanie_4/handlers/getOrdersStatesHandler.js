const StateModel = require("../models/state");


exports.getOrdersStatesHandler = async (req, res) => {
    try {
        const states = await StateModel.find().exec();
        res.status(200).json({ message: 'States retrieved', data: states });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving states', error: err });
    }
};