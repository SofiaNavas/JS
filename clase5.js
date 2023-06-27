// Práctica de módulos nativos fs + crypto

const fs = require('fs');
const crypto = require('crypto');

class UserManager {

    constructor() {
        this.usuarios = []
        this.path = 'Usuarios.json';
        this.checkpath()
    }


    checkpath() {
        try {this.usuarios = JSON.parse(fs.readFileSync(this.path, 'utf-8'));}
        catch(error) {
            console.error('Error reading JSON file:', error);
        }
        
    }
   

    crearUsuario(usuario){

        const nuevoUsuario = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            username: usuario.username,
            password: this.hashPassword(usuario.password),
        };

        try {
            //this.usuarios = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            this.usuarios.push(nuevoUsuario);
            fs.writeFileSync(
                this.path,
                JSON.stringify(this.usuarios, null, 2),
                'utf-8'
              );
            
        } catch (error) {
            console.error("el error: ", error)
        }

    }

    hashPassword(password) {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
      }

    getUsuarios () {
        return this.usuarios
    }

    validarUsuarios (usuario) {
        const valUsuario = {
            username: usuario.username,
            password: usuario.password,
        }

        

            const findUsername = this.usuarios.find(function(element) {
                return element.username === valUsuario.username;
                 });

            if (findUsername) {

                try {
                    const hashedPassword = this.hashPassword(valUsuario.password);
                    if (findUsername.password === hashedPassword) {
                    return "Logueado"
                    } else {
                        return "La contraseña no coincide"
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            } else {
                return "El usuario no existe";
                
            }     

    }

}

const manager = new UserManager()
console.log(manager.getUsuarios()); 

manager.crearUsuario( {nombre: 'Chomey',
apellido: 'Doe',
username: 'ChomeyDoe',
password: 'secretpassword',})     
console.log(manager.validarUsuarios({username:'TommyDoe', password: 'secretpassword', }))
console.log(manager.validarUsuarios({username:'TommyDoe', password: 'secretpas', }))