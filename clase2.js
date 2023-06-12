/*
const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]



function productKey (arr) {
let newArr = arr.map(el => Object.keys(el)) // mapea Objetos y de ahi toma las keys de cada uno
let newSum = arr.map(el => Object.values(el)) // mapea Objetos y de ahi toma las keys de cada uno
return (newArr);
}

function productSum (arr) {
    let newSum = arr.map(el => Object.values(el).reduce((acc,curr)=> acc + curr, 0)) // mapea Objetos y de ahi toma las keys de cada uno
    return (newSum);
    }

console.log(productKey(objetos))
console.log(productSum(objetos))

*/


class TiketManager {
	
	#precioBaseDeGanancia = 0.15

	constructor(){
		this.eventos = []
	}

	getEventos () {
		return this.eventos
	}

	agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
		const evento = {
		  id: this.eventos.length + 1,
		  nombre,
		  lugar,
		  precio: precio + (precio * 0.15),
		  capacidad,
		  fecha,
		  participantes: []
		};

		this.eventos.push(evento);

	}

	agregarUsuario(idEvento, idUsuario) {
		const evento = this.eventos.find(function(evento) {
		  return evento.id === idEvento;
		});
	  
		if (!evento) {
		  console.log(`No existe un evento con el ID ${idEvento}.`);
		  return;
		} else {
		  if (evento.participantes.includes(idUsuario)) {
			console.log(`El usuario con el ID ${idUsuario} ya está registrado en este evento.`);
			return;
		  } else {
			evento.participantes.push(idUsuario);
			console.log(`El usuario con el ID ${idUsuario} ha sido registrado en el evento con el ID ${idEvento}.`);
		  }
		}
	  }

		ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
			const eventoExistente = this.eventos.find(evento => evento.id === idEvento);
		  
			if (!eventoExistente) {
			  console.log(`No existe un evento con el ID ${idEvento}.`);
			  return;
			}
		  
			const eventoEnGira = {
			  ...eventoExistente, // Copia todas las propiedades del evento existente
			  id: this.eventos.length + 1, // Nuevo ID para el evento en gira
			  localidad: nuevaLocalidad, // Nueva localidad
			  fecha: nuevaFecha, // Nueva fecha
			  participantes: [] // Participantes vacíos para el evento en gira
			};
		  
			this.eventos.push(eventoEnGira);
		  
			console.log(`El evento con el ID ${idEvento} ha sido puesto en gira con el nuevo ID ${eventoEnGira.id}.`);
		  }


}

const manager = new TiketManager();
manager.agregarEvento("prueba", "lugarPrueba", 10, 20);
console.log(manager.getEventos());
