const {Schema, model} = require("mongoose");

const rolSchema = Schema({
    rol:{
        type: String,
        required: [true,"el Rol es obligatorio"]
    }
})


module.exports = model("Role", rolSchema)