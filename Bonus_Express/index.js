const express = require('express')
const app = express()
const {cursos, ofertaCursos, buscaCursoXId} = require('./cursos');
const opciones = {
    id_curso:{
        demand: true, 
        alias: 'i'
    }, 
    nombre:{
        demand: true, 
        alias: 'n'
    }, 
    cedula:{
        demand: true, 
        alias: 'c'
    }
}
const argv = require('yargs')
            .command('inscribir', 'Inscribirme en un curso', opciones)
            .argv

let texto;

if (argv._[0] == null){
  texto = ofertaCursos();
} else {
  let curso = buscaCursoXId(argv.id_curso);
  if (curso != 0){
    texto = '<h1>Matrícula existosa</h1> <BR>' + 
            'El nombre del estudiante es <B>' + argv.nombre + '</B> ' +
            'con cédula <B>' + argv.cedula + '.</B> <BR>' +
            'Éste se ha matriculado en el curso llamado <B>' + curso.nombre  + ' </B>' +
            'que tiene una duracion de <B>' + curso.duracion+ ' </B>' +
            'y un valor de <B>' + curso.valor+ '.</B>';
  } else {
        texto = '<h1>ERROR</h1> <BR>' + 
                '<h3>No se encontró ningún curso con el ID: ' + argv.id_curso + '</h3>';
  } 
};

app.get('/', function (req, res) {
  res.send(texto)
})
 
app.listen(3000)