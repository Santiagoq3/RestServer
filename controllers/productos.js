const { response, json } = require("express")
const Producto = require("../models/producto")


const productosGet = async(req,res)=>{

    const productos = await Producto.find()
    .populate("usuario", "nombre")
    .populate("categoria","nombre")


    const totalProductos = await Producto.countDocuments()
    

    res.json({
        msg:" get productos",
        totalProductos,
        productos
    })
} 

const productosGetPotrId = async(req,res =response)=>{

    const id = req.params.id

    const producto  = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria","nombre")


    res.json({
        msg:" get productos por id",
        producto
    })
}

const productosPost = async(req,res = response)=>{

    const {estado,usuario, ...body} = req.body;

    const nombre = req.body.nombre

    const productosdb = await Producto.findOne({nombre})

    if(productosdb){


       return res.status(400).json({
            msg: "el producto ya existe"
        })
    }



    //generar data

    const data = {
      ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }


    const producto = await new Producto(data);

    await producto.save()



    res.status(201).json({
        msg:" post productos",
        producto
    })
}

const productosPut = async(req,res)=>{

    const id = req.params.id;

    const {estado,usuario, ...data} = req.body 

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }

    const producto = await Producto.findByIdAndUpdate(id,data)

    res.json({
        msg:"  put productos",
        producto
    })
} 


const productosDelete = async(req,res)=>{

    const id = req.params.id;

    const producto = await Producto.findByIdAndUpdate(id ,{estado: false})


    res.json({
        msg:"producto borrado",
        producto
        
    })
}


module.exports = {
    productosPost,
    productosGet,
    productosGetPotrId,
    productosPut,
    productosDelete
    
}