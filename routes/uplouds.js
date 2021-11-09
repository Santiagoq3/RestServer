const {Router} = require("express");
const {check} = require("express-validator");
const { cargarArchivos, actualizarArchivos } = require("../controllers/uplouds");
const { validarColecciones } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/",cargarArchivos)

router.put("/:coleccion/:id", [
    check("id", "el id debe ser de mongo").isMongoId(),
    check("coleccion").custom(c => validarColecciones(c, ["usuarios","productos"])),
    validarCampos
],actualizarArchivos)

module.exports = router;