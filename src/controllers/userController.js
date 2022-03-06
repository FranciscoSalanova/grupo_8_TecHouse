const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

const logReg = {
    logMethod: (req, res) => {
        res.render("users/login", {
            siteTitle: "Login",
        });
    },

    regMethod: (req, res) => {
        res.render("users/signup", {
            siteTitle: "Signup",
        });
    },

    createMethod: (req, res) => {
        const created = req.body
        lastId = users[users.length - 1].id + 1;
        created.id = lastId
        users.push(created)
        created.image = req.file.filename
        created.password = bcryptjs.hashSync(req.body.password, 10);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
        
        res.send (users) //Para arreglar
    },

    loginMethod: (req, res) => {
      
        let errors = validationResult(req);
                if (errors.isEmpty()) {
                    res.redirect("/list")
                } else {
                res.render('users/login', { errors: errors.mapped(), old: req.body, siteTitle: "Login" });
    
            }
    }


}

module.exports=logReg