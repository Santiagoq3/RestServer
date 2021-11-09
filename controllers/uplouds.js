const path = require("path");
const fs = require("fs")

const { response, request } = require("express");

const subirArchivo = require("../helpers/subirArchivo");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

const cargarArchivos = async(req = request,res=response)=>{

  
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({
          msg: "no hay archivos subidos"
      });
      return;
    }
    if (!req.files.archivo) {
      res.status(400).json({
          msg: "no hay archivos subidos"
      });
      return;
    }
    try {
        const path = await subirArchivo(req.files,undefined,"imgs");
        
        res.json({
            path
        })
    } catch (error) {

        res.status(400).json({
            error
        })
    }
}

const actualizarArchivos = async(req,res=response)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({
            msg: "no hay archivos subidos"
        });
        return;
      }


    const {id,coleccion} = req.params;


    let modelo;

    switch (coleccion) {
        case "usuarios":
            
            modelo =await Usuario.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg: "no existe el usuario"
                })
            }
            break;
        case "productos":

            modelo =await Producto.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg: "no existe el Producto"
                })
            }
            
           
        default:
           return res.status(500).json({
               msg: "se me olvido validar esto"
           })
    }

    // Borrar imagenes antiguas

    if(modelo.img){
        const pathImagen = path.join(__dirname, "../uploads",coleccion, modelo.img)

        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }

    modelo.img = await subirArchivo(req.files,undefined,coleccion);

    await modelo.save()
        
    res.json({
        id,
        coleccion,
        modelo
    })
}


module.exports = {
    cargarArchivos,
    actualizarArchivos
}