const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ejercicio_04_11'
});


connection.connect((err) => {
    if (!err) {
        let pQuery = 'CALL insertarUsuario("Henalu", "Paes de Barros", "henalu@gmail.com", "1234")';
        let pName = "insertarUsuario"
        let query6 = mysql.format(pQuery, [pName]);
        connection.query(query6, (err, response) => {
            if (err) throw err;
            console.log(response);
            console.log(query6);
            connection.end();
        });

    } else {
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
    }
});

