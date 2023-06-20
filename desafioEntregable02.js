const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.checkPath();
  }

  checkPath() {
    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      console.log("The file exists. The path is " + this.path);
      this.products = JSON.parse(fileContent) || [];
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('The file does not exist. Creating an empty file.');
        fs.writeFileSync(this.path, '[]', 'utf-8');
        console.log("The file was created in the path " + this.path);
      } else {
        console.error('Error reading products file:', error);
      }
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error(
        "Title, description, price, thumbnail, code, and stock are mandatory properties."
      );
    }

    const findCode = this.products.find(function(element) {
        return element.code === code;
         });


        if (findCode) {
            throw new Error("El campo code no se puede repetir");
       }


    const product = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    try {
      this.products.push(product);
      fs.writeFileSync(
        this.path,
        JSON.stringify(this.products, null, 2),
        'utf-8'
      );
      console.log("Product added successfully.");
    } catch (error) {
      console.error('Error in addProduct:', error);
    }
  }
}

const manager = new ProductManager('./prueba.json');

manager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc124",
  25
);