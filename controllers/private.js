const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Store = require("../models/Store");
const Product = require("../models/Product");
const Seller = require("../models/Seller")

const Order = require('../models/Order')

//get user data
exports.getuser = async (req, res, next) => {
    try {
        const { _id, firstname, lastname, email, cartItem, userAddress, storeId, profileImg, ...other } = req.user;
        res.status(200).json({ _id, firstname, lastname, email, cartItem, userAddress, storeId, profileImg });
    } catch (err) {
        next(err);
    }
};

//get seller data
exports.getseller = async (req, res, next) => {
    try {
        const { _id, firstname, lastname, email, storeId, profileImg, ...other } = req.seller;
        res.status(200).json({ _id, firstname, lastname, email, storeId, profileImg });
    } catch (err) {
        next(err);
    }
};

exports.getsingleproduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ sucess: false, error: "Product not found" });
        }
    } catch (err) {
        next(err);
    }
};

exports.additemtocart = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        if (user) {
            await user.updateOne({ $push: { cartItem: req.body.productId } });
            res.status(200).json(req.user);
        } else {
            res.status(404).json({ sucess: false, error: "Error Occured" });
        }
    } catch (err) {
        next(err);
    }
};

exports.removeitemfromcart = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        if (user) {
            await user.updateOne({ $pull: { cartItem: req.body.productId } });
            res.status(200).json(req.user);
        } else {
            res.status(404).json({ sucess: false, error: "Error Occured" });
        }
    } catch (err) {
        next(err);
    }
};

exports.getAllCartItem = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const cartItem = await Promise.all(
            currentUser.cartItem.map((itemId) => {
                return Product.findById(itemId);
            })
        );
        res.status(200).json(cartItem);
    } catch (err) {
        next(err);
    }
};

//Store registration
exports.registerstore = async (req, res, next) => {
    try {
        let list = {};
        const userExist = await Seller.findOne({ _id: req.body.userId });
        if (!userExist) {
            return res.status(404).json({ sucess: false, error: "User Not Found" })
        }
        if (req.body.userId !== req.params.userid) {
            return res.status(409).json({ sucess: false, error: "Invalid User" })
        }
        req.body.addressList.map((obj) => {
            list = { ...list, ...obj }
        })
        const { storeName, ownerName, ownerEmail, storeAddress, userId, latitude, longitude, ...other } = req.body;
        const store = await Store.create({
            ownerId: userId,
            storeName: storeName,
            ownerName: ownerName,
            latitude: latitude,
            longitude: longitude,
            ownerEmail: ownerEmail,
            storeAddress: storeAddress,
            addressList: { ...list }
        });

        const user = await Seller.findById(req.body.userId);
        if (user) {
            await user.updateOne({ $set: { storeId: store._id } });
        }
        res.status(200).json({ sucess: true, message: "Store Created Successfully" });
    } catch (err) {
        next(err);
        console.log(err)
    }
};

//Add Product

exports.addproduct = async (req, res, next) => {
    try {

        const sellerExist = await Seller.findOne({ _id: req.body.sellerId });
        if (!sellerExist) {
            return res.status(404).json({ sucess: false, error: "Seller Not Found" })
        }

        const { productName, productDescription, productImage, productPrice, productDetails, productQuantity, storeId } = req.body;
        const store = await Store.findById(storeId)

        const product = await Product.create({
            storeId: storeId,
            storeName: store.storeName,
            productName: productName,
            productDescription: productDescription,
            productImage: productImage,
            productPrice: productPrice,
            productQuantity : productQuantity,
            productDetails: productDetails
        });
        res.status(200).json({ sucess: true, message: "Product Added Successfully" });
    } catch (err) {
        next(err);
        console.log(err)
    }
};


exports.getallStoreProduct = async (req, res, next) => {
    try {
        // console.log(req.body.storeId);
        const storeExist = await Store.findById({ _id: req.body.storeId });

        if (storeExist) {
            const productExist = await Product.find({ storeId: req.body.storeId });

            if (!productExist) {
                return res.status(404).json({ sucess: false, error: "Product data unavailable" });
            }
            else {
                return res.status(200).json({ products: productExist });
            }

        }
    } catch (err) {
        next(err);
        console.log(err)
    }
};


exports.buyproduct = async (req, res, next) => {
    try {
        const receiveItem = req.body.items;
        const deliveryAddress = req.body.address;
        for (const obj of receiveItem) {
            const { customerId, customerName, storeId, totalPrice } = obj;
            const productId = obj._id;
            const quantity = obj.orderQuantity;

            const order = await Order.create({
                customerId: customerId,
                customerName: customerName,
                storeId: storeId,
                totalPrice: totalPrice,
                productId: productId,
                quantity: quantity,
                deliveryAddress: deliveryAddress
            });
        }

        res.status(200).json({ sucess: true, message: "Order Successfull" });

    } catch (err) {
        next(err);
        console.log(err)
    }
};


