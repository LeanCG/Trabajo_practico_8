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

    // Aquí puedes agregar eventos adicionales para los botones editar y eliminar
});
