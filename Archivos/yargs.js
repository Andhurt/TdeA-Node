const nombre = {
    demand: true, 
    alias: 'n'
}
const matematicas = {
    demand: true, 
    alias: 'm'
}
const ingles = {
    demand: true, 
    alias: 'i'
}
const programacion = {
    demand: true, 
    alias: 'p'
}
const creacion = {
    nombre, 
    matematicas, 
    ingles, 
    programacion
}
const muestraest = {
    nombre
}
const promedioest = {
    nombre
}
const eliminaest = {
    nombre
}
const actualizaest = {
    nombre, 
    asignatura : {
        demand : true, 
        alias: 'a'
    }, 
    calificacion : {
        demand: true, 
        alias : 'c'
    }
}

const argv = require('yargs')
            .command('crear', 'Crear un estudiante en mi BD', creacion)
            .command('mostrar', 'Muestra los estudiantes y sus notas')
            .command('muestraest', 'Muestra la información de un solo estudiante', muestraest)
            .command('promedioest', 'Muestra el promedio de un solo estudiante', promedioest)
            .command('muestramat', 'Muestra la información los estudiantes que ganaron matemáticas')
            .command('muestraprom', 'Muestra la información los estudiantes que ganan en promedio')
            .command('eliminar', 'Elimina a un solo estudiante', eliminaest)
            .command('actualizar', 'actualiza la nota de una asignatura de un estudiante', actualizaest)
            .argv;

module.exports = {
    argv
}