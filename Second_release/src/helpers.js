const hbs = require('hbs');
const fs = require('fs');
listaCursos= []
// const {funcionCursos} = require('./funciones_cursos');

hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3) =>{
    return (nota1+nota2+nota3)/3
})

hbs.registerHelper('crearCurso', 
        (id_p, nombre_p, modalidad_p, valor_p, descripcion_p, intensidad_p) =>{
    let curso = {
        id: id_p, 
        nombre: nombre_p, 
        modalidad: modalidad_p, 
        valor: valor_p, 
        descripcion: descripcion_p, 
        intensidad: intensidad_p, 
        estado: 'Disponible'
    } 

    let texto = crearCurso(curso);
    // let texto = funcionCursos.crearCurso(curso);
    return (texto)
});

hbs.registerHelper('listarCursos', () =>{
    listarCursos();
    let texto = "<table class='table table-striped'>\
    <thead class='thead-dark'>\
        <th>id</th>\
        <th>Nombre</th>\
        <th>Descripción</th>\
        <th>Valor</th>\
        <th>Modalidad</th>\
        <th>Intensidad</th>\
        <th>Estado</th>\
    </thead>\
    <tbody>";

    listaCursos.forEach(ech_curso => {
        texto = texto +
            '<tr>' +
            '<td>' + ech_curso.id + '</td>' +
            '<td>' + ech_curso.nombre + '</td>' +
            '<td>' + ech_curso.descripcion + '</td>' +
            '<td>' + ech_curso.valor + '</td>' +
            '<td>' + ech_curso.modalidad + '</td>' +
            '<td>' + ech_curso.intensidad + '</td>' +
            '<td>' + ech_curso.estado + '</td>' +
            '<tr>';
    })

    texto = texto + '</tbody> </table>';
    return texto;
});

const crearCurso = (curso) => {
    listarCursos();
    let cur ={
        id: curso.id, 
        nombre: curso.nombre, 
        modalidad: curso.modalidad, 
        valor: curso.valor, 
        descripcion: curso.descripcion, 
        intensidad: curso.intensidad,
        estado: curso.estado
    };
    //control de cursos duplicados
    let cursoDuplicado = listaCursos.find (curs => curs.id == cur.id)
    let mensaje;
    if (!cursoDuplicado){
        listaCursos.push(cur);
        guardarCurso();
        mensaje = 'Se ha creado el curso '+ cur.nombre +' de manera exitosa.';
    } else{
        mensaje = 'Ya existe otro curso con ese ID: ' + cur.id ;
    }
    return mensaje;
}

const listarCursos = () => {
    try{
        listaCursos = require('./../listado_Cursos.json');  // Lista de forma sincrona
    } catch(error){
        listaCursos = [];
    }
}

const guardarCurso = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('listado_Cursos.json', datos, (err)=>{
        if (err) throw (err);
        console.log('archivo creado con éxito');
    })
}
