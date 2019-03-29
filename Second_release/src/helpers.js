const hbs = require('hbs');
const fs = require('fs');
listaCursos = [];

// const {funcionCursos} = require('./funciones_cursos');

hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3) => {
    return (nota1 + nota2 + nota3) / 3
})

hbs.registerHelper('crearCurso',
    (id_p, nombre_p, modalidad_p, valor_p, descripcion_p, intensidad_p) => {
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

hbs.registerHelper('listarCursos', () => {
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
    let cur = {
        id: curso.id,
        nombre: curso.nombre,
        modalidad: curso.modalidad,
        valor: curso.valor,
        descripcion: curso.descripcion,
        intensidad: curso.intensidad,
        estado: curso.estado
    };
    //control de cursos duplicados
    let cursoDuplicado = listaCursos.find(curs => curs.id == cur.id)
    let mensaje;
    if (!cursoDuplicado) {
        listaCursos.push(cur);
        guardarCurso();
        mensaje = 'Se ha creado el curso '+ cur.nombre +' de manera exitosa.';
    } else {
        mensaje = 'Ya existe otro curso con ese ID: ' + cur.id;
    }
    return mensaje;
}

const listarCursos = () => {
    try {
        listaCursos = require('./../listado_Cursos.json');  // Lista de forma sincrona
    } catch (error) {
        console.log('Por alguna razón no encuentro el listado de cursos, pero debería. ');
        listaCursos = [];
    }
}

const guardarCurso = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('listado_Cursos.json', datos, (err) => {
        if (err) throw (err);
        console.log('archivo creado con éxito');
    })
}

hbs.registerHelper('listarCursosDetalle', () => {
    listarCursos();
    let texto = '<div class="accordion" id="accordionexample">';
    i=1;
    listaCursos.forEach(cursoDet => {
        texto = texto +
            `<div class="card">
                <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" 
                            data-target="#collapse${i}" aria-expanded="true" 
                            aria-controls="collapse${i}">
                            ${cursoDet.nombre}
                        </button>
                    </h2>
                </div>
                <div id="collapse${i}" class="collapse show" 
                    aria-labelledby="heading${i}" data-parent="#accordionexample">
                    <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                </div>
            </div>`;
        i=i+1;
    })

    texto = texto + '</div>';
    return texto;
})
