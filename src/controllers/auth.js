const db = require('../db');
const {hash} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
const {SECRET} = require('../constants');


exports.logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token', { httpOnly: true }).json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        console.error(error);
       return res.status(500).json({
      error: error.message,
    }) 
    }
}


exports.protected = async (req, res) => {
    try {
        return res.status(200).json({
          info: "Protected info",
        });
    }catch(error){
 console.log(error.message);
        return res.status(500).json({
          error: error.message,
        });
    }
   
    

   
}

exports.login = async (req, res) => {
    try {
        let user = req.user;
        
        let payload = {
            id: user.id,
            email: user.email,
        }
      
        const token =  await sign(payload, SECRET)

        return res.status(200).cookie(`token`, token, { httpOnly: true }).json({
            success: true,
            message: 'Login successful',
        });
    } catch (error) {
        console.error(error);
       return res.status(500).json({
         error: error.message,
       });
    }
}


exports.getUsers = async (req, res) => {
    try {
        const { rows } = await db.query("select user_id, email from users");
         return res.status(200).json({
           success: true,
           users: rows,
         });
    } catch (error) {
        console.error(error);
       return res.status(500).json({
         error: error.message,
       });
    }
};

exports.register = async (req, res) => {
    try {

        const hashPassword = await hash(req.body.password, 10);
        const { email, password } = req.body;
        const newUser = await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashPassword]
        );

        return res.status(201).json({
          success: true,
          message: "The registraion was succefull",
        });
    } catch (error) {
        console.error(error);
       return res.status(500).json({
         error: error.message,
       });
    }
}



