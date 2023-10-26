function registrarUsuario() {
    var cedula = document.getElementById("cedula").value;
    var user = document.getElementById("user").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var telefono = document.getElementById("telefono").value;
    var rol = document.getElementById("rol").value;
  
    // Verificar que todos los campos estén llenos
    if (cedula === "" || user === "" || email === "" || pass === "" || telefono === "" || rol === "") {
      alert("Error: Por favor, completa todos los campos");
      return;
    }
  
    var datosenviar = {
      usuarioId: 0,
      cedula: cedula,
      nombre: user,
      email: email,
      password: pass,
      telefono: telefono,
      rol: rol
    };
  
    fetch("https://localhost:7088/Usuario/CrearUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosenviar)
    })
      .then(response => {
        if (response.ok) {
          document.getElementById("cedula").value = "";
          document.getElementById("user").value = "";
          document.getElementById("email").value = "";
          document.getElementById("pass").value = "";
          document.getElementById("telefono").value = "";
          document.getElementById("rol").value = "";
  
          alert("Éxito: El usuario se agregó correctamente");
          
          // Realizar cualquier acción adicional después de crear el usuario correctamente
        } else {
          alert("Error: No se pudo crear el usuario");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }