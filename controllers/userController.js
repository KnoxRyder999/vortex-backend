const db = require('../db');
const jwt = require('jsonwebtoken');
const User = db.User;

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
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
