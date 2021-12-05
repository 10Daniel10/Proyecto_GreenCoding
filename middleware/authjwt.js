const jwt = require('jsonwebtoken')
const key = 'CLAVEADMIN';

const validarToken = (request, response, next) => {
    const token = request.headers['authorization']
    if (!token) {
        return response.status(401).json({ response: "Token invalido" })
    }
    try {
        const perfil = jwt.verify(token, key)
        if (perfil) {
            console.log(perfil)
            request.tipo = perfil.rolUser
            next();
            return
        }
        return response.status(401).json({ response: "Token invalido" })
    } catch (error) {
        return response.status(401).json({ response: "Token invalido" })
    }
}
const admin = (request, response, next) => {
    if (request.perfil!= "Administrador") {
        return response.status(403).json({ response: "Permisos insuficientes" })
    }
    next();
}
const isLider = (rol) => {
    return rol === "Lider"
}
const isAdmin = (rol) => {
    return rol === "Admin"
}

const estudiante = (request, response, next) => {
    if (request.perfil!= "Estudiante") {
        return response.status(403).json({ response: "Permisos insuficientes" })
    }
    next();
}
module.exports = {
    validarToken,
    admin,
    estudiante,
    isAdmin,
    isLider
}