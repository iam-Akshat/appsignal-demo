const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');


const server = http.createServer(app)



mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/todo',{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
    server.listen(process.env.PORT || 3000,()=> console.log('Server started....'))
})


