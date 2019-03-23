const fs = require('fs');
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

let curso = buscaCursoXId(argv.id_curso);

let crearArchivo = () => {
    texto = 'El nombre del estudiante es ' + argv.nombre + '\n' +
            'con cédula ' + argv.cedula + '\n' +
            'se ha matriculado en el curso llamado ' + curso.nombre  + '\n' +
            'que tiene una duracion de ' + curso.duracion+ '\n' +
            'y un valor de ' + curso.valor+ '\n'  ;
    fs.writeFile('matricula.txt', texto, (err)=> {
        if (err) throw (err);
        console.log('se ha creado el archivo')
    });
}

if (argv._[0] == null){
    ofertaCursos(0);
} else {
    if (curso != 0){
        crearArchivo();
    } else {
        console.log('No se encontró ningún curso con el ID: ' + argv.id_curso)
    } 
};
