document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idempleado = urlParams.get('id');
    console.log(idempleado);

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
    }

    document.getElementById('volverBtn').addEventListener('click', function() {
        window.history.back();
    });

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
});
