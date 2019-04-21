const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    nombre : {
        type : String, 
        required : true, 
        trim: true, 
        enum: {values:['Andres', 'Felipe', 'Laura', 'Lina', 'Pedro'], message: 'El nombre no es válido' }
    }, 
    matematicas : {
        type : Number, 
        default: 0, 
        min : 0, 
        max: [5, 'Notas entre 0 y 5']
         
    },
    ingles : {
        type : Number, 
        default: 0, 
        min : 0, 
        max: [5, 'Notas entre 0 y 5']
    },
    programacion : {
        type : Number, 
        default: 0, 
        min : 0, 
        max: [5, 'Notas entre 0 y 5'] 
    }
});

estudianteSchema.plugin(uniqueValidator);
const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports =  Estudiante;