const fs = require('fs');
listaCursos= []

const crearCurso = (curso) => {
    listarCurso();
    let cur ={ 
        nombre: curso.nombre,
        id: curso.id,
        descripcion: curso.descripcion,        
        valor: curso.valor,  
        modalidad: curso.modalidad, 
        intensidad: curso.intensidad
    };
    //control de cursos duplicados
    let cursoDuplicado = listaCursos.find (curs = curs.id == curso.id)
    let mensaje;
    if (!cursoDuplicado){
        listaCursos.push(cur);
        guardarCurso();
        mensaje = 'Se ha creado el curso '+ cur.nombre +' de manera exitosa.';
    } else{
        mensaje = 'Ya existe otro curso con ese nombre.';
    }
    return mensaje;
}

const listarCurso = () => {
    try{
        listaCursos = require('./listado_Cursos.json');  // Lista de forma sincrona
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

const mostrarCursos = () =>{
    listar();
    return listaCursos;
}

module.exports = {
    crearCurso, 
    guardarCurso, 
    mostrarCursos
}