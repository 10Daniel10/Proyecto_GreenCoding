const {Router} = require ('express');
const singIn = require ('../controller/authController');

const route = Router();

route.use((requestt,response,next)=>{

next()

})

route.post ('/login',singIn)



module.exports = route