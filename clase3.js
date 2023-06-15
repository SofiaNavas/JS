const suma = (a, b) => {
    return new Promise((resolve, reject) => {
      if (a === 0 || b === 0) {
        return reject('Operación innecesaria')
      }
  
      const resultado = a + b
  
      if (resultado < 0) {
        return reject('La calculadora solo debe devolver valores positivos')
      }
  
      return resolve(resultado)
    })
  }

  const resta = (a, b) => {
    return new Promise((resolve, reject) => {
      if (a === 0 || b === 0) {
        return reject('Operación inválida')
      }
  
      const resultado = a - b
  
      if (resultado < 0) {
        return reject('La calculadora solo debe devolver valores positivos')
      }
  
      return resolve(resultado)
    })
  }

  const multiplicacion = (a, b) => {
    return new Promise((resolve, reject) => {
      if (a < 0 || b < 0) {
        return reject('Operación inválida')
      }
  
      const resultado = a * b
  
      if (resultado < 0) {
        return reject('La calculadora solo debe devolver valores positivos')
      }
  
      return resolve(resultado)
    })
  }

  const fn = async() => {
    try {
        let resultado = await suma (1,2)
        console.log(resultado)
    } catch (error) {
        console.log(error)
    }
  }

  fn()