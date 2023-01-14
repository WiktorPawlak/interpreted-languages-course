exports.router = (app) => {
    const { postProductHandler } = require('../handlers/postProductHandler');
    const {postCategoryHandler} = require("../handlers/postCategoryHandler");
    const { getCategoriesHandler } = require('../handlers/getCategoriesHandler');
    const { getProductsHandler } = require('../handlers/getProductsHandler');
    const { putProductHandler } = require('../handlers/putProductHandler');
    const { postOrderHandler } = require('../handlers/postOrderHandler');
    const { getOrdersWithStateHandler } = require('../handlers/getOrdersWithStateHandler');
    const { getOrdersStatesHandler } = require('../handlers/getOrdersStatesHandler');
    const { putOrderStateHandler } = require('../handlers/putOrderStateHandler');
    const { getOrdersHandler } = require('../handlers/getOrdersHandler');


    app.get('/categories', getCategoriesHandler);
    app.get('/products', getProductsHandler);
    app.get('/status', getOrdersStatesHandler);
    app.get('/orders/status/:stateId', getOrdersWithStateHandler);
    app.get('/orders', getOrdersHandler);
    app.post('/products', postProductHandler);
    app.post('/categories', postCategoryHandler);
    app.post(`/orders`, postOrderHandler);
    app.put('/products/:_id', putProductHandler);
    app.put('/orders/:_id', putOrderStateHandler);
}