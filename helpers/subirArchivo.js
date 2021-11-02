const path  =require("path")
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas= ["png","jpg","jpeg"], carpeta = "")=>{

    return new Promise((res,rej)=>{

        const {archivo} = files;

        const nombreCortado = archivo.name.split(".");
        const ultimoElemento = nombreCortado.length - 1;
        const extension =nombreCortado[ultimoElemento];
    
    
    
        // validar extension
    
    
        if(!extensionesValidas.includes(extension)){
           
    
            return rej(`la extension ${extension} no es valida`)
        }else{
            console.log("vlaido")
        }
    
    
        const nombreTemp = uuidv4() + "." + extension
        const uploadPath =path.join(  __dirname, '../uploads/',carpeta, nombreTemp);
      
        archivo.mv(uploadPath, function(err) {
          if (err) {
             rej(err)
          }
      
          res(nombreTemp)
        });

    })

   

}


module.exports = subirArchivo