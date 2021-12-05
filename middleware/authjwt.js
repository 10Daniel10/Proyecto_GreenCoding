const jwt = require('jsonwebtoken')
const configAuth = require('../config/auth.config')
const jwtKey = configAuth.JWT;

const validarToken = (req, res, next) => {

    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ response: "Token inválido" })
    }

    try {
        // vefificar jwt
        const data = jwt.verify(token, jwtKey)
        if (data) {
            req.perfil = data.perfil
            req.estado = data.estado
            next();
            return
        }
        return res.status(401).json({ response: "Token inválido" })

    } catch (error) {
        console.log( error )
        return res.status(401).json( { response: "Error al autorizar" })
    }



}

const admin = (req, res, next) => {
    if ( req.estado !== "Autorizado" || req.perfil !== "Administrador" ){
        return res.status(403).json( { response: "Permisos insuficientes" })
    }
    next();
}

const estudiante = (req, res, next) => {
    if ( req.estado !== "Autorizado" || req.perfil !== "Estudiante" ){
        return res.status(403).json( { response: "Permisos insuficientes" })
    }
    next();
}

const lider = (req, res, next) => {
    if ( req.estado !== "Autorizado" || req.perfil !== "Lider" ){
        return res.status(403).json( { response: "Permisos insuficientes" })
    }
    next();
}

module.exports = {
    validarToken,
    admin,
    estudiante,
    lider
}