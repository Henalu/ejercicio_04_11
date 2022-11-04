#DROP DATABASE EJERCICIO_04_11;

CREATE DATABASE EJERCICIO_04_11;

USE EJERCICIO_04_11;

CREATE TABLE Usuarios(
	id_usuario INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    email VARCHAR(100), 
    pass VARCHAR(100),
    PRIMARY KEY (id_usuario)
);

DELIMITER //
CREATE PROCEDURE insertarUsuario (IN nombre VARCHAR(100), IN apellidos VARCHAR(100), IN email VARCHAR(100), IN pass VARCHAR(100))
	BEGIN
		INSERT INTO usuarios(nombre, apellidos, email, pass) VALUES(nombre, apellidos, email, pass);
	END //
DELIMITER ;

#CALL insertarUsuario ('Henalu', 'Paes de Barros', 'henalu@gmail.com', '1234');
#SELECT * FROM usuarios;