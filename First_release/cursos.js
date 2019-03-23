let cursos = [
    {
        id : '1', 
        nombre: 'Estadística', 
        duracion: '16 semanas', 
        valor: 'US 150'
    }, 
    {
        id : '2', 
        nombre: 'Probabilidad', 
        duracion: '16 semanas', 
        valor: 'US 145'
    }, 
    {
        id : '3', 
        nombre: 'Algebra Lineal', 
        duracion: '16 semanas', 
        valor: 'US 175'
    }
]

function ofertaCursos(counter){
    let curso;
    if(counter < cursos.length){
      setTimeout(function(){
        curso = " ID: " + cursos[counter].id + "\n NOMBRE: " + cursos[counter].nombre + "\n DURACION: " + 
            cursos[counter].duracion + "\n VALOR: " + cursos[counter].valor +"\n **************** ";
        console.log(curso);
        counter++;
        ofertaCursos(counter);
      }, 2000);
    }
};

function buscaCursoXId(obj) {
    for(var i=0; i<cursos.length; i++) {
        if (cursos[i].id == obj) 
            return cursos[i];
    }
    return 0;
};  

module.exports = {
    cursos, 
    ofertaCursos, 
    buscaCursoXId
};
