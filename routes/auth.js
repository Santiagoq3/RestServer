const {Router} = require("express");
const {check} = require("express-validator");
const { loginPost, googleSignInPost } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();


router.post('/login',[

    check("correo", "el correo es obligatorio").isEmail(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),

    validarCampos

], loginPost  );


router.post('/google',[

    check("id_token", "el id token de google es requerido").not().isEmpty(),
    

    validarCampos

], googleSignInPost  );



module.exports = router;