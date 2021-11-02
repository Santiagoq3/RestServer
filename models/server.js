const exp = require("constants");
const express = require("express");
const cors = require("cors")
const fileUpload  = require("express-fileupload")

const {dbConnection} = require('../database/config')

class ServerRest{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;


        this.usuariosRoutersPath = "/api/usuarios";
        this.authRoutersPath = "/api/auth";
        this.categoriasRoutersPath = "/api/categorias";
        this.productosRoutersPath = "/api/productos";
        this.buscarRoutersPath = "/api/buscar";
        this.uploudsRoutersPath = "/api/uplouds";

        //conectar a la base de datos
        this.conectardb()

        //middlewares
        this.middlewares()
        //rutas de mi aplicacion
        this.routes()
    }

    async conectardb(){
        await dbConnection()
    }

    middlewares(){
        //directorio public
        this.app.use(cors())

        //lectura y parseo

        this.app.use(express.json())

        this.app.use(express.static("public"))

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){

        this.app.use(this.usuariosRoutersPath, require('../routes/user'));
        
        this.app.use(this.authRoutersPath, require('../routes/auth'));
        this.app.use(this.categoriasRoutersPath, require('../routes/categorias'));
        this.app.use(this.productosRoutersPath, require('../routes/productos'));
        this.app.use(this.buscarRoutersPath, require('../routes/buscar'));
        this.app.use(this.uploudsRoutersPath, require('../routes/uplouds'));

        
        

    }

    listen(){

        this.app.listen(this.port)
    }

}


module.exports = ServerRest