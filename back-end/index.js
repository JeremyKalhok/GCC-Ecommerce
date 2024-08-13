const port = 4000; // set the localhost port that this app will connect to

const express = require("express"); // used to import the express.js module
const app = express(); // create an instance of our app using express.js

const mongoose = require("mongoose"); // import and initialize mongoose package
const jwt = require("jsonwebtoken"); // import and initialize the jsonwebtoken
const multer = require("multer"); // ditto multer
const path = require("path"); // stores backend directory's path for the express app to access
const cors = require("cors"); // import and initialize the cors package
const { fstat } = require("fs");
const dotenv = require("dotenv").config({path : '../.env'}); // access .env file stored in parent directory
const fs = require("fs"); // used to delete images from upload directory when a product is removed

// Since no path is specified for app.use(), these functions will be executed for every request to the app
app.use(express.json()); // the response retrieved from express will automatically be passed through json
app.use(cors()); // react app will connect to express app through port 4000

// Database Connection with MongoDB
mongoose.connect(`${process.env.MONGODB_ACCESS_LINK}`); // provides access to database

// API Creation
app.get("/", (req, res) => { // respond with "Express App is Running" when a GET request is made to homepage
    res.send("Express App is Running"); // response will be printed on localhost:${port}/
});

// Image Storage Engine
const storage = multer.diskStorage({ // will download and store images in the upload/images directory. The cb (callback) parameter
    destination: './upload/images', // will generate a name for each file based on the field name (determined when the POST request is made below)
    filename: (req, file, cb) => { // which is concatenated to the date/time when it was downloaded and the original file name
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage: storage}); // pass the variable created above containing all the image files as the content of a "storage" object
// a statement of a similar format was when we created the dotenv.config() parameter

// Creating Upload Endpoint for Images
app.use('/images', express.static('upload/images')); // when the /images endpoint is reached, express will serve the images folder


app.post("/upload", upload.single('product'), (req,res) => { // parameter of upload.single (i.e. 'product') will provide the fieldname on line 26
    res.json({ // if an image is successfully requested, respond with setting success to 1 and the image url
        success: 1, // every time the post request is run, the multer.diskStorage function above will run 
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products
const Product = mongoose.model("Product", { // Format to add products to the database, using name and object parameters
    id: {
        type: Number, // the id data type should be a Number
        required: true, // if id is not available, the product will not be added to the database
    },
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, // the image url string will be generated above using multer, it won't be a file 
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // when a product is added, the date will be taken from the system's current date
    },
    available: {
        type: Boolean,
        default: true, // by default, when you add a product to the database, available will be set to true
    },
});

app.post('/addproduct', async (req, res) => { // the request is an object with populated content
    let products = await Product.find({});
    let id;
    if (products.length > 0){ // if products already exist in the database, take the id of the last product
        let last_product = products.slice(-1); // and increment it by 1, and make that the id
        id = last_product[0].id + 1; // of the new product that you are adding to the database
    } // ***slicing an array creates a new array, that is why we need to use an index on last_product
    else{ // otherwise, if the database has no products,
        id = 1;
    }
    const product = new Product({ // create the product variable based on the request parameter's data
        id: id,
        category: req.body.category,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
    });
    console.log(product); // print the new created product to the terminal
    await product.save(); // once the product is created, save it to the MongoDB database
    console.log("Saved"); // once the product is saved, print confirmation to terminal
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for Deleting Products
app.post('/removeproduct', async (req, res) => { // call the mongo function that will delete the item 
    await Product.findOneAndDelete({id: req.body.id}); // with the corresponding id from the req parameter
    fs.unlink(`./upload/images/${req.body.image}`, (error) => { // delete the image file stored in uploads/images/
        if (error) console.log(error);                          // corresponding to the product that was just deleted
        else {
            console.log("Image Deleted");
        }
    });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for getting all products
app.get('/listproduct', async (req, res) => {
    let products = await Product.find({}); // retrieves all products in database and stores them in an array
    console.log("All Products Fetched");
    res.send(products);
});

// Schema for Creating Users
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true, // only one User object can be created with each unique email
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Creating Endpoint for Registering the User
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({email: req.body.email});
    if (check){ // if the email already exists in the database, generate the following response
        return res.status(400).json({success: false, errors: "An account with this email address already exists."});
    }
    let cart = {}; 
    for (let i = 0; i < 300; i++) {
        cart[i] = 0; // creates an empty cart with 300 indexes all set to 0
    }
    const user = new Users({ // create a new User object using the fields from the request
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save(); // saves the newly created user object to the database

    const data = { // mongo autogenerates an id for each product which can be accessed by user.id
        user: {
            id: user.id,
        },
    };

    const token = jwt.sign(data, 'secret_ecom'); // generate authentication token for the new user based on the id that mongo automatically generated
    res.json({success: true, token}); // if successfully created, send the newly generated token back to the user as part of the response
});

// Creating Endpoint for User Login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email}); // retrieve the existing User object from the database that has a matching email to the request
    if (user){
        const passCompare = req.body.password === user.password // check if user-entered password is the same as the password linked to the account
        if (passCompare) { // if the passwords match, generate a token based on the user's id
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success: true, token});
        }
        else{ // else if password compare returns false
            res.json({success: false, errors: "Incorrect Password"});
        }
    }else{ // else if no User object with a matching email address exists in the database
        res.json({success: false, errors: "Incorrect Email Address"});
    }
});

// Creating Endpoint for HomeShells data
app.get('/homeshells', async (req, res) => {
    let products = await Product.find({}); // store all products in an array
    let homeshells = products.slice(0, 3); // select only the first 3 products (black, indigo, platinum controller)
    console.log("HomeShells Fetched");
    res.send(homeshells);
});

// Creating Endpoint for HomeButtons data
app.get('/homebuttons', async (req, res) => {
    let products = await Product.find({});
    let homebuttons = products.slice(10, 14);
    console.log("HomeButtons Fetched");
    res.send(homebuttons);
});

// Creating Endpoint for HomeInternals data
app.get('/homeinternals', async (req, res) => {
    let products = await Product.find({});
    let homeinternals = [];
    homeinternals.push(products[20]);
    homeinternals.push(products[24]);
    console.log("HomeInternals Fetched");
    res.send(homeinternals);
    
});

app.listen(port, (error) => { // connect to, and listen for, visitors on port 4000
    if (!error) {    // if no error, print the port number to console
        console.log(`Server Running on port ${port}`);
    }
    else {  // otherwise if there is an error, print the error number to console
        console.log(`Error: ${error}`);
    }
});