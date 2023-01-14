const OrderModel = require("../models/order");
const StateModel = require("../models/state");


exports.putOrderStateHandler = async (req, res) => {
    res.set('Content-Type', 'application/json')

    const id = req.params['_id'];
    const status = req.body['status'];

    const idFormat = /^[0-9a-fA-F]{24}$/;
    if (!idFormat.test(id)) {
        res.status(400).send({ errors: 'Product id has invalid format', status: 400 });
        return;
    }
    if (!id) {
        res.status(400).send({ errors: 'Product id is required', status: 400 });
        return;
    }

    let order = await OrderModel
        .findById({ _id: id })
        .populate('status')
        .exec()
        .then((order) => {
            if (order === undefined || !order) {
                res.status(404).send({ errors: 'Order not found', status: 404 });
                return;
            }
            return order;
        })

    console.log(order)

    const stateName = order.status.stateName
    if (status == null || status === '') {
        res.status(400).send({ errors: 'Status parameter must be nonempty string literal conforming to allowed status types', status: 400 });
        return;
    }
    if (stateName !== 'UNAPPROVED' && stateName !== 'APPROVED')
    {
        res.status(400).send({ errors: `Orders with state \`${stateName}\` cannot be transitioned to another state`, status: 400 });
        return;
    }
    if (stateName === 'UNAPPROVED' && status !== 'APPROVED') {
        res.status(400).send({ errors: `\`UNAPPROVED\` orders must be \`APPROVED\` first`, status: 400 });
        return;
    }
    if (stateName === 'APPROVED' && status === 'UNAPPROVED') {
        res.status(400).send({ errors: `\`APPROVED\` orders cannot be transitioned back to \`UNAPPROVED\` state`, status: 400 });
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
                res.status(404).send({ errors: 'Order not found', status: 404 });
            } else {
                res.status(200).send({ response: 'Order successfully updated', status: 200 });
            }
        })
        .catch((err) => {
            res.status(400).send({ errors: 'Unable to update order' + err, status: 400 });
        });
}