const express = require('express');
const fs = require('fs');
const ProductManager = require('./desafioEntregable02');

const app = express();
const port = 8080;

// Middleware para procesar JSON en las peticiones
app.use(express.json());

// Rutas de productos
const productRouter = express.Router();
const productManager = new ProductManager('productos.json');

// Obtener todos los productos
productRouter.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Obtener un producto por su ID
productRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Agregar un nuevo producto
productRouter.post('/', (req, res) => {
  const productData = req.body;
  try {
    productManager.addProduct(productData);
    res.status(201).json({ message: 'Product added successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un producto
productRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;
  try {
    productManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Product updated successfully.' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Eliminar un producto
productRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    productManager.deleteProduct(productId);
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Registrar el router de productos en la ruta /api/products
app.use('/api/products', productRouter);

// Rutas de carritos
const cartRouter = express.Router();

// Crear un nuevo carrito
cartRouter.post('/', (req, res) => {
  const cartId = Date.now().toString();
  const cartData = {
    id: cartId,
    products: [],
  };
  // Persistir el carrito en el archivo "carrito.json"
  fs.readFile('carrito.json', 'utf-8', (err, fileContent) => {
    if (err) {
      console.error('Error reading cart file:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const carts = JSON.parse(fileContent) || [];
    carts.push(cartData);
    fs.writeFile('carrito.json', JSON.stringify(carts, null, 2), 'utf-8', (err) => {
      if (err) {
        console.error('Error writing cart file:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(201).json({ message: 'Cart created successfully.', id: cartId });
    });
  });
});

// Obtener los productos de un carrito por su ID
cartRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  fs.readFile('carrito.json', 'utf-8', (err, fileContent) => {
    if (err) {
      console.error('Error reading cart file:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const carts = JSON.parse(fileContent) || [];
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  });
});

// Agregar un producto a un carrito
cartRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;
  fs.readFile('carrito.json', 'utf-8', (err, fileContent) => {
    if (err) {
      console.error('Error reading cart file:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const carts = JSON.parse(fileContent) || [];
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      const existingProduct = cart.products.find((p) => p.product === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      fs.writeFile('carrito.json', JSON.stringify(carts, null, 2), 'utf-8', (err) => {
        if (err) {
          console.error('Error writing cart file:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json({ message: 'Product added to cart successfully.' });
      });
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  });
});

// Registrar el router de carritos en la ruta /api/carts
app.use('/api/carts', cartRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
