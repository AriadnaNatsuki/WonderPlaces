const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true
        },
        images: {
            type: [String],
        },
        price: {
            type: Number,
        },
        capacity: {
            type: Number,
        },
        description: {
            type: String,
        },
        services: {
            type: [String],
        },
        activities: {
            type: [String],
        },
        city: {
            type: String,
        },
        element: {
            type: String,
        },
        petfriendly: {
            type: Boolean
        },
        veganoptions: {
            type: Boolean
        } 
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, SALT_ROUNDS)
            .then((hash) => {
                this.password = hash;
                next();
            })
    } else {
        next();
    }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
}

const Place = mongoose.model("Place", userSchema);



module.exports = Place;
