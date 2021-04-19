const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;    

const { Customer } = require('../models/customers');


// Get All customers
router.get('/api/customers', (req, res) => {
    Customer.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


// Get Single customer 
router.get('/api/customer/:id', (req, res) => {
    Customer.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
           console.log(err);
        }
    });
});

// Save customer
router.post('/api/customer/add', (req, res) => {
    const emp = new Customer({
        name: req.body.name,
        email: req.body.email,
        cake_name: req.body.cake_name
    });
    emp.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Customer Added Successfully', addEmployee: data})
        } else {
           console.log(err);
        }
    });
});



// Patch customers

router.patch('/api/customer/update/:id', (req, res) => {


    const emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        cake_name: req.body.cake_name
    };
    Customer.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Customer Updated Successfully', updateEmployee: data})
        } else {
            console.log(err);
        }
    });
});

// Delete Customer
router.delete('/api/customer/:id', (req, res) => {

    Customer.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Customer deleted', deleteEmployee: data})
        } else {
            console.log(err);
        }
    });
});


module.exports = router;