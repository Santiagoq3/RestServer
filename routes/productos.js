const {Router} = require("express");
const {check} = require("express-validator");
const { productosPost, productosGet, productosPut, productosGetPotrId, productosDelete } = require("../controllers/productos");
const { existeProductoId, existeCategoriaId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRol } = require("../middlewares/validar_rol");



const router = Router();


router.get('/', productosGet)


router.get('/:id',[
    check("id", "no es un id de mongo").isMongoId(),
    check("id").custom(id => existeProductoId(id)),
    validarCampos
],  productosGetPotrId)


router.post('/',[
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("categoria", "no es un id de mongo").isMongoId(),
    check("categoria").custom(id => existeCategoriaId(id)),
    validarCampos

], productosPost)


router.put('/:id',[
    validarJWT,
    check("id").custom(id => existeProductoId(id)),
    validarCampos
], productosPut)



router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check("id","no es un id de mongo").isMongoId(),
    check("id").custom(id => existeProductoId(id)),
    validarCampos
], productosDelete )


module.exports = router
