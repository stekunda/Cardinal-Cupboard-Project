const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;

const apiApp = express();

apiApp.use(cors());
apiApp.use(express.json());
// apiApp.use(express.urlencoded({ extends: false }));
//
//
//
//
apiApp.use(bodyParser.urlencoded({ extended: true }));

apiApp.use(express.static("public"));

// Some of these are commands for the admin in case they are needed
apiApp.post("/holler", async (req, res) => {
    //console.log(req.body);
    const { parcel } = req.body;
    const text = parcel.split("\n");
    const email = text[0];
    const password = text[1];
    console.log("email: " + email);
    console.log("password: " + password);

    let result = {
        doc: null,
        error: null,
    };
    await User.findUserByEmail(email)
        .then((doc) => (result.doc = doc))
        .catch((err) => (result.error = err));
    if (result.error) {
        return res.status(500).send({
            status: "Server error",
        });
    }

    console.log(result);
    if (result.doc && result.doc.email === email) {
        return res.status(200).send({ status: "Success" });
    } else {
        return res.status(400).send({ status: "Email not found" });
    }

    //console.log(`Email is: ${email} \nPassword is: ${password}`);
});

apiApp.get("/userLogin", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.find(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//
//
//
//
//

// Get All Users
apiApp.get("/users", async (req, res) => {
    try {
        const products = await User.User.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get User by ID
apiApp.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a User
apiApp.post("/user", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Update User Info
apiApp.put("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        // we cannot find any user in database
        if (!user) {
            return res
                .status(404)
                .json({ message: `cannot find any user with ID ${id}` });
        }
        const updatedProduct = await User.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a User
apiApp.delete("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        // we cannot find any user in database
        if (!user) {
            return res
                .status(404)
                .json({ message: `cannot find any user with ID ${id}` });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const uri =
    "mongodb+srv://username:password@cluster0.23nkp9v.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

apiApp.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
