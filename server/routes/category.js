const express = require ('express');
let app = express();
let Category = require('../models/category');


// Show all categories

const getCategories = (req, res) => {
    Category.find({})
            .populate('User')
            .exec((err, categories) =>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }
                res.json({
                    ok: true,
                    categories
                })
            })
}

// Show one category by Id

const getCategoryById = (req, res) => {
    id = req.params.id;
    Category.findById(id, (err, categoryDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        } if (!categoryDB){
            return res.status(500).json({
                ok: false,
                err: 'Category does not exist'
            })
        }
        res.json({
            ok: true,
            category: categoryDB
        })
    })
}


// Creates new category

const postCategory = (req, res) => {
    let body = req.body
    let category = new Category({
        description: body.description,
        user: req.user._id
    })
    category.save((err, categoryDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        } 
        if(!categoryDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }
            res.json({
            ok: true,
            category: categoryDB
        });
    });
};

// Updates category

const updateCategory = (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategory = {
        description: body.description,
        user: req.user._id
    }

Category.findByIdAndUpdate(id, descCategory, 
    { new: true, runValidators: true }, 
    (err, categoryDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err: 'Status 500'
            })
        } if(!categoryDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            category: categoryDB
        });
})
}
    
    

// Deletes category

const deleteCategory = (req, res) => {
    let id = req.params.id;
    Category.findByIdAndRemove(id, (err, categoryDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if(!categoryDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            message: 'Category Deleted'
        })
    })
}


module.exports = {
    postCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategoryById
}