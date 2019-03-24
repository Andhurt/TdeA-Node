const fs = require('fs');
listaEstudiantes = []

const crear = (estudiante) =>{
    listar();
    let est ={
        nombre : estudiante.nombre, 
        matematicas : estudiante.matematicas, 
        ingles : estudiante.ingles, 
        programacion : estudiante.programacion
    };
    //control de estudiantes duplicados
    let duplicado = listaEstudiantes.find(nom => nom.nombre == estudiante.nombre)
    if (!duplicado){
        listaEstudiantes.push(est);
        console.log(listaEstudiantes);
        guardar();
    } else{
        console.log('Ya existe otro estudiantes con ese nombre!');
    } 
}

/* Esta funcion es para leer el archivo. Puede hacerse de forma sincrónica o asincrónica.
La diferencia depende de que tanto va a variar también el archivo a leer. */
const listar = () => {
    //forma asincrona - cambia mucho
    // listaEstudiantes = JSON.parse(fs.readFileSync('./listado.json'));  
    try{
        listaEstudiantes = require('./listado.json');  //forma sincrona - No cambia tanto
    } catch(error){
        listaEstudiantes = [];
    }
}

// esta funcion es para guardar todo en un json
const guardar = () => {
    let datos = JSON.stringify(listaEstudiantes);
    fs.writeFile('listado.json', datos, (err)=>{
        if (err) throw (err);
        console.log('archivo creado con éxito');
    })
}

//Esta función lee de manera FOREACH y muestra a TODOS los estudiantes. 
const mostrar = () =>{
    listar();
    console.log ('Notas de los estudiantes');
    listaEstudiantes.forEach(element => {
        console.log(element.nombre);
        console.log(' notas ');
        console.log('  matemáticas '+ element.matematicas);
        console.log('  inglés '+ element.ingles);
        console.log('  programación '+ element.programacion + '\n');
    });
}

//Esta función busca y muestra a un solo estudiante.
const muestraest = (nom) => {
    listar()
    let est = listaEstudiantes.find(buscar => buscar.nombre === nom);
    if (!est){
        console.log('No existe ningún estudiante con ese nombre!');
    } else{
        console.log(est.nombre);
        console.log(' notas ');
        console.log('  matemáticas '+ est.matematicas);
        console.log('  inglés '+ est.ingles);
        console.log('  programación '+ est.programacion + '\n');
    } 
}

//Esta función busca y muestra a los estudiantes que ganan matemáticas.
const muestramat = () => {
    listar();
    // listaEstudiantes.forEach(element => {   FORMA CON FOREACH!!! propia
    //     if (element.matematicas > 3){
    //         console.log(element.nombre);
    //         console.log('  matemáticas '+ element.matematicas);
    //     }
    // });

    //Forma con filter... 
    let ganan = listaEstudiantes.filter(mat => mat.matematicas >= 3)
    if (ganan.length == 0){
        console.log ('Ningún estudiante ganó matemáticas. ');
    } else {
        console.log ('Estudiantes que ganan matemáticas');
        ganan.forEach(element => {   
            console.log(element.nombre);
            console.log(' matemáticas '+ element.matematicas);
        });
    }
}

//Esta función busca y muestra el promedio de un solo estudiante.
const promedioest = (nom) => {
    listar()
    let est = listaEstudiantes.find(buscar => buscar.nombre === nom);
    if (!est){
        console.log('No existe ningún estudiante con ese nombre!');
    } else{
        console.log(est.nombre);
        console.log(' promedio de notas:  ' + 
            (est.matematicas+est.ingles+est.programacion)/3);
    } 
}

//Esta función busca y muestra los estudiantes con promedio mayor a 3.
const muestraprom = () => {
    listar();
    let ganan = listaEstudiantes.filter(mat => 
        ((mat.matematicas+mat.ingles+mat.programacion)/3) >= 3)
    if (ganan.length == 0){
        console.log ('Ningún estudiante va ganando en promedio ');
    } else {
        console.log ('Estudiantes que van ganando en promedio');
        ganan.forEach(element => {   
            console.log(element.nombre);
            console.log(' promedio de notas:  ' + 
            (element.matematicas+element.ingles+element.programacion)/3);
        });
    }
}

//funcion que actualiza la calificacion de un curso de un estudiante. 
const actualizar = (nom, asignatura, calificacion) => {
    listar();
    let est = listaEstudiantes.find(buscar => buscar.nombre === nom);
    if (!est){
        console.log('No existe ningún estudiante con ese nombre!');
    } else {
        est[asignatura] = calificacion;
        guardar();
    } 
}

//funcion que elimina a un solo estudiante
const eliminar = (nom) => {
    listar();
    let nuevo = listaEstudiantes.filter(element => element.nombre != nom)
    if (nuevo.length == listaEstudiantes.length){
        console.log ('Ningún estudiante tiene el nombre: ' + nom);
    } else {
        listaEstudiantes = nuevo;
        guardar();
    }
}

module.exports = {
    crear, 
    mostrar, 
    muestraest, 
    muestramat, 
    promedioest, 
    muestraprom, 
    actualizar, 
    eliminar
}