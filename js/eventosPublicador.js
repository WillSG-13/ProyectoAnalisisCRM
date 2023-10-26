

function cargarEventosSubidos() {
  var contenidoTablaResultado = document.querySelector("#resultados");
  console.log(sessionStorage.getItem("id"));
  fetch(
    "https://localhost:7088/Evento/eventosDeUsuario/" +
      sessionStorage.getItem("id"),
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((datos) => {
      contenidoTablaResultado.innerHTML = ``;
      for (const valor of datos) {
        contenidoTablaResultado.innerHTML += `
            <tr class="table-primary" >
                <td>${valor.idEvento}</td>
                <td>${valor.titulo}</td>
                <td>${valor.fechaPublicacion.split("T")[0]}</td>
                <td>${valor.fechaEvento.split("T")[0]}</td>
                <td>${valor.hora}</td>
                <td>${valor.descripcion}</td>
                <td>${valor.direccion}</td>
               
                <td>
                  <a name="" id="" class="btn btn-danger" onclick="eliminar('${valor.idEvento}')" role="button">Elim</a>
                  <a name="" id="" class="btn btn-info" onclick="detalles('${valor.idEvento}')" role="button">Det</a>
                  <a name="" id="" class="btn btn-primary" onclick="editar(${sessionStorage.getItem("id")},'${valor.idEvento}', '${valor.titulo}', '${valor.fechaPublicacion}', '${valor.fechaEvento}', '${valor.hora}', '${valor.descripcion}', '${valor.direccion}')" role="button">Edit</a>
                </td>
            </tr>`;
      }
    })
    .catch((error) => {
      // Aquí puedes manejar los errores de la solicitud
      console.error(error);
    });
}


function cerrarModalCrearEvento() {
  modalAsistencia.hide();
}



var modalAsistencia = new bootstrap.Modal(document.getElementById('modalAsistencia'))




function detalles( id){

  modalAsistencia.show();
  fetch('https://localhost:7088/Evento/Asistentes/'+id)
  .then(response => response.json())
  .then(data => {
    // Obtener referencia a la tabla
    const cuerpo = document.getElementById('cuerpo');   
    // Limpiar el cuerpo de la tabla
    cuerpo.innerHTML = '';
    // Iterar sobre los datos y agregar filas a la tabla
    data.forEach(evento => {
      cuerpo.innerHTML += `
      <tr class="table-primary" >
          <td>${evento.cedula}</td>
          <td>${evento.nombre}</td>
          <td>${evento.email}</td>
          <td>${evento.telefono}</td>
      </tr>`;
      })
    }).catch(error => {
    console.error('Error en la solicitud:', error);
  });
}

function cargarEventosAsistir() {
  var contenidoTablaAsistir = document.querySelector("#resultados2");
  console.log(sessionStorage.getItem("id"));
  fetch("https://localhost:7088/Evento/ObtenerEventosPorUsuario/"+sessionStorage.getItem("id"),
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((datos) => {
      contenidoTablaAsistir.innerHTML = ``;
      for (const valor of datos) {
        contenidoTablaAsistir.innerHTML += `
            <tr class="table-primary" >
                <td>${valor.idEvento}</td>
                <td>${valor.titulo}</td>
                <td>${valor.fechaPublicacion.split("T")[0]}</td>
                <td>${valor.fechaEvento.split("T")[0]}</td>
                <td>${valor.hora}</td>
                <td>${valor.descripcion}</td>
                <td>${valor.direccion}</td>
               
                <td>
                  <a name="" id="" class="btn btn-danger" onclick="eliminarAsistencia('${ valor.idEvento }')" role="button">Quitar</a>`;
      }
    })
    .catch((error) => {
      // Aquí puedes manejar los errores de la solicitud
      console.error(error);
    });
}

function cargarEventos(){
  cargarEventosSubidos();
  cargarEventosAsistir();
}




function eliminarAsistencia(eventoId) {
  fetch(`https://localhost:7088/EventoUsuario/ElimiarEventoUsuario/${eventoId}/${sessionStorage.getItem("id")}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        swal({
          title: "Asistencia eliminada correctamente",
          icon: "success",
          button:false,
          timer: 1500,
        });
        cargarEventos()
      } else {
        throw new Error('Error al eliminar el evento de usuario');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}





cargarEventos();

const modalEditar = new bootstrap.Modal(
  document.getElementById("modalEditarEvento")
);
var formulario = document.getElementById("frmEventos");

function editar(
  idUsuario,
  idEvento,
  titulo,
  fechaPublicacion,
  fechaEvento,
  hora,
  descripcion,
  direccion
) {
  document.getElementById("idUsuario").value = idUsuario;
  document.getElementById("idEvento").value = idEvento;
  document.getElementById("titulo").value = titulo;
  document.getElementById("fechaPublicacion").value = fechaPublicacion;
  document.getElementById("fechaEvento").value = fechaEvento;
  document.getElementById("hora").value = hora;
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("direccion").value = direccion;
  modalEditar.show();
}

formulario.addEventListener("submit", function (e) { 
  e.preventDefault();

  var idEvento = parseInt(document.getElementById("idEvento").value);
  var titulo = document.getElementById("titulo").value;
  var fechaPublicacion = document.getElementById("fechaPublicacion").value;
  var fechaEvento = document.getElementById("fechaEvento").value;
  var hora = document.getElementById("hora").value;
  var descripcion = document.getElementById("descripcion").value;
  var direccion = document.getElementById("direccion").value;
  var id = parseInt(sessionStorage.getItem("id"));

  var datosenviar = {
    idEvento: idEvento,
    usuarioId: id,
    titulo: titulo,
    fechaPublicacion: fechaPublicacion,
    fechaEvento: fechaEvento,
    hora: hora,
    descripcion: descripcion,
    direccion: direccion,
  };
  console.log(datosenviar);
  fetch("https://localhost:7088/Evento/EditarEvento", {
    method: "PUT",
    headers: { "content-type": "application/json " },
    body: JSON.stringify(datosenviar),
  }) //url de peticion de datos
    .then((respuesta) => {
      console.log(respuesta.status);
      if (respuesta.status == 204) {
        document.getElementById("titulo").value = "";
        document.getElementById("fechaPublicacion").value = "";
        document.getElementById("fechaEvento").value = "";
        document.getElementById("hora").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("direccion").value = "";
        
        swal(
          "Se ha modificado correctamente!",
          "Presiona el boton!",
          "success"
        )
        .then((willDelete) => {
          if (willDelete) {
      
            modalEditar.hide();
            cargarEventos2();
          } 
        });
      }
      else{
        swal("No se ha modificado!", "Presiona el boton!", "error")
      }
    })
    .catch(console.log); //muestra errores
});

function eliminar(idEvento) {
  swal({
    title: "Esta seguro que quiere eliminarlo?",
    text: "Una vez borrado no se podra recuperar los datos",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {

      console.log(idEvento);
      var idUsuario = parseInt(sessionStorage.getItem("id"));
      fetch(
        "https://localhost:7088/Evento/EliminarEvento/" + idEvento+"/"+idUsuario,
        {
          method: "DELETE"
          
        }
      ) //url de peticion de datos
        .then(datosrepuesta => { 
          if(datosrepuesta.status == 204){
            swal("Eliminado correctamente", {
              icon: "success",
            });
            cargarEventos2();
            window.location = "VerEventosPublicador.html";
          }else{
            swal("No se borraron los datos");
          }
        })
        .catch(console.log); //muestra errores
      //Muestra el resultado de la peticion
    } 
  });

  var datosenviar = {
    idEvento: idEvento,
  };

}

function cerrarModalModificarEvento(){
  modalEditar.hide();
}


