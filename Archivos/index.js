const { argv } = require('./yargs');
const funciones = require('./funciones')

// esto es para saber como trabajar con argv
// console.log(argv);
// console.log(' posicion 0 ' + argv._[0])

let comando = argv._[0];

switch(comando){
    case 'crear':
        funciones.crear(argv);
    break

    case 'mostrar':
        funciones.mostrar();
    break

    case 'muestraest':
        funciones.muestraest(argv.nombre);
    break

    case 'muestramat':
        funciones.muestramat();
    break

    case 'promedioest':
        funciones.promedioest(argv.nombre);
    break

    case 'muestraprom':
        funciones.muestraprom();
    break

    case 'actualizar':
        funciones.actualizar(argv.nombre, argv.asignatura, argv.calificacion);
    break

    case 'eliminar':
        funciones.eliminar(argv.nombre);
    break

    default:
        console.log('No ingresó una función existente');
}
