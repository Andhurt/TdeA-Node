const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');

const dirNode_modules = path.join(__dirname , '../node_modules')
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

require('./helpers');

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');
app.use(express.static(directoriopublico));
app.use(bodyParser.urlencoded({extended: false}));
hbs.registerPartials(directoriopartials);


app.set('view engine', 'hbs');

app.get('/',(req,res) => {
    res.render('index', {
        titulo: 'Inicio'
    })
});

app.post('/calculos', (req, res) =>{
    res.render('listarcursos', {
        estudiante: req.body.nombre, 
        nota1: parseInt(req.body.nota1), 
        nota2: parseInt(req.body.nota2), 
        nota3: parseInt(req.body.nota3)
    })
});

app.get('*', (req, res) => {
    res.render('error',  {
        titulo: 'error'
    })
});

app.get('/listado',(req,res) => {
    res.render('listarcursos', {
        titulo: 'Inicio'
    })
});

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000')
});