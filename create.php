<?php

    include("database.php");

    echo "conexion exitosa";

    if (isset($_POST['submit'])) {

        $nombre = $_POST['nombreInput'];
        $apellido = $_POST['apellidoInput'];
        $dni = $_POST['dniInput'];
        $cuil = $_POST['cuilInput'];
        $mail = $_POST['mailInput'];
        $tipo_empleado_idtipo_empleado = $_POST['tipoEmpleadoSelect'];
        $historial_academico_idhistorial_academico = $_POST['historialAcademicoSelect'];
        $dato_laboral_iddato_laboral = $_POST['datoLaboralSelect'];

        $sql = "INSERT INTO empleado (nombre, apellido, dni, cuil, mail, tipo_empleado_idtipo_empleado, historial_academico_idhistorial_academico, dato_laboral_iddato_laboral) VALUES ('$nombre', '$apellido', '$dni', '$cuil', '$mail', '$tipo_empleado_idtipo_empleado', '$historial_academico_idhistorial_academico', '$dato_laboral_iddato_laboral')";

        $result = mysqli_query($conn,$sql);

        if(!$result){
            die('Query failed.');
        }

        echo 'Empleado Cargado';
}

?>