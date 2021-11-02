const {Router} = require("express");
const { buscarGet } = require("../controllers/buscar");


const router = Router();


router.get("/:coleccion/:termino", buscarGet)






module.exports = router