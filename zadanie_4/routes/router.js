exports.router = (app) => {
    const { createProductHandler } = require('../handlers/createProductHandler');
    const {createCategoryHandler} = require("../handlers/createCategoryHandler");
    const { getCategoriesHandler } = require('../handlers/getCategoriesHandler');
    const { getProductsHandler } = require('../handlers/getProductsHandler');
    const { updateProductHandler } = require('../handlers/updateProductHandler');
    const { createOrderHandler } = require('../handlers/createOrderHandler');
    const { getOrdersWithStateHandler } = require('../handlers/getOrdersWithStateHandler');
    const { getOrdersStatesHandler } = require('../handlers/getOrdersStatesHandler');
    const { updateOrderStateHandler } = require('../handlers/updateOrderStateHandler');
    const { getOrdersHandler } = require('../handlers/getOrdersHandler');

    app.post('/products', createProductHandler);
    app.post('/categories', createCategoryHandler);
    app.get('/categories', getCategoriesHandler);
    app.get('/products', getProductsHandler);
    app.get('/status', getOrdersStatesHandler);
    app.get('/orders/status/:stateId', getOrdersWithStateHandler);
    app.get('/orders', getOrdersHandler);
    app.post(`/orders`, createOrderHandler);
    app.put('/products/:_id', updateProductHandler);
    app.put('/orders/:_id', updateOrderStateHandler);
}