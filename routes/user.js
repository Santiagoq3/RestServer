

const {Router} = require("express");
const {check} = require("express-validator");
const { userGet, userPut, userPost, userDelete, userPatch } = require("../controllers/user");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRol, tieneRol } = require("../middlewares/validar_rol");

const { esRoleValido, existeEmail, existeUsuarioId } = require("../helpers/db-validators");


const router = Router();


router.get('/', userGet )

router.put('/:id',[
    check("id", "no es un id valido").isMongoId(),
    check("id").custom( id => existeUsuarioId(id)),
    check("rol").custom((rol)=> esRoleValido(rol)),
    validarCampos
], userPut)

router.post('/',[
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "el password es obligatorio").isLength({min: 6}),
    check("correo", "el correo no es valido").isEmail(),
    // check("rol", "No es un rol Valido").isIn(["ADMIN_ROL","USER_ROL"]),

    check("rol").custom((rol)=> esRoleValido(rol)),
    check("correo").custom(correo => existeEmail(correo)),

    validarCampos
] , userPost)

router.delete('/:id',[
    validarJWT,
    // esAdminRol,
    tieneRol("ADMIN_ROL"),
    check("id", "no es un id valido").isMongoId(),
    check("id").custom( id => existeUsuarioId(id)),
    validarCampos
], userDelete)

router.patch('/', userPatch)


module.exports = router