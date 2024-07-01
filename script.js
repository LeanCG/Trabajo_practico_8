document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('contenido').style.display = 'none';
    document.getElementById('empleados-container').style.display = 'none';
    document.getElementById('empleados-single-container').style.display = 'none';

    document.getElementById('cargarEmpleadoBtn').addEventListener('click', function () {
        document.getElementById('contenido').style.display = 'block';
        document.getElementById('empleados-container').style.display = 'none';
        document.getElementById('empleados-single-container').style.display = 'none';
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

    document.getElementById('mostrarEmpleadosBtn').addEventListener('click', function(e) {
        e.preventDefault();
    
        document.getElementById('contenido').style.display = 'none';
        document.getElementById('empleados-single-container').style.display = 'none';
        document.getElementById('empleados-container').style.display = 'block';
    
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'search.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let empleados = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                let template = '';
                empleados.forEach(empleado => {
                    template += `
                        <tr class="usuario-data">
                            <td>${empleado.idempleado}</td>
                            <td>${empleado.nombre}</td>
                            <td>${empleado.apellido}</td>
                            <td><button type="button" class="borrar btn btn-outline-danger btn-sm" data-id="${empleado.idempleado}">Borrar</button></td>
                            <td><button type="button" class="modificar btn btn-outline-primary btn-sm" data-id="${empleado.idempleado}">Modificar</button></td>
                            <td><button type="button" class="informacion btn btn-outline-secondary btn-sm" data-id="${empleado.idempleado}">Informacion</button></td>
                        </tr>
                    `;
                });
    
                document.getElementById('lista-empleados').innerHTML = template;
    
                document.querySelectorAll('.borrar').forEach(boton => {
                    boton.addEventListener('click', function(e) {
                        console.log("click");
                        if (confirm('Desea eliminar los datos del empleado?')) {
                            let idempleado = this.getAttribute('data-id');
                            let deleteXhr = new XMLHttpRequest();
                            deleteXhr.open('POST', 'delete.php', true);
                            deleteXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                            deleteXhr.onreadystatechange = function() {
                                if (deleteXhr.readyState === 4 && deleteXhr.status === 200) {
                                    boton.closest('tr').remove();
                                }
                            };
    
                            deleteXhr.send(`idempleado=${encodeURIComponent(idempleado)}`);
                        }
                    });
                });

                document.querySelectorAll('.informacion').forEach(boton => {
                    boton.addEventListener('click', function(e) {
                        let idempleado = this.getAttribute('data-id');
                        console.log(idempleado);
                        window.location.href = `informacion.html?id=${idempleado}`;
                    });
                });
                
            }
        };
        xhr.send();
    });
    
    document.getElementById('search-form').addEventListener('submit', function(e){

        e.preventDefault();

        document.getElementById('contenido').style.display = 'none';
        document.getElementById('empleados-container').style.display = 'none';
        document.getElementById('empleados-single-container').style.display = 'block';


        let search = document.getElementById('search').value;

        if(search){

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'search_single.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function (){
                if(xhr.readyState === 4 && xhr.status === 200){
                    let empleados = JSON.parse(xhr.responseText);
                    console.log(xhr.responseText);
                    let template = '';
                    empleados.forEach(empleado => {
                        template += `
                            <tr class="usuario-data">
                                <td>${empleado.idempleado}</td>
                                <td>${empleado.nombre}</td>
                                <td>${empleado.apellido}</td>
                                <td><button type="button" class="borrar btn btn-outline-danger btn-sm" data-id="${empleado.idempleado}">Borrar</button></td>
                                <td><button type="button" class="modificar btn btn-outline-primary btn-sm" data-id="${empleado.idempleado}">Modificar</button></td>
                                <td><button type="button" class="informacion btn btn-outline-secondary btn-sm" data-id="${empleado.idempleado}">Informacion</button></td>
                            </tr>  
                    `;
                        
                    });
    
     
    
                    document.getElementById('search-single').innerHTML = template;

                    document.querySelectorAll('.borrar').forEach(boton => {
                        boton.addEventListener('click', function(e) {
                            console.log("click");
                            if (confirm('Desea eliminar los datos del empleado?')) {
                                let idempleado = this.getAttribute('data-id');
                                let deleteXhr = new XMLHttpRequest();
                                deleteXhr.open('POST', 'delete.php', true);
                                deleteXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                deleteXhr.onreadystatechange = function() {
                                    if (deleteXhr.readyState === 4 && deleteXhr.status === 200) {
                                        boton.closest('tr').remove();
                                    }
                                };
        
                                deleteXhr.send(`idempleado=${encodeURIComponent(idempleado)}`);
                            }
                        });
                    });

                    document.querySelectorAll('.informacion').forEach(boton => {
                        boton.addEventListener('click', function(e) {
                            let idempleado = this.getAttribute('data-id');
                            console.log(idempleado);
                            window.location.href = `informacion.html?id=${idempleado}`;
                        });
                    });
                    
                }
            };
            xhr.send(`search=${search}`);
        }

    });


});
