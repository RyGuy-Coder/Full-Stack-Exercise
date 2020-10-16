const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/formsDB', { useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', () => {
    console.log('mongoose connection error');
});

db.once('open', () => {
    console.log('mongoose connected successfully');
});

const formSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String

});
const Form = mongoose.model("Form", formSchema);


const adminSchema = mongoose.Schema({
    username: String,
    password: String
});


const Admin = mongoose.model("Admin", adminSchema);



const testForm = new Form({
    name: "Ryan",
    email: "ryanpmcfarland@gmail.com",
    phone: "15043587579"
}) 

//testForm.save();


/**
*  This function will save a form to the database
* @param {object} form
*/
const saveForm = (form) => {
    const newForm = new Form({
        name: form.name,
        phone: form.phone,
        email: form.email
    });
    newForm.save()
        .then(console.log('saved in the database'))
        .catch(console.log(`omg cmon`));
};


/**
*  This function will save an admin to the database
* @param {object} form
*/
const saveAdmin = (admin) => {
    const newAdmin = new Admin({
        username: admin.username,
        password: admin.password,
    });
    newAdmin.save()
        .then(console.log('saved in the database'))
        .catch(console.log(`omg cmon`));
};


/**
*  This function will find an admin saved in the database
* @param {function} callback
*/
const selectAdmin = (password, callback) => {
    Admin.findOne(password, (err, admin) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, admin);
        }
    });
};


/**
*  This function will find all forms saved in the database
* @param {function} callback
*/
const selectAll = (callback) => {
    Form.find({}, (err, forms) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, forms);
        }
    });
};



/**
*  This function will find all phone numbers saved in the database
* @param {function} callback
*/
const selectNumbers = (callback) => {
    Form.distinct("phone", (err, numbers) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, numbers);
        }
    });
};

module.exports.selectAll = selectAll;
module.exports.saveForm = saveForm;
module.exports.selectNumbers = selectNumbers
module.exports.selectAdmin = selectAdmin
module.exports.saveAdmin = saveAdmin
