import mongoose from "mongoose";

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}



const userSchema = mongoose.Schema({
    id: { type: String, required: true},
    name: {type: String, required: true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
      password: { type: String, required: true,
        validate: [
            {
              validator: function(value) {
                return /^(?=.*\d).{6,}$/.test(value);
              },
              message: "Password must be at least 6 characters long and contain at least one number"
            }
          ]
        },
});

export default mongoose.model("User", userSchema);