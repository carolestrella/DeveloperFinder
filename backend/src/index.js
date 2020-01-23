const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require ('./routes')

const app = express();
mongoose.connect('mongodb+srv://carolestrella:carol123@nodejscluster-sytff.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors())
//cadastra para entender requisições que tem o corpo json
app.use(express.json()) //vale para todas as rotas da aplicação 
app.use(routes);

app.listen(3333);

//Tipos de parâmetros:
//Query Params: request.query (Filtros, ordenação, paginação, etc)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de registros)