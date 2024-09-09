//modulos
const express = require('express');
const fs = require('fs') //Permite trabajar con archivos (file system) incluida con node, no se instala
const app = express();
const port = 2006;

//Middleware
app.use(express.json())

//Función para leer los datos del archivo .json

const leerDatos = () => {
    try {   //intenta convertir cadena, si no funciona nos muestra por consol el error (catch)
        const datos = fs.readFileSync('./data/datos.json')

        return JSON.parse(datos); // Convierte una cadena JSON en un objeto JavaScript
        // console.log(JSON.parse(datos)) probar si funciona y despues llamar funcion
    } catch (error) {
        console.log(error)
    }
}
//leerDatos()
const escribirDatos = (datos) => {
    try {
        fs.writeFileSync('./data/datos.json', JSON.stringify(datos)) //writeFile permite escribir datos || JSON.stringify convierte un objeto JS en JSON

    } catch (error) {
        console.log(error)

    }
}

app.get('/Productos', (req, res) => {
    const datos = leerDatos()
    res.json(datos.Productos)
    // res.send('Listado de productos')
})

app.post('/Productos', (req, res) => {
    const datos = leerDatos();
    const nuevosDatos = req.body
    const nuevoProducto ={ id: datos.Productos.length +1, ...req.body}
    datos.Productos.push(nuevoProducto)
    escribirDatos(datos)
    res.json({mensaje:'Nuevo producto agregado', Productos: nuevoProducto})
    // res.send('Guardando nuevo producto')
})

app.put('/productos/:id', (req, res) => {
    res.send('Actualizar producto por id')
})

app.delete('/productos/:id', (req, res) => {
    res.send('Eliminando Producto')
})

app.get('/Productos/:id', (req, res) => {
    const datos = leerDatos()
    const prodEncontrado = datos.Productos.find(Productos => Productos.id == req.params.id)
    if(!prodEncontrado){
        return res.status(404).json({mensaje:'Producto no encontrado'})
    }
    res.json({mensaje:'Producto encontrado', Productos: prodEncontrado})
    // res.send('Buscar producto por ID')
})

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});
