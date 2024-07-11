<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conexión a la base de datos
include("database.php");

// Verificar si se recibieron los parámetros necesarios
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    // Sanitizar los parámetros
    $idausencia = mysqli_real_escape_string($conn, $_POST['idausencia']);
    $fecha_salida = mysqli_real_escape_string($conn, $_POST['fecha_salida']);
    $fecha_entrada = mysqli_real_escape_string($conn, $_POST['fecha_entrada']);
    //$motivo = mysqli_real_escape_string($conn, $_POST['motivo']);

    // Actualizar la ausencia
    $sql = "UPDATE ausencia 
            SET fecha_salida='$fecha_salida', fecha_entrada='$fecha_entrada'
            WHERE idausencia='$idausencia'";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode(array('success' => 'Ausencia modificada correctamente.'));
    } else {
        echo json_encode(array('error' => 'Error al modificar la ausencia: ' . mysqli_error($conn)));
    }
} else {
    echo json_encode(array('error' => 'No se recibieron los parámetros necesarios.'));
}

// Verificar que la conexión a la base de datos esté cerrada al final
mysqli_close($conn);
?>
