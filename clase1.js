/*

function mostrarLista(lista) {
    let cantidad = lista.length;
    let respuesta = "";
    if (lista.length == 0) {
        respuesta = "Lista vacía";
    } else {
        respuesta = `Hay ${cantidad} de elementos en la lista, los elementos son: ${lista.join(", ")}`
    }
    return respuesta;
}

let prueba = (lista) => mostrarLista(lista); // Assigning the function to the prueba variable

console.log(prueba([1, 2, 3, 4])); // Executing the program with the array [1, 2, 3, 4]

*/

class Contador {

    constructor(nombre){
        this.nombre = nombre // la clase se crea con un nombre
        this.contador = 0 // el contador debe iniciarse en cero
    }

    static contadorGlobal = 0 // debe existir una variable estatica que funcione como contador global

    getResponsable () {   // debe devolver el responsable de dicho contador
        return `El responsable es ${this.nombre}`
    }

    contar ( ) {   // definir metodo contar
        this.contador = this.contador + 1  // que aumente la cuenta individual y  la global
        Contador.contadorGlobal = Contador.contadorGlobal + 1
    }

    getCuentaIndividual () {
        return this.contador
    }

    getCuentaGlobal () {
        return Contador.contadorGlobal
    }
}

const santiago = new Contador('Santiago')
const denise = new Contador('Denise')

denise.contar()
santiago.contar()

console.log (denise.getResponsable())
console.log (denise.getCuentaIndividual(), denise.getCuentaGlobal())
console.log (santiago.getCuentaGlobal())
