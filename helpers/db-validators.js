
const Usuario = require('../models/usuario')
const Role = require('../models/role')
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');


const esRoleValido = async(rol = "") =>{
    const existeRol = await Role.findOne({rol});

    if(!existeRol){
        throw new Error(`El rol ${rol} no esta la en base de datos`)
    }

}

const existeEmail = async(correo = "")=>{

    const existeEmail = await Usuario.findOne({correo})

    if(existeEmail){
        // return res.status(400).json({
        //     msg: "ese correo ya esta registrado"
        // })
        throw new Error(`el email ${correo} ya existe)`)
    }
}


const existeUsuarioId = async(id )=>{

    const existeUsuario = await Usuario.findById(id)

    if(!existeUsuario){
        // return res.status(400).json({
        //     msg: "ese correo ya esta registrado"
        // })
        throw new Error(`el usuario con el id: ${id} no existe)`)
    }
}
const existeCategoriaId = async(id )=>{

    const existeCategoria = await Categoria.findById(id)

    if(!existeCategoria){
        // return res.status(400).json({
        //     msg: "ese correo ya esta registrado"
        // })
        throw new Error(`la categoria con el id: ${id} no existe)`)
    }
}
const existeProductoId = async(id )=>{

    const existeProducto= await Producto.findById(id)

    if(!existeProducto){
        // return res.status(400).json({
        //     msg: "ese correo ya esta registrado"
        // })
        throw new Error(`el producto con el id: ${id} no existe)`)
    }
}


const validarColecciones = (coleccion,colecciones = [])=>{

    const incluida = colecciones.includes(coleccion)

    if(!incluida){
        throw new Error("la coleccion no es permitida" + colecciones)
    }


    return true


}





module.exports ={
    esRoleValido,
    existeEmail,
    existeUsuarioId,
    existeCategoriaId,
    existeProductoId,
    validarColecciones
}