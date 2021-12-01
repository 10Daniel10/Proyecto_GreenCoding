const Usuario = require ('../model/usuarioModels')
const jwt = require('jsonwebtoken')
let aes256 = require('aes256');
const key = 'CLAVEADMIN';

const singIn = async (request,response) =>{
try{
    const usuario = await Usuarios.findOne ({email: request.body?.email})
    if (!usuario){
        return response.status(401).json({response:"Verifique Usuario y contraseña"})
    }
const claveDesencriptada = aes256.decrypt(key,request.body?.clave)
if (request.body?.clave != claveDesencriptada){
    return response.status(401).json({ response: "Verique usuario y contrasena" })
}
const token = jwt.sign({
    rolUser: usuario.perfil
}, key, { expiresIn: 60 * 60 * 2 })

response.status(200).json({ jwt: token })
   
}
catch (error) {
    console.log(error)
    response.status(500).json({ response: "Contacte al administrador" })
}

}

/*
    401 -> no autorizado
    403 -> Recurso probihido para el rol actual
    404 -> not found - Recurso que pediste no exist
    400 -> Enviaste algo que no era o bad Request
    500 -> Se exploto el servidor
    200 -> Todo bien
    */


module.exports = singIn;