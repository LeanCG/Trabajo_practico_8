let idempleado = null;
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idempleado = urlParams.get('id');
    console.log(idempleado);
    document.getElementById('asistencia').style.display = 'none';
    document.getElementById('info-ausencia').style.display = 'none';
    document.getElementById('h1ausencia').style.display = 'none';
    if (localStorage.getItem('recargarDesempenio') === 'true') {
        verDesempenio(idempleado);
        localStorage.removeItem('recargarDesempenio');
    }

    if (idempleado) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'info_empleado.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let empleado = JSON.parse(xhr.responseText)[0]; // Asumimos que obtenemos un solo empleado
                let template = `
                    <div id="empleadoInfo">
                        <p><strong>ID:</strong> <span id="idempleado">${empleado.idempleado}</span></p>
                        <p><strong>Nombre:</strong> <span id="nombre">${empleado.nombre}</span></p>
                        <p><strong>Apellido:</strong> <span id="apellido">${empleado.apellido}</span></p>
                        <p><strong>DNI:</strong> <span id="dni">${empleado.dni}</span></p>
                        <p><strong>CUIL:</strong> <span id="cuil">${empleado.cuil}</span></p>
                        <p><strong>Email:</strong> <span id="email">${empleado.mail}</span></p>
                        <p><strong>Tipo de Empleado:</strong> <span id="tipo_empleado">${empleado.tipo_empleado}</span></p>
                        <p><strong>Historial Académico:</strong> <span id="historial_academico">${empleado.historial_academico}</span></p>
                        <p><strong>Dato Laboral:</strong> <span id="dato_laboral">${empleado.dato_laboral}</span></p>
                        <button type="button" id="guardarBtn" class="btn btn-success" style="display:none;">Guardar</button>
                    </div>
                `;
                document.getElementById('info-container').innerHTML = template;

                document.getElementById('EditarBtn').addEventListener('click', function() {
                    const fields = ['idempleado', 'nombre', 'apellido', 'dni', 'cuil', 'email', 'tipo_empleado', 'historial_academico', 'dato_laboral'];
                    fields.forEach(field => {
                        let span = document.getElementById(field);
                        let value = span.innerText;
                        span.innerHTML = `<input type="text" id="input_${field}" class="form-control" value="${value}">`;
                    });
                    document.getElementById('guardarBtn').style.display = 'inline-block';
                    this.style.display = 'none';
                });

                document.getElementById('guardarBtn').addEventListener('click', function() {
                    // Obtener datos del formulario
                    const idempleado = document.getElementById('input_idempleado').value;
                    const nombre = document.getElementById('input_nombre').value;
                    const apellido = document.getElementById('input_apellido').value;
                    const dni = document.getElementById('input_dni').value;
                    const cuil = document.getElementById('input_cuil').value;
                    const mail = document.getElementById('input_email').value;
                    const tipo_empleado = document.getElementById('input_tipo_empleado').value;
                    const historial_academico = document.getElementById('input_historial_academico').value;
                    const dato_laboral = document.getElementById('input_dato_laboral').value;
                
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
            }
        };
        xhr.send(`idempleado=${encodeURIComponent(idempleado)}`);
        verDesempenio(idempleado);
    }

    function verDesempenio(e){
        let xhr2 = new XMLHttpRequest();
        xhr2.open('POST', 'crud_desempenio/view.php', true);
        xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr2.onreadystatechange = function() {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                let desempenios = JSON.parse(xhr2.responseText);
                let template = '';
                desempenios.forEach(desempenio => {
                    template += `
                        <p><strong>Descripción:</strong> ${desempenio.descripcion}</p>
                        <p><strong>Puntualidad:</strong> ${desempenio.puntualidad}</p>
                        <p><strong>Compañerismo:</strong> ${desempenio.compañerismo}</p>
                        <p><strong>Autoconciencia:</strong> ${desempenio.autoconciencia}</p>
                        <p><strong>Liderazgo:</strong> ${desempenio.liderazgo}</p>  
                    `;
                });

                document.getElementById('desempeño-container').innerHTML = template;
            }
        };
        xhr2.send(`idempleado=${encodeURIComponent(idempleado)}`);
    };
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
        document.getElementById('tabla-ausencias').style.display = 'block';
        document.getElementById('info-ausencia').style.display = 'block';
        
    
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'info-ausencia.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                console.log(data)
                let template = '';
                data.forEach(ausencia => {
                    template += `
                        <tr class="usuario-data">
                            <td>${ausencia.idausencia}</td>
                            <td>${ausencia.fecha_salida}</td>
                            <td>${ausencia.fecha_entrada}</td>
                            <td>${ausencia.motivo}</td>
                            <td><button type="button" class="modificar btn btn-outline-danger btn-sm" data-id="${ausencia.idausencia}">Modificar</button></td>
                            <td><button type="button" class="borrar btn btn-outline-secondary btn-sm" data-id="${ausencia.idausencia}">Eliminar</button></td>
                        </tr>
                    `;
                });
                
                document.getElementById('info-ausencia').innerHTML = template;
    
                document.querySelectorAll('.modificar').forEach(boton => {
                    boton.addEventListener('click', function(e) {
                        let idausencia = this.getAttribute('data-id');
                        console.log("Ausencia id:", idausencia);
                        let fecha_salida = prompt('Ingrese la nueva fecha de salida (YYYY-MM-DD):', '');
                        let fecha_entrada = prompt('Ingrese la nueva fecha de entrada (YYYY-MM-DD):', '');
                        
                        if (fecha_salida && fecha_entrada) {
                            // Crear una solicitud XMLHttpRequest
                            let xhrMotivos = new XMLHttpRequest();
                            xhrMotivos.open('POST', 'modificar_ausencia.php', true);
                            xhrMotivos.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                            
                            // Manejar la respuesta
                            xhrMotivos.onreadystatechange = function() {
                                if (xhrMotivos.readyState === 4 && xhrMotivos.status === 200) {
                                    try {
                                        let response = JSON.parse(xhrMotivos.responseText);
                                        if (response.success) {
                                            alert('Ausencia modificada correctamente.');
                                        } else {
                                            alert('Error: ' + response.error);
                                        }
                                    } catch (e) {
                                        console.error('Error al analizar la respuesta JSON: ', e);
                                        alert('Hubo un problema con la respuesta del servidor.');
                                    }
                                }
                            };
                            
                            // Enviar la solicitud con los datos
                            xhrMotivos.send(`idausencia=${encodeURIComponent(idausencia)}&fecha_salida=${encodeURIComponent(fecha_salida)}&fecha_entrada=${encodeURIComponent(fecha_entrada)}`);
                        } else {
                            alert('Debe ingresar ambas fechas.');
                        }
                    });
                });
                
    
                document.querySelectorAll('.borrar').forEach(boton => {
                    boton.addEventListener('click', function(e) {
                        if (confirm('Desea eliminar esta ausencia?')) {
                            let idausencia = this.getAttribute('data-id'); //No est 
                            console.log('ausencia: ');
                            console.log(idausencia);
                            let deleteXhr = new XMLHttpRequest();
                            deleteXhr.open('POST', 'eliminar_ausencia.php', true);
                            deleteXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                            deleteXhr.onreadystatechange = function() {
                                if (deleteXhr.readyState === 4 && deleteXhr.status === 200) {
                                    boton.closest('tr').remove();
                                    alert ('Inasistencia eliminada correctamente')
                                }
                            };
                            deleteXhr.send(`idausencia=${encodeURIComponent(idausencia)}`);
                        }
                    });
                });
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
