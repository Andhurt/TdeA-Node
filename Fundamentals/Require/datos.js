// const estudiante1 = require('./calculos');

// console.log(estudiante1.estudiante);
// console.log("El promedio del estudiante es " + 
//     estudiante1.obtenerPromedio(estudiante1.estudiante.notas.matematicas,
//         estudiante1.estudiante.notas.ingles,estudiante1.estudiante.notas.programacion));

// ESTO ES DE DESTRUCTURACION 
const {estudiante, obtenerPromedio} = require('./calculos');

console.log('El nombre del estudiantes es' + estudiante.nombre);
console.log("El promedio del estudiante es" + 
    obtenerPromedio(estudiante.notas.matematicas,
        estudiante.notas.ingles,estudiante.notas.programacion));

let{nombre, edad : anos , notas:{ matematicas, ingles, programacion}} = estudiante;
console.log('el nombre del estudiante es: ' + nombre);
console.log("El promedio del estudiante es: " + 
    obtenerPromedio(matematicas, ingles, programacion));
console.log('La edad del estudiante es: ' + anos);

//Esto es Require Nativo (ejemplo el File System)
const fs = require('fs');

let crearArchivo = () => {
    texto = 'El nombre del estudiante es ' + nombre + '\n' +
            'ha obtenido un promedio de ' + obtenerPromedio(matematicas, ingles, programacion);
    fs.writeFile('promedio.txt', texto, (err)=> {
        if (err) throw (err);
        console.log('se ha creado el archivo')
    });
}

crearArchivo();
