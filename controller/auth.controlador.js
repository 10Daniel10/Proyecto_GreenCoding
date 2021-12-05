const Usuario = require('../model/usuario.model')
let aes256 = require('aes256');
const configAuth = require('../config/auth.config')
const jwt = require('jsonwebtoken')
const authKey = configAuth.AUTH;
const jwtKey = configAuth.JWT;

const signIn = async (req, res) => {

    try {
        const usuario = await Usuario.findOne({ correo: req.body?.correo })
        if (!usuario) {
            return res.status(401).json({ response: "Verifique usuario y contraseña" })
        }

        const claveDesencriptada = aes256.decrypt(authKey, usuario.clave);
        if ( req.body?.clave !== claveDesencriptada ) {
            return res.status(401).json({ response: "Verifique usuario y contraseña" })
        }
        
        const token = jwt.sign({
            perfil: usuario.tipo,
            estado: usuario.estado
        }, jwtKey, { expiresIn: 60 * 60 * 2 }) // 2 horas

        res.status(200).json({ jwt: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ response: "Contacte al administrador" })
    }
}

module.exports = signIn