/*

const http = require ('http');

const server = http.createServer ((request, response)=> {
    
    console.log("Solicitud recibida", request.url)
    

    if (request.url === '/contacto') {
        response.end("Contacto")

    } else if (request.url === '/sucursal') {
        response.end("Sucursal")
    } else {
        response.end("Prueba")
    }
})

server.listen(8080, () => {console.log("Listening on port 8080")})

*/

//// Server express

/*
const express = require('express')

const app = express()

app.get ('/', (req, res) => {
    return res.send('Bienvenido a la pagina de home')
})

app.get ('/contacto', (req, res) => {
    return res.send('Bienvenido a la pagina de contacto')
})

app.get ('/sucursales', (req, res) => {
    return res.send('Bienvenido a la pagina de sucursales')
})

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080')
})

*/

//// Actividad en clase

const express = require('express')

const app = express()

app.get ('/bienvenida', (req, res) => {
    const htmlResponse = '<h1 style="color: blue;">¡Bienvenido!</h1>';
    res.send(htmlResponse);
})

app.get ('/usuario', (req, res) => {
    const usuario = {
        nombre: 'John',
        apellido: 'Doe',
        edad: 30,
        correo: 'johndoe@example.com'
      };
      res.json(usuario);
})



app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080')
})
