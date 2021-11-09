const { response, request } = require("express");


const esAdminRol = (req = request,res = response,next)=>{

    const usuario = req.usuario;

    if(usuario.rol !== "ADMIN_ROL"){
        return res.status(401).json({
            msg: "Rol no autorizado - no eres administrador"
        })
    }

    next()
}

const tieneRol = (...roles)=>{

    return (req=request, res =response, next) =>{

        const usuario = req.usuario;


        if(!roles.includes(usuario.rol)){
            return res.status(401).json({
                msg: `El usuario no tiene estos roles: ${roles}`
            })
        }
        next()
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}