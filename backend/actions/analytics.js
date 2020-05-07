const {
  Product, Review, Order, Category,
} = require('../models/index');

const getTopFiveSoldProducts = async (req, res) => {
  if (req.user && req.user.type === 'Admin') {
    const result = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $project: { products: '$products' } },

      { $unwind: '$products' },
      { $group: { _id: '$products.product._id', quantity: { $sum: '$products.quantity' } } },
      { $sort: { quantity: -1 } },
      { $limit: 5 },
    ]);
    await Product.populate(result, { path: '_id' });
    console.log(result);

    return res.send(result);
  }
  res.status(401).send('Unauthorized');
};


const getTopTenPerDay = async (req, res) => {
  date = '5/7/2020';
  if (req.user && req.user.type === 'Admin') {
    const result = await Product.aggregate([
      { $match: { [`views.${date}`]: { $ne: undefined } } },
      { $sort: { [`views.${date}`]: -1 } },
      { $limit: 10 },
    ]);
    await Review.populate(result, { path: 'reviews' });
    console.log(result);

    return res.send(result);
  }
  res.status(401).send('Unauthorized');
};


const dateTest = async (req, res) => {
  const startDate = new Date('5/7/2020');

  const endDate = startDate.setDate(date.getDate() + 1);

  if (req.user && req.user.type === 'Admin') {
    const result = await Category.aggregate([
      { $match: { createdAt: { $lt: endDate, $gt: startDate } } },
      { $count: 'quantity' },
    ]);

    return res.send(...result);
  }
  res.status(401).send('Unauthorized');
};

module.exports = { getTopFiveSoldProducts, getTopTenPerDay, dateTest };