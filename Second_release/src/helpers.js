const hbs = require('hbs');
const fs = require('fs');
listaCursos = [];
listaUsuarios = [];
listaMatriculas = [];
typeAlert = "danger";
htmlResponse = "";

// const {funcionCursos} = require('./funciones_cursos');

hbs.registerHelper('getHtmlResponse', () => {
    return htmlResponse
});

hbs.registerHelper('getAlert', () => {
    return typeAlert
});

/*CURSOS*/
hbs.registerHelper('crearCurso',
    (id_p, nombre_p, modalidad_p, valor_p, descripcion_p, intensidad_p) => {
        let curso = {
            nombre: nombre_p,
            id: id_p,
            descripcion: descripcion_p,
            valor: valor_p,
            modalidad: modalidad_p,
            intensidad: intensidad_p + " horas",
            estado: "Disponible"
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
        nombre: curso.nombre,
        id: curso.id,
        descripcion: curso.descripcion,
        valor: curso.valor,
        modalidad: curso.modalidad,
        intensidad: curso.intensidad,
        estado: curso.estado
    };
    //control de cursos duplicados
    let cursoDuplicado = listaCursos.find(curs => curs.id == cur.id)
    let mensaje;
    if (!cursoDuplicado) {
        listaCursos.push(cur);
        guardarCurso();
        mensaje = 'Se ha creado el curso ' + cur.nombre + ' de manera exitosa.';
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
    i = 1;
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
                <div id="collapse${i}" class="collapse" 
                    aria-labelledby="heading${i}" data-parent="#accordionexample">
                    <div class="card-body">
                     ID: ${cursoDet.id}<br>
                     Descripción: ${cursoDet.descripcion}<br>
                     Valor del curso: US ${cursoDet.valor}<br>
                     Modalidad: ${cursoDet.modalidad}<br>
                     Intensidad: ${cursoDet.intensidad}<br>
                     Estado: ${cursoDet.estado}
                    </div>
                </div>
            </div>`;
        i = i + 1;
    })

    texto = texto + '</div>';
    return texto;
})


/*ESTUDIANTES*/
hbs.registerHelper('registrarUsuario', (id_u, nombre_u, correo_u, telefono_u) => {
    let nUser = {
        id: id_u,
        nombre: nombre_u,
        correo: correo_u,
        telefono: telefono_u,
        tipoUsuario: "Aspirante"
    }

    let texto = registrarUsuario(nUser);
    return texto
});

const registrarUsuario = (nUser) => {
    listarUsuarios();
    let nuser = {
        id: nUser.id,
        nombre: nUser.nombre,
        correo: nUser.correo,
        telefono: nUser.telefono,
        tipoUsuario: nUser.tipoUsuario
    };
    //control de usuarios duplicados
    let existeUsuario = listaUsuarios.find(user => user.id == nuser.id)
    let mensaje;
    if (!existeUsuario) {
        listaUsuarios.push(nuser);
        guardarUsuario();
        mensaje = 'Se ha registrado el usuario ' + nuser.nombre + ' de manera exitosa.';
    } else {
        mensaje = 'Ya existe un usuario con el ID: ' + nuser.id;
    }
    return mensaje;
}

const listarUsuarios = () => {
    try {
        listaUsuarios = require('./../listado_usuarios.json');  // Lista de forma sincrona
    } catch (error) {
        console.log('Por alguna razón no encuentro el listado de usuarios, pero debería. ');
        listaUsuarios = [];
    }
}

const guardarUsuario = () => {
    let datos = JSON.stringify(listaUsuarios);
    fs.writeFile('listado_usuarios.json', datos, (err) => {
        if (err) throw (err);
        console.log('archivo creado con éxito');
    })
}

/*MATRICULAS*/
hbs.registerHelper('listarCursosMatricula', () => {
    return listarCursosMatricula();
})

hbs.registerHelper('matricularCurso', (id_est, nombre_cur) => {
    let nMatricula = {
        id_estudiante: id_est,
        nombre_curso: nombre_cur
    }
    matricularCurso(nMatricula);
});

const listarCursosMatricula = () => {
    listarCursos();
    let texto;
    const listaFiltrada = listaCursos.filter(d => d.estado === "Disponible");
    listaFiltrada.forEach(cursoDet => {
        texto = texto +
            `<option>${cursoDet.nombre}</option>`
    })
    return texto;
}

const matricularCurso = (nMatricula) => {
    //Validación de existencia de estudiante
    listarUsuarios();
    let existeUsuario = listaUsuarios.find(user => user.id == nMatricula.id_estudiante)
    if (!existeUsuario) {
        typeAlert = 'danger';
        htmlResponse = 'Aún no se ha registrado el estudiante con ID ' + nMatricula.id_estudiante + '.';
    } else {
        //control de matriculas duplicadas
        listarMatriculas();
        let existeMatricula = listaMatriculas.find(matri =>
            (matri.id_estudiante == nMatricula.id_estudiante && matri.nombre_curso == nMatricula.nombre_curso));
        if (!existeMatricula) {
            listaMatriculas.push(nMatricula);
            guardarMatricula();
            typeAlert = 'success';
            htmlResponse = 'El estudiante con ID: ' + nMatricula.id_estudiante +
                ' se ha matriculado en el curso: ' + nMatricula.nombre_curso +
                ' de manera exitosa.';
        } else {
            typeAlert = 'danger';
            htmlResponse = 'El estudiante con ID: ' + nMatricula.id_estudiante +
                ' ya se encuentra matriculado en el curso: ' + nMatricula.nombre_curso;
        }
    }
};

const listarMatriculas = () => {
    try {
        listaMatriculas = require('./../listado_matriculas.json');  // Lista de forma sincrona
    } catch (erro
    ) {
        console.log('Por alguna razón no encuentro el listado de matriculas, pero debería. ');
        listaMatriculas = [];
    }
};

const guardarMatricula = () => {
    let datos = JSON.stringify(listaMatriculas);
    fs.writeFile('listado_matriculas.json', datos, (err) => {
        if (err) throw (err);
        console.log('archivo creado con éxito');
    })
};

/**ADMINISTRACION */
hbs.registerHelper('listadoMatriculados', () => {
    listarCursos();
    const listaFiltrada = listaCursos.filter(d => d.estado === "Disponible");
    let texto = '<div class="accordion" id="accordionAdminCurs">';
    i = 1;

    listaFiltrada.forEach(cursoDet => {
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
                <div id="collapse${i}" class="collapse" 
                    aria-labelledby="heading${i}" data-parent="#accordionAdminCurs">
                    <div class="card-body">
                        <form class="form-inline" action="cerrarCurso" method="post">
                            <div class="input-group">
                                <button type="submit" name="button" class="btn btn-danger" 
                                    id="bt">Cerrar Curso<i class="fa fa-angle-right"></i></button>
                                <input class="form-control" name="idCursoCerrado" 
                                    id="idCursoCerrado" value=${cursoDet.id} type="hidden">
                            </div>
                        </form>
                        <table class='table table-striped'>
                            <thead class='thead-dark'>
                                <th>id</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Telefono</th>
                            </thead>
                            <tbody>`
            + estudianteMatriculado(cursoDet.nombre) +
            `</tbody> 
                        </table>
                    </div>
                </div>
            </div>`;
        i = i + 1;
    })

    texto = texto + '</div>';
    return texto;
})

