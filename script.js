document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('contenido').style.display = 'none';

    document.getElementById('cargarEmpleadoBtn').addEventListener('click', function () {
        document.getElementById('contenido').style.display = 'block';
    });

    document.getElementById('guardarEmpleado').addEventListener('submit', function (e) {
        e.preventDefault();

        console.log('submited');

        const datosRecolectados = {
            nombre: document.getElementById('nombreInput').value,
            apellido: document.getElementById('apellidoInput').value,
            dni: document.getElementById('dniInput').value,
            cuil: document.getElementById('cuilInput').value,
            email: document.getElementById('emailInput').value,
            tipoEmp: document.getElementById('tipoEmpleadoSelect').value,
            histAc: document.getElementById('historialAcademicoSelect').value,
            datoLaboral: document.getElementById('datoLaboralSelect').value
        };

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'create.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                document.getElementById('guardarEmpleado').reset();
            }
        };

        let params = `nombreInput=${encodeURIComponent(datosRecolectados.nombre)}&apellidoInput=${encodeURIComponent(datosRecolectados.apellido)}&dniInput=${encodeURIComponent(datosRecolectados.dni)}&cuilInput=${encodeURIComponent(datosRecolectados.cuil)}&emailInput=${encodeURIComponent(datosRecolectados.email)}&tipoEmpleadoSelect=${encodeURIComponent(datosRecolectados.tipoEmp)}&historialAcademicoSelect=${encodeURIComponent(datosRecolectados.histAc)}&datoLaboralSelect=${encodeURIComponent(datosRecolectados.datoLaboral)}`;

        xhr.send(params);
    });

});
