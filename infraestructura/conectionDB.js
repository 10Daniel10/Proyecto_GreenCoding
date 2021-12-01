const mongoose = require ('mongoose')
const urlDB = 'mongodb+srv://greencoding:greencoding@cluster0.jq49j.mongodb.net/grupoInvestigacion?retryWrites=true&w=majority'
mongoose.connect (urlDB);
const mongoDB = mongoose.connection;
mongoDB.on('open', _ =>{
    console.log("conectado a la bd")
})