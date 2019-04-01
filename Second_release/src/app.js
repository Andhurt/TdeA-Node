const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');

const dirNode_modules = path.join(__dirname , '../node_modules')
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
app.use(session({
    secret: 'It´s a secret',
    resave: true,
    saveUninitialized: true
}))

require('./helpers');

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');

app.get('/',(req,res) => {
    res.render('index', {
        estudiante: 'Andrés Huertas'
    })
});

app.post('/calculos', (req, res) =>{
    res.render('calculos', {
        estudiante: req.body.nombre, 
        nota1: parseInt(req.body.nota1), 
        nota2: parseInt(req.body.nota2), 
        nota3: parseInt(req.body.nota3)
    })
});

app.get('/crearcurso', (req, res) =>{
    res.render('crearcurso', {})
});

app.post('/crearcursox', (req, res) =>{
    res.render('cursos', {
        id: parseInt(req.body.id), 
        nombre: req.body.nombre, 
        modalidad: req.body.modalidad, 
        valor: parseInt(req.body.valor), 
        descripcion: req.body.descripcion, 
        intensidad: parseInt(req.body.intensidad)
    })
});

app.get('/vercursos', (req, res) =>{
    res.render('cursos_est', {})
});

app.get('/registrar', (req, res) => {
    res.render('registrar', {})
})

app.post('/registrarUsuario', (req, res) => {
    res.render('registrarUsuario', {
        id: parseInt(req.body.id), 
        nombre: req.body.nombre, 
        correo: req.body.correo, 
        telefono: parseInt(req.body.telefono), 
    })
    
})

app.get('/matricular', (req, res) => {
    res.render('matricular', {})
})

app.post('/matricularCurso', (req, res) => {
    res.render('matricularCurso', {
        id: parseInt(req.body.id), 
        nombre_curso: req.body.nombreCurso
    })
})

app.get('/admincursos', (req, res) => {
    res.render('admincursos', {})
})

app.get('/adminmatriculas', (req, res) => {
    res.render('adminmatriculas', {})
})

app.post('/cerrarCurso', (req, res) => {
    res.render('cursoCerrado', {
        idCursoCerrado: parseInt(req.body.idCursoCerrado)
    })
})

app.post('/eliminarMatricula', (req, res) => {
    res.render('matriculaEliminada', {
        id: parseInt(req.body.id), 
        id_curso: parseInt(req.body.nombreCurso)
    })
})

app.get('*', (req, res) => {
    res.render('error',  {
        estudiante: 'error'
    })
});

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000')
});