let estudianteMatriculado = (cursoNombre) => {
    let texto = '';
    listarMatriculas();
    listarUsuarios();
    const listaFiltrada = listaMatriculas.filter(d => d.nombre_curso === cursoNombre);
    listaFiltrada.forEach(ech_curso => {

        let estudianteMatriculado = listaUsuarios.find(user => user.id == ech_curso.id_estudiante)
        texto = texto +
            '<tr>' +
            '<td>' + estudianteMatriculado.id + '</td>' +
            '<td>' + estudianteMatriculado.nombre + '</td>' +
            '<td>' + estudianteMatriculado.correo + '</td>' +
            '<td>' + estudianteMatriculado.telefono + '</td>' +
            '<tr>';
    })

    return texto;
}

hbs.registerHelper('cerrarCurso', (idCursoCerrado) => {
    cerrarCurso(idCursoCerrado);
})

let cerrarCurso = (idCursoCerrado) => {
    listarCursos();
    let existeCurso = listaCursos.find(cuers => cuers.id === idCursoCerrado)
    if (!existeCurso) {
        typeAlert = 'danger';
        htmlResponse = 'No existe un curso para cerrar con ID ' + idCursoCerrado + '.';
    } else {
        existeCurso['estado'] = 'Cerrado';
        guardarCurso();
        typeAlert = 'success';
        htmlResponse = 'El curso: ' + existeCurso.nombre +
            ' se ha cerrado de manera exitosa.';

    }
};
