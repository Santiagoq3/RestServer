const { response, json } = require("express")
const Categoria = require('../models/categoria')




const obtenerCategoriasGet = async(req,res = response)=>{

    const categorias = await Categoria.find().populate("usuario","nombre");

    const totalCategorias = await Categoria.countDocuments()
    res.json({
        msg: "obtener categorias get",
        totalCategorias,
        categorias
    })
  }


const obtenerCategoriaPorId = async(req,res)=>{

    const {id} = req.params;

    const categoria = await Categoria.findById( id)
    
        // if(!categoria){
        //     return res.status(400).json({
        //         msg: "No se encontro ninguna categoria con ese id"
        //     })
        // }


    res.json({
        msg: "get por id",
        categoria
        
    })
  }

const categoriasPost = async(req,res =response)=>{

    const nombre = req.body.nombre.toUpperCase()

    const categoriafb = await Categoria.findOne({nombre})

    if(categoriafb){


       return res.status(400).json({
            msg: "la categoria ya existe"
        })
    }

    //generar la data
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    //creamos una nueva categoria

    const categoria = await new Categoria(data) ;

    await categoria.save()

    res.status(201).json({
        msg: "post",
        nombre,
        categoria
    })
  } 


  const categoriasPut = async(req,res)=>{

    const id = req.params.id;

    const {estado,usuario,...resto} = req.body;
    const {nombre} = req.body;

   const existeCategoria = await Categoria.findOne({nombre})

    if(existeCategoria){
        return res.status(400).json({
            msg: "error al asignar el nombre, esa categoria ya existe"
        })
    }


    const categoria  =await Categoria.findByIdAndUpdate(id,resto)

    res.json({
        msg: "put",
        id,
        categoria
    })
  }

  const categoriasDelete = async(req,res)=>{

    const {id} = req.params;


    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false})

    res.status(201).json({
        msg: "categoria eliminada correctamente",
        categoria
    })
  }



  module.exports = {
      categoriasPost,
      obtenerCategoriasGet,
      obtenerCategoriaPorId,
      categoriasPut,
      categoriasDelete
  }