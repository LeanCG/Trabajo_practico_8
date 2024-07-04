<?php
include("database.php");

// Verificar si se recibió el ID del empleado por POST
if (isset($_POST['idempleado'])) {
    // Obtener los datos del empleado desde los datos recibidos
    $idempleado = $_POST['idempleado'];
    $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
    $apellido = mysqli_real_escape_string($conn, $_POST['apellido']);
    $dni = mysqli_real_escape_string($conn, $_POST['dni']);
    $cuil = mysqli_real_escape_string($conn, $_POST['cuil']);
    $mail = mysqli_real_escape_string($conn, $_POST['mail']);
    $tipo_empleado = $_POST['tipo_empleado'];
    $historial_academico = $_POST['historial_academico'];
    $dato_laboral = $_POST['dato_laboral'];

    // Preparar la consulta SQL para actualizar el empleado
    $sql = "UPDATE empleado SET 
                nombre = '$nombre',
                apellido = '$apellido',
                dni = '$dni',
                cuil = '$cuil',
                mail = '$mail',
                tipo_empleado_idtipo_empleado = $tipo_empleado,
                historial_academico_idhistorial_academico = $historial_academico,
                dato_laboral_iddato_laboral = $dato_laboral
            WHERE 
                idempleado = $idempleado";

    // Ejecutar la consulta
    if (mysqli_query($conn, $sql)) {
        // Si la actualización fue exitosa, enviar una respuesta al cliente
        echo json_encode(array("status" => "success", "message" => "Empleado actualizado correctamente"));
    } else {
        // Si hubo un error al ejecutar la consulta, enviar un mensaje de error
        echo json_encode(array("status" => "error", "message" => "Error al actualizar empleado: " . mysqli_error($conn)));
    }
} else {
    // Si no se recibió el ID del empleado por POST, enviar un mensaje de error
    echo json_encode(array("status" => "error", "message" => "ID de empleado no recibido"));
}
?>
