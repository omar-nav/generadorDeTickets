# generador de tickets
Para reproducir la base de datos localmente después de clonar el proyecto:

1) Instala [nodeJS](https://nodejs.org/es/)
2) Descarga [MongoDB](https://www.mongodb.com/download-center?jmp=hero#compass) para visualizar la base de datos.
3) Ejecuta el comando `npm i` en la terminal desde la carpeta del proyecto para instalar los módulos requeridos.
4) Crea un archivo llamado `.env` en el proyecto.
- En este archivo agrega las variables preferidas parecida a lo siguiente:
`PORT = 3000`
`ENV = development`
5)  Ejecuta el comando `npm run dev` en la terminal
6) En el navegador entra *http://localhost:3000/addUser*


**Notas**

Sólo empleados y gerentes pueden ver el listado interno.

El listado público es para clientes pero todos los usuarios tienen acceso. 

Passport.js es el *middleware* para la autenticación.

El paquete *zxcvbn* ayuda validar que el *password* sea seguro.

La función para generar el *password* del sistema está en el archivo models/User.js
