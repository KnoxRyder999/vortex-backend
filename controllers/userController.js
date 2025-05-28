const { Op } = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const User = db.User;

exports.getAllUsers = async (req, res) => {
    try {
        User.findAll({
            where: {
                isAdmin: {
                    [Op.and]: [
                        { [Op.gt]: 0 },
                        { [Op.lt]: 3 }
                    ]
                }
            }
        })
            .then(list => res.send(list))
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Error fetching users' });
            })
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

exports.login = (req, res) => {
    try {
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                if (!user) return res.status(500).json({ message: 'Invalid email or password.' });
                if (!user.validatePassword(password)) return res.status(500).json({ message: 'Invalid email or password.' });
                const token = jwt.sign(
                    { ...user }, // payload
                    process.env.JWT_SECRET,
                    { expiresIn: '2h' } // expires in 2 hours
                );
                res.send({ token, user })
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err.message)
            })
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }
}

exports.register = (req, res) => {
    try {
        const { name, email, password, avatar } = req.body
        User.findOne({ email })
            .then(found => {
                if (found) return res.status(400).send({ message: "Already registered email." })
                User.create({ name, email, password, avatar })
                    .then(user => {
                        const token = jwt.sign(
                            { ...user, password: "", salt: "" }, // payload
                            process.env.JWT_SECRET,
                            { expiresIn: '2h' } // expires in 2 hours
                        );
                        res.send({ token, user })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send(err.message)
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).send("failed to register user")
            })
    } catch (err) {
        res.status(400).json({ error: 'User creation failed' });
    }
};

exports.updateUser = function (req, res) {
    try {
        const { id } = req.params
        let newuser = {}
        const { avatar, name, email, password, changepassword, newpassword, confirmpassword } = req.body
        User.findByPk(id)
            .then(found => {
                if (!found) return res.status(400).send({ message: "User not founded!" })
                if (!found.validatePassword(req.body.password)) return res.status(400).send("password is not correct!")
                if (changepassword) {
                    if (newpassword !== confirmpassword) return res.status(400).send("no match confirm password!")
                    newuser.password = newpassword
                }
                if (name) newuser.name = name
                if (email) newuser.email = email
                if (avatar) newuser.avatar = avatar
                found.update(newuser)
                    .then(n => res.send(n))
                    .catch(err => {
                        console.log(err);
                        res.status(500).send("failed to update user!")
                    })
            })
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "failed to update user!" })
    }
}
