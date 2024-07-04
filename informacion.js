document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idempleado = urlParams.get('id');
    console.log(idempleado);
    document.getElementById('asistencia').style.display = 'none';


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
    }

    document.getElementById('volverBtn').addEventListener('click', function() {
        window.history.back();
    });

    document.getElementById('ausenciaBtn').addEventListener('click', function(e){
        document.getElementById('asistencia').style.display = 'block';
        tipoAusencia();
    });

    document.getElementById('guardarAsistencia').addEventListener('submit', function(e){
        e.preventDefault();
        
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