exports.getallOrderedProduct = async (req, res, next) => {
    try {
        const resOrder = [];
        // console.log(req.body.storeId);
        const storeExist = await Store.findById({ _id: req.body.storeId });
        if (storeExist) {
            const orders = await Order.find({ storeId: req.body.storeId }).sort({createdAt: -1});
            for (const obj of orders) {
                const product = await Product.findById(obj.productId);
                 
                resOrder.push({ orderId: obj._id, customerName: obj.customerName, quantity: obj.quantity, productName: product.productName, totalPrice: obj.totalPrice, status: obj.status ,createdAt: obj.createdAt , deliveryAddress: obj.deliveryAddress });
            }
            const order = await Order.findById(req.body.orderId);
            if (order) {
                await order.updateOne({ $set: { status: req.body.status } });
            }
            res.status(200).json(resOrder);
        }
    } catch (err) {
        next(err);
        console.log(err)
    }

};
exports.searchProduct = async (req, res, next) => {
    try {
        const prod = [];
        const nearByStores = [];
        const locationName = req.body.locationName;
        const location = req.body.location;
        const query = {};
        query[`addressList.${locationName}`] = location;
        const storeData = await Store.find(query);
        if (storeData.length == 0) {
            return res.status(200).json({ message: "No store found near your location" });
        }
        for (const obj of storeData) {

            let search = req.body.searchValue.split(" ")[0];
            let product = await Product.find({ "storeId": obj._id, "productName": new RegExp(`\\b${search}\\b`, 'i') });
            if (product.length != 0) {
                nearByStores.push(obj);
                prod.push(...product);
            }
        }
        if (prod.length == 0) {
            return res.status(200).json({ message: "No product found" });
        }
        res.status(200).json({ product: prod, stores: nearByStores });

    } catch (err) {
        next(err);
        console.log(err)
    }

};

exports.getStoreDetails = async (req, res, next) => {
    try {
        // console.log(req.body.storeId);
        const storeExist = await Store.findById({ _id: req.body.storeId });

        if (!storeExist) {
            return res.status(404).json({ sucess: false, error: "Store data unavailable" });
        }
        else {
            // console.log(storeExist)
            store = await Store.findByIdAndUpdate(req.body.storeId, req.body, {
                //new : true => return new updated document , defalut value is false
                new: true,
                //runValidators :true => to check validation
                runValidators: true,
                useFindAndModify: false
            });
            return res.status(200).json({ store: store });
        }

    }

    catch (err) {
        next(err);
        console.log(err)
    }
};


exports.getrandomproducts = async (req, res, next) => {
    try {
        let product = await Product.find();
        res.status(200).json(product);
    } catch (err) {
        next(err);
        console.log(err)
    }
}

exports.getorderhistory = async (req, res, next) => {
    try {
        const order = await Order.find({ customerId: req.body.userId }).sort({createdAt: -1});
        res.status(200).json(order);
    } catch (err) {
        next(err);
        console.log(err)
    }
}

exports.getAnalytics = async (req, res, next) => {
    try {
        const storeExist = await Store.findById({ _id: req.body.storeId  });

        if (storeExist) {
            const storeData= await Store.find({ _id: req.body.storeId  });
            let storename = storeData.map(a => a.storeName);
            const orderExist = await Order.find({ storeId: req.body.storeId });
            const orderDelivered = await Order.find({ storeId: req.body.storeId , status: "Delivered"}); 
            let result = orderExist.map(a => a.productId);
            const productExist = await Product.find({ _id: result });
            let jan = await Order.find({"updatedAt":{$gte:new Date("2021-01-01T23:59:59Z"),$lte:new Date("2021-01-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId }).countDocuments();
            let feb = await Order.find({"updatedAt":{$gte:new Date("2021-02-01T23:59:59Z"),$lte:new Date("2021-02-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();
            let march = await Order.find({"updatedAt":{$gte:new Date("2021-03-01T23:59:59Z"),$lte:new Date("2021-03-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();
            let april = await Order.find({"updatedAt":{$gte:new Date("2021-04-01T23:59:59Z"),$lte:new Date("2021-04-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();
            let may = await Order.find({"updatedAt":{$gte:new Date("2021-05-01T23:59:59Z"),$lte:new Date("2021-05-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();
            let june = await Order.find({"updatedAt":{$gte:new Date("2021-06-01T23:59:59Z"),$lte:new Date("2021-06-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();
            let july = await Order.find({"updatedAt":{$gte:new Date("2021-07-01T23:59:59Z"),$lte:new Date("2021-07-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();
            let aug = await Order.find({"updatedAt":{$gte:new Date("2021-08-01T23:59:59Z"),$lte:new Date("2021-08-31T23:59:59Z")}, status: "Delivered", storeId: req.body.storeId}).countDocuments();
            let sept = await Order.find({"updatedAt":{$gte:new Date("2021-09-01T23:59:59Z"),$lte:new Date("2021-09-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();
            let oct = await Order.find({"updatedAt":{$gte:new Date("2021-10-01T23:59:59Z"),$lte:new Date("2021-10-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();
            let nov = await Order.find({"updatedAt":{$gte:new Date("2021-11-01T23:59:59Z"),$lte:new Date("2021-11-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();
            let dec = await Order.find({"updatedAt":{$gte:new Date("2021-12-01T23:59:59Z"),$lte:new Date("2021-12-31T23:59:59Z")}, status: "Delivered" , storeId: req.body.storeId}).countDocuments();

            if (!orderExist && !productExist) {
                return res.status(404).json({ sucess: false, error: "Product data unavailable" });
            }
            else {
                return res.status(200).json({ orders: orderDelivered, products: productExist ,storename: storename ,jan : jan ,feb : feb, march : march , april : april, may : may, june : june , july : july, aug : aug , sept : sept, oct : oct , nov : nov , dec : dec});   
            }
        }
    } catch (err) {
        next(err);
        console.log(err)
    }

};