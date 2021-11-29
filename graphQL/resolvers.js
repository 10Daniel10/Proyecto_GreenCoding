const { obtenerUsuarios, setEstadoUsuario, createUser, obtenerUsuario,borrarusuario } = require('../services/usuario.service');
const { obtenerProyectos, InscribirmeProyecto,createProyecto,limpiarInscritos,verAvances ,RegistrarAvances,ModificarAvances} = require('../services/proyecto.service');
const { GraphQLDateTime } = require('graphql-iso-date');
//llamarlos aca
const customScalarResolver = {
  Date: GraphQLDateTime
};
///les quedo debiendo las validaciones que si el usuario es de tipo estudiante o lider
///les quedo debiendo las validaciones que si el usuario es de estado autorizado
const resolvers = {

  Date: customScalarResolver,

  Query: {
    obtenerUsuarios: async () => obtenerUsuarios(),
    obtenerUsuario: async (parent, args, context, info) => obtenerUsuario(args.id),
    obtenerProyectos: async () => obtenerProyectos(),
    verAvances: async (parent, args, context, info) => verAvances(args.idProyecto,args.estudiante),
  },

  Mutation: {
    ModificarAvances:async (parent, args, context, info)=>ModificarAvances(args.idProyecto, args.idAvance, args.descripcion, args.idUsuario),
    RegistrarAvances:async (parent, args, context, info)=>RegistrarAvances(args.idProyecto, args.fechaAvance, args.descripcion,args.idUsuario),
    borrarusuario: async (parent, args, context, info) => borrarusuario(args.id),
    limpiarInscritos: async (parent, args, context, info) => limpiarInscritos(args.id),
    setEstadoUsuario: async (parent, args, context, info) => setEstadoUsuario(args.id, args.estado),

    createUser: async (parent, args, context, info) => createUser(
      args.nombre,
      args.correo,
      args.clave,
      args.tipo,
      args.estado),
    InscribirmeProyecto: async (parent, args, context, info) => InscribirmeProyecto(args.idProyecto, args.idUsuario,args.estado,args.fechaIngreso,args.fechaEgreso),
    createProyecto: async (parent, args, context, info) => createProyecto(
      args.nombreProyecto,
      args.objGeneral,
      args.objEspecifico,
      args.presupuesto,
      args.fechaInicio,
      args.fechaTermina,
      args.lider,
      args.estado,
      args.fase,
      args.estudiantesInscritos,
      args.avances,
    )
  },


}

module.exports = resolvers;
/**
 *
 *
 * 
 * query ObtenerProyectos {
  obtenerProyectos {
    id,
nombreProyecto,
objGeneral,
objEspecifico,
presupuesto,
fechaInicio,
fechaTermina,
lider {
  id
},
estado,
fase,
estudiantesInscritos:estudiantesInscritos {
  id
},
avances:avances {
  id
},
}
}
 */
/*
mutation {
  InscribirmeProyecto(idProyecto: "001", id: "14645646464645") {
    idEstudianteInscrito,
    estudiante {
      id
    },
    proyecto {
      idProyecto
    },
    estado,
    fechaIngreso,
    fechaEgreso
  }
}


{
  "data": {
    "createUser": {61a373c5a88205c54b0c3515
      "id": "61a22447912605a0fc1a16cd",
      "nombre": "wilmer",
      "correo": "asiwilmer@gmail.com",
      "clave": "123",
      "tipo": "Estudiante",
      "estado": "Pendiente"
    }
  }
}
{
  "data": {
    "createProyecto": {
      "id": "61a2266bdb2b798aae9b5d20",
      "nombreProyecto": "Proyecto Alice Activado",
      "objGeneral": null,
      "objEspecifico": null,
      "presupuesto": null,
      "fechaInicio": "2021-11-27T12:36:46.478Z",
      "fechaTermina": null,
      "lider": null,
      "estado": "Inactivo",
      "fase": "Nulo",
      "estudiantesInscritos": [],
      "avances": []
    }
  }
}

*/ 