let idempleado = null;
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idempleado = urlParams.get('id');
    console.log(idempleado);
    document.getElementById('asistencia').style.display = 'none';
    document.getElementById('info-ausencia').style.display = 'none';
    document.getElementById('h1ausencia').style.display = 'none';


    if (idempleado) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'info_empleado.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let empleado = JSON.parse(xhr.responseText)[0]; // Asumimos que obtenemos un solo empleado
                let template = `
                    <form id="empleadoForm">
                        <div class="form-group">
                            <label for="idempleado">ID:</label>
                            <input type="text" id="idempleado" class="form-control" value="${empleado.idempleado}" disabled>
                        </div>
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input type="text" id="nombre" class="form-control" value="${empleado.nombre}" disabled>
                        </div>
                        <div class="form-group">
                            <label for="apellido">Apellido:</label>
                            <input type="text" id="apellido" class="form-control" value="${empleado.apellido}" disabled>
                        </div>
                        <div class="form-group">
                            <label for="dni">DNI:</label>
                            <input type="text" id="dni" class="form-control" value="${empleado.dni}" disabled>
                        </div>
                        <div class="form-group">
                            <label for="cuil">CUIL:</label>
                            <input type="text" id="cuil" class="form-control" value="${empleado.cuil}" disabled>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" class="form-control" value="${empleado.mail}" disabled>
                        </div>
                        <div class="form-group">
                            <label for="tipo_empleado">Tipo de Empleado:</label>
                            <input type="text" id="tipo_empleado" class="form-control" value="${empleado.tipo_empleado}" disabled>
                        </div>
                        <div class="form-group">
                            <label for="historial_academico">Historial Académico:</label>
                            <input type="text" id="historial_academico" class="form-control" value="${empleado.historial_academico}" disabled>
                        </div>
                        <div class="form-group">
                            <label for="dato_laboral">Dato Laboral:</label>
                            <input type="text" id="dato_laboral" class="form-control" value="${empleado.dato_laboral}" disabled>
                        </div>
                        <button type="button" id="guardarBtn" class="btn btn-success" disabled>Guardar</button>
                        <button type="button" id="editarBtn" class="btn btn-primary">Editar</button>
                    </form>
                `;
                document.getElementById('info-container').innerHTML = template;

                document.getElementById('editarBtn').addEventListener('click', function() {
                    const inputs = document.querySelectorAll('#empleadoForm input');
                    inputs.forEach(input => input.disabled = false);
                    document.getElementById('guardarBtn').disabled = false;
                });

                document.getElementById('guardarBtn').addEventListener('click', function() {
                    // Obtener datos del formulario
                    const idempleado = document.getElementById('idempleado').value;
                    const nombre = document.getElementById('nombre').value;
                    const apellido = document.getElementById('apellido').value;
                    const dni = document.getElementById('dni').value;
                    const cuil = document.getElementById('cuil').value;
                    const mail = document.getElementById('email').value;
                    const tipo_empleado = document.getElementById('tipo_empleado').value;
                    const historial_academico = document.getElementById('historial_academico').value;
                    const dato_laboral = document.getElementById('dato_laboral').value;
                
                    // Crear cadena con los datos
                    const params = `idempleado=${idempleado}&nombre=${nombre}&apellido=${apellido}&dni=${dni}&cuil=${cuil}&mail=${mail}&tipo_empleado=${tipo_empleado}&historial_academico=${historial_academico}&dato_laboral=${dato_laboral}`;
                
                    // Enviar datos actualizados al servidor
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'guardar_empleado.php', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                try {
                                    let response = JSON.parse(xhr.responseText);
                                    alert(response.message); // Mostrar mensaje de éxito o error
                                    if (response.status === 'success') {
                                        window.location.reload(); // Recargar la página para ver los cambios
                                    }
                                } catch (e) {
                                    console.error('Error parsing JSON:', e);
                                    console.error('Response was:', xhr.responseText);
                                }
                            } else {
                                console.error('HTTP error:', xhr.status, xhr.statusText);
                            }
                        }
                    };
                    xhr.send(params);
                });
                
                    };
                };
                ;
        xhr.send(`idempleado=${encodeURIComponent(idempleado)}`);

        let xhr2 = new XMLHttpRequest();
        xhr2.open('POST', 'crud_desempenio/view.php', true);
        xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr2.onreadystatechange = function() {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                let desempenios = JSON.parse(xhr2.responseText);
                let template = '';
                desempenios.forEach(desempenio => {
                    template += `
                        <p><strong>descripcion:</strong> ${desempenio.descripcion}</p>
                        <p><strong>puntualidad:</strong> ${desempenio.puntualidad}</p>
                        <p><strong>compañerismo:</strong> ${desempenio.compañerismo}</p>
                        <p><strong>autoconciencia:</strong> ${desempenio.autoconciencia}</p>
                        <p><strong>liderazgo:</strong> ${desempenio.liderazgo}</p>  
                    `;
                    
                });

                document.getElementById('desempeño-container').innerHTML = template;
            }
        };
        xhr2.send(`idempleado=${encodeURIComponent(idempleado)}`);
    }

    document.getElementById('volverBtn').addEventListener('click', function() {
        window.history.back();
    });
   
    document.getElementById('AgregardesempenioBtn').addEventListener('click', function(){
        if (idempleado) {
            // Si idempleado tiene un valor válido, redirige a desempenio.html con el idempleado en la URL
            window.location.href = `crud_desempenio/desempenio.html?id=${encodeURIComponent(idempleado)}`;
        } else {
            console.error("No se encontró idempleado válido.");
        }
    });
    // document.getElementById('AgregardesempenioBtn').addEventListener('click',   function(){
    //     window.location.href =`crud_desempenio/desempenio.html?id=${encodeURIComponent(idempleado)}`;
    // });

    document.getElementById('eliminarBtn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'delete_empleado.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    alert('Empleado eliminado correctamente');
                    window.history.back(); // Volver a la página anterior
                }
            };
            xhr.send(`idempleado=${encodeURIComponent(idempleado)}`);
        }
    });
  
    document.getElementById('ausenciaBtn').addEventListener('click', function(e){
        document.getElementById('asistencia').style.display = 'block';
        tipoAusencia();
    });

    document.getElementById('verausenciaBtn').addEventListener('click', function(e){
        document.getElementById('h1ausencia').style.display = 'block';
        document.getElementById('info-ausencia').style.display = 'block';
        
    
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'info-ausencia.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let ausencias = JSON.parse(xhr.responseText);
                let template = '';
                ausencias.forEach(ausencia => {
                    template += `
                        <p><strong>Fecha de Salida:</strong> ${ausencia.fecha_salida}</p>
                        <p><strong>Fecha de Entrada:</strong> ${ausencia.fecha_entrada}</p>
                        <p><strong>Motivo:</strong> ${ausencia.motivo}</p>                       
                    `;
                    
                });
                document.getElementById('info-ausencia').innerHTML = template;
            }
        };
        xhr.send(`idempleado=${encodeURIComponent(idempleado)}`);
    });


    document.getElementById('guardarAsistencia').addEventListener('submit', function(e){
        e.preventDefault();

        const datosRecolectados = {
            fechaSalida : document.getElementById('fecha_salida').value,
            fechaEntrada : document.getElementById('fecha_entrada').value,
            motivoAusencia : document.getElementById('tipo_ausencia').value
        }

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'create_inasistencia.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                document.getElementById('guardarAsistencia').reset();
            }
        };
        
        let params = `idempleado=${encodeURIComponent(idempleado)}&fecha_salida=${encodeURIComponent(datosRecolectados.fechaSalida)}&fecha_entrada=${encodeURIComponent(datosRecolectados.fechaEntrada)}&tipo_ausencia=${encodeURIComponent(datosRecolectados.motivoAusencia)}`;

        xhr.send(params);
    });

    function tipoAusencia() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'lista_motivo_ausencia.php', true);
        xhr.onload = function() {
            if (this.status === 200) {
                const motivos = JSON.parse(this.responseText);
                const ausencia = document.getElementById('tipo_ausencia');
                ausencia.innerHTML = '<option value="">Motivo ausencia</option>';  // Limpiar opciones anteriores
                motivos.forEach(function(motivo) {
                    const option = document.createElement('option');
                    option.value = motivo.idtipo_ausencia;
                    option.textContent = motivo.motivo;
                    ausencia.appendChild(option);
                });
            } else {
                console.error('Error en la solicitud AJAX');
            }
        }
        xhr.send();
    }
});
