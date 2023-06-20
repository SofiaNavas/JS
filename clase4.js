/*
// Actividad 1 en clase: Almacenar fecha y hora:

const fs = require('fs'); // se importa el módulo fs

// Obtener la fecha y hora actual
const obtenerFechaHoraActual = () => {
  const fechaHoraActual = new Date();
  return fechaHoraActual.toISOString(); // Convertir a formato ISO para facilitar la lectura
};

// Crear el archivo y escribir la fecha y hora actual utilizando async/await
const crearArchivo = async () => {
  try {
    const fechaHoraActual = obtenerFechaHoraActual();
    await fs.promises.writeFile('fecha_hora.txt', fechaHoraActual);
    console.log('Archivo creado correctamente.');
  } catch (error) {
    console.error('Error al crear el archivo:', error);
  }
};

// Leer el archivo y mostrar su contenido por consola utilizando async/await
const leerArchivo = async () => {
  try {
    const contenido = await fs.promises.readFile('fecha_hora.txt', 'utf8');
    console.log('Contenido del archivo:', contenido);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
  }
};

// Función principal asincrónica que ejecuta las operaciones en orden
const ejecutarPrograma = async () => {
  await crearArchivo();
  await leerArchivo();
};

// Llamar a la función principal asincrónica
ejecutarPrograma();

*/

//Actividad 2 en clase: Lectura y escritura de archivos:

/*
const fs = require('fs').promises;
const { exec } = require('child_process');

async function readPackageJson() {
  try {
    // Ejecutar npm init -y en la terminal
    await new Promise((resolve, reject) => {
      exec('npm init -y', { shell: true }, (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    });

    // Leer el archivo package.json
    const packageJson = await fs.readFile('package.json', 'utf-8');

    // Crear el objeto info
    const info = {
      contenidoStr: packageJson,
      contenidoObj: JSON.parse(packageJson),
      size: Buffer.byteLength(packageJson, 'utf-8'),
    };

    // Mostrar el objeto info por consola
    console.log(info);

    // Guardar el objeto info en un archivo info.json
    await fs.writeFile('info.json', JSON.stringify(info, null, 2), 'utf-8');
    console.log('El archivo info.json ha sido guardado correctamente.');

  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${error.message}`);
  }
}

readPackageJson();

*/


const fs = require('fs')

const productos = [
  {
    "id": 1,
    "title": "Producto 1",
    "description": "Desc prod1",
    "price": 10.2,
    "thumbnail": "www.image.com",
    "code": "qwerty",
    "stock": 100
  },
  {
    "id": 1,
    "title": "Producto 1",
    "description": "Desc prod1",
    "price": 10.2,
    "thumbnail": "www.image.com",
    "code": "qwerty",
    "stock": 100
  }
]

const productosString = JSON.stringify(productos, null, 2)

fs.promises.writeFile('./productos.json', productosString)
  .then(() => {
    return fs.promises.readFile('./productos.json', 'utf-8')
  })
  .then((productosArchivo) => {
    console.log(typeof productosArchivo)
    const productosObjeto = JSON.parse(productosArchivo)
    console.log(productosObjeto)
  })
  .catch((e) => {
    console.log({ e })
  })


