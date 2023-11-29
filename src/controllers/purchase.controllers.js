const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const purchase = await Purchase.findAll( {where: {userId: userId}, include: [{model: Product, include:[Image]}]})
    return res.json(purchase);
});

const create = catchError(async(req,res)=>{
    const userId = req.user.id
    const productsCart = await Cart.findAll( {where: {userId: userId},
     attributes: ["userId", "productId", "quantity"],
     raw: true,
    });
    const result = await Purchase.bulkCreate(productsCart)
     await Cart.destroy({where: {userId}})
    return res.json(result);
});

module.exports = {
    getAll,
    create
}