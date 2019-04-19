const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'asignaturas';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function (err) {
    if (err) {
        console.log("No se ha podido conectar")
    }
    console.log("Conectado de manera satisfactoria");

    const db = client.db(dbName);
    const collection = db.collection('estudiantes');

    // INSERCION
    // collection.insertOne({
    //     nombre: "Maria", 
    //     matematicas: 3, 
    //     ingles: 4, 
    //     programacion: 4, 
    //     lengua: 5
    // }, (err, result)=>{
    //     if(err){
    //         return console.log("Error ingresando usuario");
    //     }
    //     return console.log(result.ops)
    // })

    // collection.insertMany([
    //     {
    //         nombre: "Jorge", 
    //         matematicas : 2,          
    //         ingles : 5, 
    //         programacion : 3
    //     }, 
    //     {
    //         nombre: "Hugo", 
    //         matematicas : 4,          
    //         ingles : 3, 
    //         programacion : 2
    //     },
    //     {
    //         nombre: "Teresa", 
    //         matematicas : 3,          
    //         ingles : 2, 
    //         programacion : 5
    //     }
    // ], (err, resultados) => {
    //     if (err) {
    //         return console.log("Error ingresando usuarios");
    //     }
    //     return console.log(resultados.ops)
    // })

    // BUSCANDO DE A UNO Y MUCHOS!
    collection.findOne({ nombre: "Maria" }, (err, resultado) => {
        if (err) {
            return console.log("error")
        }
        console.log(resultado)
    })
    collection.findOne({ nombre: "Jorge" }, (err, resultado) => {
        if (err) {
            return console.log("error")
        }
        if (!resultado) {
            return console.log("No se encontró a nadie")
        }
        console.log(resultado)
    })
    //para encontrar muchos el FIND no tiene callback y retorna un ARRAY.
    collection.find({ matematicas: 7 }).toArray((err, resultados) => {
        if (err) {
            return console.log("no pudo buscar")
        }
        console.log(resultados)
    })

    // UPDATE - LEER UPDATE OPERATORS!!
    collection.updateOne({ nombre: "Maria" },
        {
            $set:
            {
                ingles: 4,
                programacion: 2
            }
        },
        (err, resultado) => {
            if (err) {
                return console.log("Error en acutualizar")
            }
            console.log("se actualizo correctamente " + resultado)
        })

    collection.updateMany({ matematicas: 4 },
        {
            $set:
            {
                matematicas: 3
            }
        },
        (err, resultados) => {
            if (err) {
                return console.log("Error en acutualizar")
            }
            console.log("se actualizo correctamente " + resultados)
        })

    // ELIMINACION
    collection.deleteOne({ nombre: "Hugo"}, (err, resultado) =>{
        if (err) {
            return console.log("no se pudo eliminar")
        }
        console.log("Se ha eliminado el elemento: "+resultado)
    })

    //Uso de LESS THAN!! 
    collection.deleteMany({ matematicas:{$lt:4}}, (err, resultado) =>{
        if (err) {
            return console.log("no se pudo eliminar")
        }
        console.log("Se ha eliminado el elemento: "+resultado)
    })

    //Con este sin restricciones muestra TODO lo que hay en BD
    collection.find({}).toArray((err, resultados) => {
        if (err) {
            return console.log("no pudo buscar")
        }
        console.log(resultados)
    })


    client.close();
});