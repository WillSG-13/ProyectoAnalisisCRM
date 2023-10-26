function obtenerUsuario() {
    var id = parseInt(sessionStorage.getItem("id"));
    fetch('https://localhost:7088/Usuario/BuscarUsuario/' + id)
        .then(response => {
            if (response.ok) {
                return response.json(); // Convertir la respuesta a JSON
            } else {
                throw new Error("Error al obtener el usuario");
            }
        })
        .then(usuario => {
            // Asignar los valores a los elementos del formulario
            document.getElementById('cedula').value = usuario.cedula;
            document.getElementById('nombre').value = usuario.nombre;
            document.getElementById('email').value = usuario.email;
            document.getElementById('password').value = usuario.password;
            document.getElementById('telefono').value = usuario.telefono;
            document.getElementById('rol').value = usuario.Rol;
            document.getElementById('id').value = id;
            console.log(usuario)
            
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

obtenerUsuario()

function actualizarUsuario() {

    var Cedula = document.getElementById('cedula').value;
    var Nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var Password = document.getElementById('password').value;
    var telefono = document.getElementById('telefono').value;
    var Rol = document.getElementById('rol').value;
    var id = document.getElementById('id').value;
    // Ejemplo de uso
    var usuario = {
        UsuarioId: id,
        cedula: Cedula,
        nombre: Nombre,
        email: email,
        password: Password,
        telefono: telefono,
        Rol: Rol
    };
    console.log(usuario)
    fetch('https://localhost:7088/Usuario/EditarUsuario', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
        .then(response => {
            if (response.ok) {
                swal("Actualizado correctamente", {
                    icon: "success",
                  });
            } else {
                throw swal("Error al actualizar el usuario", {
                    icon: "success",
                  });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


