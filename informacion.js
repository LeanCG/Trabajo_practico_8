let idempleado = null;
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

    // Aquí puedes agregar eventos adicionales para los botones editar y eliminar
});
