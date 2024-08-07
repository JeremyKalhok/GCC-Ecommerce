const port = 4000; // set the localhost port that this app will connect to

const express = require("express"); // used to import the express.js module
const app = express(); // create an instance of our app using express.js

const mongoose = require("mongoose"); // import and initialize mongoose package
const jwt = require("jsonwebtoken"); // import and initialize the jsonwebtoken
const multer = require("multer"); // ditto multer
const path = require("path"); // stores backend directory's path for the express app to access
const cors = require("cors"); // import and initialize the cors package
const dotenv = require("dotenv").config({path : '../.env'}); // access .env file stored in parent directory

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
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({}); // retrieves all products in database and stores them in an array
    console.log("All Products Fetched");
    res.send(products);
});

app.listen(port, (error) => { // connect to, and listen for, visitors on port 4000
    if (!error) {    // if no error, print the port number to console
        console.log(`Server Running on port ${port}`);
    }
    else {  // otherwise if there is an error, print the error number to console
        console.log(`Error: ${error}`);
    }
});