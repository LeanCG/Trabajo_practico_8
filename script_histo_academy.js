document.addEventListener('DOMContentLoaded', function() {
    function fetchOptions(table, idField, descField, selectId) {
        fetch(`getOptions.php?table=${table}&idField=${idField}&descField=${descField}`)
            .then(response => response.json())
            .then(data => {
                const select = document.getElementById(selectId);
                select.innerHTML = '<option value="">Selecciona una opción</option>';
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.text = item.description;
                    select.add(option);
                });
            });
    }

    fetchOptions('tipo_empleado', 'idtipo_empleado', 'descripcion', 'tipoEmpleadoSelect');
    fetchOptions('dato_academico', 'idhistorial_academico', 'descripcion', 'historialAcademicoSelect');
    fetchOptions('dato_laboral', 'iddato_laboral', 'descripcion', 'datoLaboralSelect');
});
