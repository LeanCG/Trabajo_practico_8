document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idempleado = urlParams.get('id');
    console.log(idempleado);

    if (idempleado) {
        fetch('info_empleado.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `idempleado=${encodeURIComponent(idempleado)}`
        })
        .then(response => response.json())
        .then(empleado => {
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

            document.getElementById('empleadoForm').addEventListener('submit', function(event) {
                event.preventDefault();

                let formData = new FormData(document.getElementById('empleadoForm'));
                let datosEmpleado = {};
                console.log(datosEmpleado);
                formData.forEach((value, key) => {
                    datosEmpleado[key] = value;
                });

                fetch('guardar_empleado.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosEmpleado)
                })
                .then(response => {
                    if (response.ok) {
                        console.log(datosEmpleado);
                        alert('Datos guardados correctamente');
                        window.location.reload(); // Recargar la página para ver los cambios
                    } else {
                        throw new Error('Error al guardar los datos');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Manejo de errores aquí
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejo de errores aquí
        });
    }

    document.getElementById('volverBtn').addEventListener('click', function() {
        window.history.back();
    });

    document.getElementById('eliminarBtn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
            fetch('delete_empleado.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `idempleado=${encodeURIComponent(idempleado)}`
            })
            .then(response => {
                if (response.ok) {
                    alert('Empleado eliminado correctamente');
                    window.history.back(); // Volver a la página anterior
                } else {
                    throw new Error('Error al eliminar el empleado');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Manejo de errores aquí
            });
        }
    });
});
