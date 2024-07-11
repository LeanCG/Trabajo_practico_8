<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conexión a la base de datos
include("database.php");

// Verificar si se recibió el parámetro idausencia
if (isset($_POST['idausencia'])) {
    // Sanitizar el idausencia
    $idausencia = mysqli_real_escape_string($conn, $_POST['idausencia']);

    // Eliminar la ausencia
    $sql = "DELETE FROM ausencia WHERE idausencia='$idausencia'";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(array('success' => 'Ausencia eliminada correctamente.'));
    } else {
        echo json_encode(array('error' => 'Error al eliminar la ausencia: ' . mysqli_error($conn)));
    }
} else {
    echo json_encode(array('error' => 'No se recibió el parámetro idausencia.'));
}
?>