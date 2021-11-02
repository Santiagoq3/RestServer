const { response, request} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const userGet = async(req = request,res = response)=>{

    const {limite = 5} = req.query
    const usuarios = await Usuario.find()
    .limit(Number(limite))


    const total = await Usuario.countDocuments()


    res.json({
         total,
        usuarios
    })

}
const userPut = async(req,res = response)=>{

    
    const id = req.params.id
    const { _id,password,google,correo, ...resto } = req.body;
    // validar contra la base de datos 

    if(password){
        const salt = bcryptjs.genSaltSync(11);
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: "put api - controller",
        id,
        usuario
    })
}
const userPost = async(req,res = response)=>{


   

    const {nombre,correo,password,rol} = req.body;

    const user = new Usuario({nombre,correo,password,rol})


       
    //encriptar contraseña

    const salt = bcryptjs.genSaltSync(11);
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()



    res.json({
        msg: "post api - controller",
        user
    })

}
const userDelete = async(req,res = response)=>{

    const { id }  = req.params;


    const usuarioAutenticado = req.usuario;

    
    // //borrado fisico

    // const usuario = await Usuario.findByIdAndDelete( id )

    //borrado por estado
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        
        usuario,
        usuarioAutenticado
        
    })

}
const userPatch = (req,res = response)=>{

    res.json({
        msg: "patch api - controller"
    })

}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}