const Formidable = require("formidable");
const db = require('../db');
const User = db.User;

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const form = new Formidable.IncomingForm({ uploadDir: __dirname + "/../../frontend/public/uploads", keepExtensions: true, multiples: false })
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Form parsing failed!")
            }
            const getVal = val => Array.isArray(val)? val[0]: val
            const avatar = getVal(files.avatar).newFilename
            const name = getVal(fields.name)
            const email = getVal(fields.email)
            const password = getVal(fields.password)
            User.create({ name, email, password, avatar })
                .then(u => {
                    console.log(u);
                    res.send(u)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err.message)
                })
        })
    } catch (err) {
        res.status(400).json({ error: 'User creation failed' });
    }
};
