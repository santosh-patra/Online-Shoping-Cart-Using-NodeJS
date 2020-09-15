const express = require('express');
const { check, body } = require("express-validator/check");

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    [
        body('email').isEmail().withMessage("Enter Valid Email").normalizeEmail(),
        body('password','Enter valid Password').isLength({min: 5}).isAlphanumeric().trim()
    ],
    authController.postLogin);

router.post('/logout', authController.postLogout);

router.post(
    '/signup'
    , [check('email')
        .isEmail()
        .withMessage('Please Enter A Valid E-Mail')
        .custom((value, { req }) => {
        return User.findOne({ email: value })
            .then(resDoc => {
                if (resDoc) {
                    return Promise.reject('Email Already Exist');
                }
            });
        }).normalizeEmail(),
    body(
        'password',
        'Please enter a password atleast 5 Character'
    )
        .isLength({ min: 5 })
        .isAlphanumeric().trim(),
    body('confirmPassword').trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password Doesn\'t match');
        } 
        return true;
    })
    ],
    authController.postSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);



module.exports = router;
