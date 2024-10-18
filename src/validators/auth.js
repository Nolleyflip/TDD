const { check } = require('express-validator');
const db = require('../db');
const { compare } = require('bcryptjs');

const password = check('password')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password must be at least 6 characters long');


    const email = check('email')
    .isEmail()
    .withMessage('Please provide a valid email');


const emailExists = check('email')
    .custom(async (value) => {
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [value]);
        if (existingUser.rows.length) {
            throw new Error('Email already in use');
        }
    })


    const loginFieldCheck = check('email').custom(async (value , {req})=> {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [value]);
        if (!user.rows.length) {
            throw new Error('Email or password is incorrect');
        }
        const validPassword = await compare(req.body.password, user.rows[0].password);
        if (!validPassword) {
            throw new Error('Email or password is incorrect');
        }
        req.user = user.rows[0];
    })

    module.exports = {
        registerValidation: [
            email,
            password,
            emailExists
        ],
        loginValidation: [
            email,
            password,
            loginFieldCheck
        ]
    }




