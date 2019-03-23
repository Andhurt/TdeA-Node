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

console.log(argv.nombre);