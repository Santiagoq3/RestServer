
const {Router} = require("express");
const {check} = require("express-validator");
const { categoriasPost, obtenerCategoriasGet, obtenerCategoriaPorId, categoriasPut, categoriasDelete } = require("../controllers/categorias");
const { existeCategoriaId } = require("../helpers/db-validators");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const { tieneRol } = require("../middlewares/validar_rol");



const router = Router();

//obtener todas las categorias- publico
router.get('/', obtenerCategoriasGet );

//obtener una categorias por id - publico
router.get('/:id', [
  check("id", "No es un id de categoria").isMongoId(),
  check("id").custom(id => existeCategoriaId(id)),
  validarCampos
] ,obtenerCategoriaPorId);

//crear categoria - privado - cualquier user con token vlaido

router.post('/',[
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    validarCampos
] , categoriasPost);

//actualizar - privado - cualquier persona con un token valido

router.put('/:id',[
  validarJWT,
  check("id", "No es un id de categoria").isMongoId(),
  check("id").custom(id => existeCategoriaId(id)),
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos
], categoriasPut  );


//borrar un categoria - admin
router.delete('/:id',[
  validarJWT,
  tieneRol("ADMIN_ROL"),
  check("id", "No es un id de categoria").isMongoId(),
  check("id").custom(id => existeCategoriaId(id)),

  validarCampos
], categoriasDelete );







module.exports =  router
