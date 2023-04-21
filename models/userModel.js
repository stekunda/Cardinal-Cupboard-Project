const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true],
    },
    email: {
        type: String,
        required: [true],
    },
    password: {
        type: String,
        required: [true],
    },
    appointmentStartTime: {
        type: SVGAnimatedInteger,
        required: [false],
    },
});

const User = mongoose.model("User", productSchema);

module.exports = {
    User,
    findUserByEmail: async function (email) {
        let result = {
            doc: null,
            error: null,
            errorOccured: false,
        };
        await User.findOne({ email })
            .exec()
            .then((doc) => {
                console.log("resolved");
                console.log(doc);
                result.doc = doc;
            })
            .catch((err) => {
                console.log("rejected");
                console.log(err);
                result.errorOccured = true;
                result.error = err;
            });
        if (result.errorOccured) return Promise.reject(result.error);
        return Promise.resolve(result.doc);
    },
};
