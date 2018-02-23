const Orders = require('../models/Orders');

const routesOrders = Router => {
  Router.get('/orders/:idOrder', async (req, res) => {
    const orderId = req.params.idOrder;
    const result = await Orders.getById(orderId);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
};

module.exports = routesOrders;
