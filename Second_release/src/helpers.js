const hbs = require('hbs');
const fs = require('fs');
listaCursos = [];
listaUsuarios = [];

// const {funcionCursos} = require('./funciones_cursos');

hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3) => {
    return (nota1 + nota2 + nota3) / 3
})

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
                     ID: ${cursoDet.id}<br>
                     Descripción: ${cursoDet.descripcion}<br>
                     Valor del curso: ${cursoDet.valor}<br>
                     Modalidad: ${cursoDet.modalidad}<br>
                     Intensidad: ${cursoDet.intensidad}<br>
                     Estado: ${cursoDet.estado}
                    </div>
                </div>
            </div><br>`;
        i=i+1;
    })

    texto = texto + '</div>';
    return texto;
})


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
        mensaje = 'Se ha registrado el usuario '+ nuser.nombre +' de manera exitosa.';
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
