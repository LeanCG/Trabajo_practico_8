<?php

include('database.php');

echo "Conexión exitosa";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";

    $nombre = $_POST['nombreInput'];
    $apellido = $_POST['apellidoInput'];
    $dni = $_POST['dniInput'];
    $cuil = $_POST['cuilInput'];
    $mail = $_POST['emailInput'];
    $tipo_empleado = $_POST['tipoEmpleadoSelect'];
    $historial_academico = $_POST['historialAcademicoSelect'];
    $dato_rubro = $_POST['datoLaboralSelect'];
    $descripcion_laboral = $_POST['descripcionDatoLaboral'];
    $fecha_ingreso = $_POST['fecha_ingreso'];

    $sql_dato_laboral = "INSERT INTO dato_laboral (rubro_idrubro, descripcion, fecha_ingreso) VALUES ('$dato_rubro', '$descripcion_laboral', '$fecha_ingreso')";

    $result_dato_laboral = mysqli_query($conn, $sql_dato_laboral);

    if (!$result_dato_laboral) {
        die('Query failed: ' . mysqli_error($conn));
    }

    $id_dato_laboral = mysqli_insert_id($conn);

    $sql_empleado = "INSERT INTO empleado (nombre, apellido, dni, cuil, mail, tipo_empleado_idtipo_empleado, historial_academico_idhistorial_academico, dato_laboral_iddato_laboral) VALUES ('$nombre', '$apellido', '$dni', '$cuil', '$mail', '$tipo_empleado', '$historial_academico', '$id_dato_laboral')";

    $result_empleado = mysqli_query($conn, $sql_empleado);

    if (!$result_empleado) {
        die('Query failed: ' . mysqli_error($conn));
    }

    echo 'Empleado Cargado';
}
?>
