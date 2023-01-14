const OrderModel = require("../models/order");
const StateModel = require("../models/state");
const {validateId} = require("./validation/idValidator");


exports.putOrderStateHandler = async (req, res) => {
    res.set('Content-Type', 'application/json')

    const id = req.params['_id'];
    const status = req.body['status'];

    try {
        validateId(id, res)
    } catch(err) {
        res.status(400).send({ errors: err.message });
        return;
    }

    let order;
    try {
        order = await OrderModel
            .findById({_id: id})
            .populate('status')
            .exec()
            .then((order) => {
                if (order === undefined || !order) {
                    throw new Error(`Order ${id} not found`)
                }
                return order;
            });
    } catch(err) {
        res.status(404).send({ errors: err.message });
        return;
    }

    const stateName = order.status.stateName
    if (status == null || status === '') {
        res.status(400).send({ errors: 'Status parameter must be nonempty string literal conforming to allowed status types' });
        return;
    }
    if (stateName !== 'UNAPPROVED' && stateName !== 'APPROVED')
    {
        res.status(400).send({ errors: `Orders with state \`${stateName}\` cannot be transitioned to another state` });
        return;
    }
    if (stateName === 'UNAPPROVED' && status !== 'APPROVED') {
        res.status(400).send({ errors: `\`UNAPPROVED\` orders must be \`APPROVED\` first` });
        return;
    }
    if (stateName === 'APPROVED' && status === 'UNAPPROVED') {
        res.status(400).send({ errors: `\`APPROVED\` orders cannot be transitioned back to \`UNAPPROVED\` state` });
        return;
    }

    let state = await StateModel.findOne({stateName: status}).exec()


    OrderModel
        .findOneAndUpdate({ _id: id }, {
            $set: {
                status: state._id
            }
        })
        .then((order) => {
            if (!order) {
                res.status(404).send({ errors: 'Order not found' });
            } else {
                console.log(order)
                res.status(200).send({ response: 'Order successfully updated' });
            }
        })
        .catch((err) => {
            res.status(400).send({ errors: 'Unable to update order' + err });
        });
}