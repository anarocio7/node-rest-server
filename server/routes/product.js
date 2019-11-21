const express = require('express')
const app = express();
const Product = ('../models/product')

// Get all products

const getProducts = (req, res) => {
    // Bring all products. Populate user and category
    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    Product.find({
        available: true
    }).skip(pagination)
      .limit(5)
      .populate('user', 'name email')
      .populate('category', 'description')
      .exec((err, products) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            products
        })
      })
}

// Get product by ID

const getProductById = (req, res) => {
    // Bring product by id. Popular user and category
    let id = req.params.id;
    Product.findById(id, (err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        } if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID does not exist'
                }
            });
        }
        res.json({
            ok: true,
            product: productDB
        })

    })
}

// Create new product

const createProduct = (req, res) => {
    let body = req.body;
    let product = new Product({
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        avaliable: body.available,
        category: body.category,
        user: req.user._id
    })
        product.save((err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            product: productDB
        });

    });
}

// Update product

const updateProduct = (req, res) => {
    // Update by ID

    let id = req.params.id;
    let body = req.body;

    Product.findById(id, (err, productDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if(!productDB){
            return res.status(400).json({
                ok: false,
                err: {
                   message: 'ID not found'
                    }
                })
            }
        productDB.name = body.name;
        productDB.unitPrice = body.unitPrice;
        productDB.description = body.description;
        productDB.available = body.available;
        productDB.category = body.category;

        productDB.save((err, savedProduct) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                product: savedProduct
            })
        })
    })
}

// Delete product

const deleteProduct = (req, res) => {
    // Delete by id
    // Only change state to false

    let id = req.params.id;
    Product.findById(id, (err, productDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        } if(!productDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Product does not exist'
                }
            })
        }
        productDB.available = false;
        productDB.save((err, deletedProduct) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                product: deletedProduct,
                message: 'Product has been deleted'
            })
        })
    })
}


module.exports = {
    createProduct,
    updateProduct,
    getProducts,
    deleteProduct,
    getProductById
}