const Cart = require("./Cart");
const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const User = require("./User");
const Purchase = require("./Purchase");


Product.belongsTo(Category);
Category.hasMany(Product);

Product.hasMany(Image);
Image.belongsTo(Product);

Cart.belongsTo(Product);
Product.hasMany(Cart);

Cart.belongsTo(User);
User.hasMany(Cart);


Purchase.belongsTo(Product);
Product.hasMany(Purchase);

Purchase.belongsTo(User);
User.hasMany(Purchase);
