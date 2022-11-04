const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const url = "mongodb://127.0.0.1:27017/";

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', urlencodedParser, (req, res) => {
    let mydb = 'Ejercicio-04-11';
    let coleccion = 'Usuarios';

    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let email = req.body.email;
    let pass = req.body.pass;


    let usuarios = `{"Nombre": "${nombre}", "Apellidos": "${apellidos}", "Email": "${email}", "Password": "${pass}"}`;

    let myquery = JSON.parse(`{"Nombre": "${nombre}", "Apellidos": "${apellidos}", "Email": "${email}", "Password": "${pass}"}`);

    usuarios = JSON.parse(usuarios);

    res.send(req.body);

    // crearBD(mydb, coleccion);
    // crearColeccion(mydb, coleccion);
    // buscar(mydb, coleccion, myquery);
    addUser(mydb, coleccion, myquery, usuarios)
    //mostrar(mydb, coleccion);
    //borrar(mydb, coleccion, myquery);

});//Fin POST

app.listen(3000);

function crearBD(mydb, coleccion) {
    // Creamos la base de datos y la coleccion dentro de la base de datos
    //Creacion de una BD 
    MongoClient.connect(url + mydb, function (err, db) {
        if (err) throw err;
        console.log("Base de datos creada");
        db.close();
    });
    // //Creacion de una coleccion dentro de una BD
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.createCollection(coleccion, function (err, res) {
            if (err) throw err;
            console.log("Colección creada");
            db.close();
        });
    });
}

function crearColeccion(mydb, coleccion) {
    //Creacion de una coleccion dentro de una BD
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.createCollection(coleccion, function (err, res) {
            if (err) throw err;
            console.log("Colección creada");
            db.close();
        });
    });
}

function insertar(mydb, coleccion, myobj) {
    // Insertar dentro de una coleccion de una BD: conectamos a la base de datos, conectamos a la coleccion e insertamos
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);

        dbo.collection(coleccion).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("Documento insertado");
            db.close();
        });
    });
}

function mostrar(mydb, coleccion) {
    //Ver todos 
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.collection(coleccion).find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

function borrar(mydb, coleccion, myquery) {
    //Borrar  
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.collection(coleccion).deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("Documento borrado");
            db.close();
        });
    });
}

function buscar(mydb, coleccion, myquery) {
    //Query simple  
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        //  var myquery = { "Titulo": "Dune" };
        dbo.collection(coleccion).find(myquery).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                console.log('Busqueda fallida, autor no encontrado');
            } else {
                console.log('Resultado de la busqueda', result);
                let resultado = result;
                console.log('esta es la variable ', resultado);
                console.log(resultado[0]._id.toString());
            }
            db.close();
        });
    });
}

function addUser(mydb, coleccion, myquery, usuarios) {
    //Query simple  
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        //  var myquery = { "Titulo": "Dune" };
        dbo.collection(coleccion).find(myquery).toArray(function (err, result) {
            if (err) throw err;
            let resultado = result;
            if (resultado.length == 0) {
                console.log('Los datos son validos y no coinciden con los de otro usuario');
                insertar(mydb, coleccion, usuarios);
            } else {
                console.log('Este usuario ya existe');
                console.log('este es el usuario existente: ', resultado);
            }
            db.close();
        })
    });
}