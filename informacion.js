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
                let empleados = JSON.parse(xhr.responseText);
                let template = '';
                empleados.forEach(empleado => {
                    template += `
                        <p><strong>ID:</strong> ${empleado.idempleado}</p>
                        <p><strong>Nombre:</strong> ${empleado.nombre}</p>
                        <p><strong>Apellido:</strong> ${empleado.apellido}</p>
                        <p><strong>DNI:</strong> ${empleado.dni}</p>
                        <p><strong>CUIL:</strong> ${empleado.cuil}</p>
                        <p><strong>Email:</strong> ${empleado.mail}</p>
                        <p><strong>Tipo de Empleado:</strong> ${empleado.tipo_empleado}</p>
                        <p><strong>Historial Académico:</strong> ${empleado.historial_academico}</p>
                        <p><strong>Dato Laboral:</strong> ${empleado.dato_laboral}</p>  
                    `;
                    
                });

                document.getElementById('info-container').innerHTML = template;
            }
        };
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
                let tableBody = document.getElementById('tabla-ausencias-contenido');
                tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
                data.forEach(function(ausencia) {
                    let row = tableBody.insertRow();
                    let cellFechaSalida = row.insertCell(0);
                    let cellFechaEntrada = row.insertCell(1);
                    let cellMotivo = row.insertCell(2);
    
                    cellFechaSalida.textContent = ausencia.fecha_salida;
                    cellFechaEntrada.textContent = ausencia.fecha_entrada;
                    cellMotivo.textContent = ausencia.motivo;
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
