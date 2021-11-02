const {response, json} = require("express");

const Bcrypt = require("bcryptjs")

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");


const loginPost = async(req, res = response) =>{


    const {correo,password} = req.body;

    try {


        const usuario = await Usuario.findOne({correo})
        // vericando el correo
        if(!usuario){
            return res.status(400).json({
                msg: "El usuario no existe xd"
            })

            
        }

        //verificar el estado
        if(!usuario.estado){
            return res.status(400).json({
                msg: "el usuario esta dado de baja"
            })
        }

        const validPassword =  Bcrypt.compareSync(password,usuario.password)

        if(!validPassword){
            return res.status(400).json({
                msg: "La contraseña no es correcta"
            }
            )
        }
        
        //generar jwt
        const token = await generarJWT(usuario.id)
        res.json({
            msg: "login ok",
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "ALgo salio mal"
        })
    }


  
}

const googleSignInPost = async(req,res = response)=>{

    const {id_token} = req.body;

    try {

        const {correo,nombre,img} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({correo})

        if(!usuario){
            // tengo que crearlo

            const data = {
                nombre,
                correo,
                img,
                password: ":p",
                google: true,
                rol: "USER_ROL"
            }

            usuario = new Usuario(data);
            await usuario.save();



        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "el usuario fue eliminado"
            })
        }

        const token = await generarJWT(usuario.id)

        
        res.json({
            token,
            usuario
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "el token no se pudo verificar"
        })
    }
}
    



module.exports ={
    loginPost,
    googleSignInPost
}