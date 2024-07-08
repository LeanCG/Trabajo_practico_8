<?php
include('database.php'); // Incluir archivo de conexión a la base de datos

// Verificar si se está recibiendo una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el ID del empleado a eliminar desde los datos recibidos
    $idempleado = $_POST['idempleado'];

    // Preparar la consulta SQL para eliminar el empleado
    $sql = "DELETE FROM empleado WHERE idempleado = ?";
    $stmt = mysqli_prepare($conn, $sql);

    // Vincular el parámetro ID del empleado a la consulta
    mysqli_stmt_bind_param($stmt, "i", $idempleado);

    // Ejecutar la consulta preparada
    if (mysqli_stmt_execute($stmt)) {
        // Si la eliminación fue exitosa, enviar una respuesta al cliente
        echo json_encode(array("status" => "success", "message" => "Empleado eliminado correctamente"));
    } else {
        // Si hubo un error al ejecutar la consulta, enviar un mensaje de error
        echo json_encode(array("status" => "error", "message" => "Error al eliminar empleado"));
    }

    // Cerrar la declaración preparada
    mysqli_stmt_close($stmt);
} else {
    // Si no se recibió una solicitud POST, enviar un mensaje de método de solicitud inválido
    echo json_encode(array("status" => "error", "message" => "Método de solicitud inválido"));
}
?>
