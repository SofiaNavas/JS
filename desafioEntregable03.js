const express = require('express')
const ProductManager = require('./desafioEntregable02');


const app = express()
const productManager = new ProductManager('./prueba.json');

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
  
  // Iniciar el servidor en el puerto 8080
  app.listen(8080, () => {
    console.log('Servidor iniciado en http://localhost:8080');
  });