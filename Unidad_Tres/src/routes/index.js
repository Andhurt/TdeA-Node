const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const Estudiante = require('./../models/estudiante')  // MODELO
const dirViews =  path.join(__dirname, '../../template/views');
const dirPartials=  path.join(__dirname, '../../template/partials');

require('./../helpers/helpers')

//hbs
app.set('view engine','hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials);

app.get('/',(req,res) => {
    res.render('index', {
        titulo: 'Inicio'
    })
});

app.post('/',(req,res) => {
    //SE CREA A PARTIR DE LO INGRESADO EN EL MODELO
    let estudiante = new Estudiante({
        nombre : req.body.nombre,
        matematicas : req.body.matematicas,
        ingles : req.body.ingles, 
        programacion : req.body.programacion
    })
    // SE GUARDA EN BD MONGO
    estudiante.save((err, resultado) => {
        if(err){
            res.render('indexpost', {
                mostrar : err
            }) 
        }
        res.render('indexpost', {
            mostrar : resultado
        }) 
    })
});

//Se consulta en BD por las notas! 
app.get('/vernotas',(req,res) => {
    Estudiante.find({}).exec((err,response)=>{
        if(err){
            return console.log("error!!") 
        }
        res.render('vernotas', {
            listado : response
        })
    })
});

//Para actualizar Notas
app.get('/actualizar',(req,res) => {
    res.render('actualizar')
});

app.post('/actualizar',(req,res) => {
    Estudiante.findOneAndUpdate({nombre: req.body.nombre}, req.body, {new :true, runValidators: true, context: 'query' }, (err, result) =>{
        if(err){
            return console.log(err) 
        }
        res. render('actualizar', {
            nombre : result.nombre,
            matematicas : result.matematicas,
            ingles : result.ingles, 
            programacion : result.programacion
        })
    } )
});

// ELIMINACION
app.post('/eliminar',(req,res) => {
    Estudiante.findOneAndDelete({nombre: req.body.nombre}, req.body, (err, result) =>{
        if(err){
            return console.log(err) 
        }
        if(!result){
            res. render('eliminar', {
                nombre : 'No encontrado'
            })
        }
        res. render('eliminar', {
            nombre : result.nombre
        })
    } )
});

//ERROR
app.get('*', (req, res) => {
    res.render('error',  {
        titulo: 'Error 404'
    })
});

module.exports = app