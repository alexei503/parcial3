const Mongoose= require ("mongoose");

const RegisterSchema = Mongoose.Schema({
    Nombre: String,
    Marca: String,
    precio: Number,
    Tamaño: Number,
});

module.exports = Mongoose.model("Register", RegisterSchema);