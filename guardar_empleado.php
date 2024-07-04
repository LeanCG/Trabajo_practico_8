<?php

include("database.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";
    $idempleado = $_POST['idempleado'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $dni = $_POST['dni'];
    $cuil = $_POST['cuil'];
    $mail = $_POST['email'];
    $tipo_empleado = $_POST['tipo_empleado'];
    $historial_academico = $_POST['historial_academico'];
    $dato_rubro = $_POST['dato_laboral'];

    // Obtener dato laboral actual del empleado
    $sql_get_dato_laboral = "SELECT dato_laboral_iddato_laboral FROM empleado WHERE idempleado = '$idempleado'";
    $result_get_dato_laboral = mysqli_query($conn, $sql_get_dato_laboral);
    $dato_laboral_id = mysqli_fetch_assoc($result_get_dato_laboral)['dato_laboral_iddato_laboral'];

    if ($dato_laboral_id) {
        // Actualizar dato laboral
        $sql_update_dato_laboral = "UPDATE dato_laboral SET rubro_idrubro = '$dato_rubro', descripcion = '$descripcion_laboral', fecha_ingreso = '$fecha_ingreso' WHERE iddato_laboral = '$dato_laboral_id'";
        $result_update_dato_laboral = mysqli_query($conn, $sql_update_dato_laboral);

        if (!$result_update_dato_laboral) {
            die('Query failed: ' . mysqli_error($conn));
        }
    } else {
        // Insertar nuevo dato laboral si no existe
        $sql_dato_laboral = "INSERT INTO dato_laboral (rubro_idrubro, descripcion, fecha_ingreso) VALUES ('$dato_rubro', '$descripcion_laboral', '$fecha_ingreso')";
        $result_dato_laboral = mysqli_query($conn, $sql_dato_laboral);

        if (!$result_dato_laboral) {
            die('Query failed: ' . mysqli_error($conn));
        }

        $dato_laboral_id = mysqli_insert_id($conn);
    }

    // Actualizar empleado
    $sql_update_empleado = "UPDATE empleado SET nombre = '$nombre', apellido = '$apellido', dni = '$dni', cuil = '$cuil', mail = '$mail', tipo_empleado_idtipo_empleado = '$tipo_empleado', historial_academico_idhistorial_academico = '$historial_academico', dato_laboral_iddato_laboral = '$dato_laboral_id' WHERE idempleado = '$idempleado'";
    $result_update_empleado = mysqli_query($conn, $sql_update_empleado);

    if (!$result_update_empleado) {
        die('Query failed: ' . mysqli_error($conn));
    }

    echo 'success';
} else {
    echo 'Invalid request method';
}
?>
