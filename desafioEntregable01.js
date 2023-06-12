class ProductManager {

    constructor(){
		this.products = []
	}

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Title, description, price, thumbnail, code and stock are mandatory properties.");
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
  
          this.products.push(product);
	}

    getProducts(){
        return this.products
    }

    getProductById (id) {
        const findId = this.products.find(function(element) {
            return element.id === id;
          });

          if (!findId) {
            throw new Error("ID not found");
        } else {
            return findId
        }
    }
 }

const manager = new ProductManager();

//caso de prueba 1: 
/*
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(manager.getProducts()); 
*/

//caso de prueba 2: 
/*
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(manager.getProducts());
*/

//caso de prueba 3: 

/*
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc124", 25);
console.log(manager.getProducts());
*/

//caso de prueba 4: 

/*
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123");
console.log(manager.getProducts());
*/

//caso de prueba 5: 

/*
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(manager.getProductById(1));
*/





