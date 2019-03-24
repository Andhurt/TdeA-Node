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

function ofertaCursos(){
    let lista_cursos = "<h1>OFERTA DE CURSOS </h1> <BR> ";
    for(var counter=0; counter<cursos.length; counter++) {
        lista_cursos = lista_cursos + "ID: " + 
         cursos[counter].id + "<BR> NOMBRE: " +
         cursos[counter].nombre + "<BR> DURACION: " + 
         cursos[counter].duracion + "<BR> VALOR: " + 
         cursos[counter].valor +"<BR> **************** <BR>";
    }
    return lista_cursos;
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

