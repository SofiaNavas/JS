

const express = require('express')
const ProductManager = require('./desafioEntregable02');


const app = express()
const productManager = new ProductManager('./prueba.json');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

products = [
    {
      "id": 1,
      "title": "producto prueba",
      "description": "Este es un producto prueba",
      "price": 200,
      "thumbnail": "Sin imagen",
      "code": "abc124",
      "stock": 25
    },
    {
      "id": 2,
      "title": "producto prueba",
      "description": "Este es un producto prueba",
      "price": 200,
      "thumbnail": "Sin imagen",
      "code": "abc123",
      "stock": 25
    },
    {
      "id": 3,
      "title": "producto prueba",
      "description": "Este es un producto prueba",
      "price": 200,
      "thumbnail": "Sin imagen",
      "code": "abc121",
      "stock": 25
    },
    {
      "id": 4,
      "title": "producto prueba",
      "description": "Este es un producto prueba",
      "price": 200,
      "thumbnail": "Sin imagen",
      "code": "abc120",
      "stock": 25
    }
  ]

app.get('/products', async (req, res) => {
    try {
      const limit = req.query.limit; // Obtener el límite de resultados del query param
  
      const products = productManager.getProducts();
  
      // Aplicar el límite si se especificó en el query param
      const limitedProducts = limit ? products.slice(0, limit) : products;
  
      res.json(limitedProducts);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });
  
  // Endpoint dinamico para obtener un producto por su ID 
  app.get('/products/:pid', async (req, res) => {
    try {
      const productId = parseInt(req.params.pid); // Obtener el ID del producto como entero
  
      const product = productManager.getProductById(productId);
  
      res.json(product);
    } catch (error) {
      if (error.message === 'ID not found') {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.status(500).json({ error: 'Error al obtener el producto' });
      }
    }
  });

    app.post('/', (req, res) => {
        const product = req.body
        //product.id = products.length +1
        
        //products.push(product)
        const prueba = productManager.addProduct(product);


        return res.send(prueba)
    })

  
  // Iniciar el servidor en el puerto 8080
  app.listen(8080, () => {
    console.log('Servidor iniciado en http://localhost:8080');
  });

/*

  const express = require('express');
  const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let frase = "Frase inicial";

// GET '/api/frase'
app.get('/api/frase', (req, res) => {
  res.json({ frase: frase });
});

// GET '/api/palabras/:pos'
app.get('/api/palabras/:pos', (req, res) => {
  const pos = parseInt(req.params.pos);
  const palabras = frase.split(' ');

  if (pos > 0 && pos <= palabras.length) {
    const palabra = palabras[pos - 1];
    res.json({ buscada: palabra });
  } else {
    res.status(404).json({ error: 'Palabra no encontrada' });
  }
});

// POST '/api/palabras'
app.post('/api/palabras', (req, res) => {
  const palabra = req.body.palabra;
  frase += " " + palabra;
  const palabras = frase.split(' ');
  const pos = palabras.length;
  res.json({ agregada: palabra, pos: pos });
});

// PUT '/api/palabras/:pos'
app.put('/api/palabras/:pos', (req, res) => {
  const pos = parseInt(req.params.pos);
  const palabra = req.body.palabra;
  const palabras = frase.split(' ');

  if (pos > 0 && pos <= palabras.length) {
    const anterior = palabras[pos - 1];
    palabras[pos - 1] = palabra;
    frase = palabras.join(' ');
    res.json({ actualizada: palabra, anterior: anterior });
  } else {
    res.status(404).json({ error: 'Palabra no encontrada' });
  }
});

// DELETE '/api/palabras/:pos'
app.delete('/api/palabras/:pos', (req, res) => {
  const pos = parseInt(req.params.pos);
  const palabras = frase.split(' ');

  if (pos > 0 && pos <= palabras.length) {
    const eliminada = palabras.splice(pos - 1, 1);
    frase = palabras.join(' ');
    res.json({ eliminada: eliminada[0] });
  } else {
    res.status(404).json({ error: 'Palabra no encontrada' });
  }
});

// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:8080`);
});

*/