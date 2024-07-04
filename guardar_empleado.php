<?php
include('database.php');

// Habilitar el informe de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json'); // Asegurar que la respuesta sea JSON

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['idempleado'])) {
            $idempleado = $_POST['idempleado'];

            // Obtener los datos actualizados del formulario
            $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
            $apellido = mysqli_real_escape_string($conn, $_POST['apellido']);
            $dni = mysqli_real_escape_string($conn, $_POST['dni']);
            $cuil = mysqli_real_escape_string($conn, $_POST['cuil']);
            $mail = mysqli_real_escape_string($conn, $_POST['mail']);
            $tipo_empleado_input = $_POST['tipo_empleado']; // Tipo de empleado enviado desde el formulario

            // Verificar que el tipo_empleado existe en la base de datos
            $sql_verify_tipo_empleado = "SELECT idtipo_empleado FROM tipo_empleado WHERE descripcion = ?";
            $stmt_verify_tipo_empleado = mysqli_prepare($conn, $sql_verify_tipo_empleado);
            mysqli_stmt_bind_param($stmt_verify_tipo_empleado, "s", $tipo_empleado_input);
            mysqli_stmt_execute($stmt_verify_tipo_empleado);
            mysqli_stmt_store_result($stmt_verify_tipo_empleado);

            // Obtener el ID del tipo_empleado
            if (mysqli_stmt_num_rows($stmt_verify_tipo_empleado) > 0) {
                mysqli_stmt_bind_result($stmt_verify_tipo_empleado, $tipo_empleado_id);
                mysqli_stmt_fetch($stmt_verify_tipo_empleado);
            } else {
                throw new Exception("Tipo de empleado no válido: " . $tipo_empleado_input);
            }
            mysqli_stmt_close($stmt_verify_tipo_empleado);

            // Preparar la consulta SQL para actualizar el empleado
            $sql_update = "UPDATE empleado SET 
                            nombre = ?,
                            apellido = ?,
                            dni = ?,
                            cuil = ?,
                            mail = ?,
                            tipo_empleado_idtipo_empleado = ?
                        WHERE 
                            idempleado = ?";

            $stmt_update = mysqli_prepare($conn, $sql_update);
            mysqli_stmt_bind_param($stmt_update, "ssssssi", $nombre, $apellido, $dni, $cuil, $mail, $tipo_empleado_id, $idempleado);
            $success = mysqli_stmt_execute($stmt_update);

            if ($success) {
                echo json_encode(array("status" => "success", "message" => "Empleado actualizado correctamente"));
            } else {
                throw new Exception("Error al actualizar empleado: " . mysqli_error($conn));
            }

            mysqli_stmt_close($stmt_update);
        } else {
            throw new Exception("ID de empleado no recibido");
        }
    } else {
        throw new Exception("Método de solicitud inválido");
    }
} catch (Exception $e) {
    echo json_encode(array("status" => "error", "message" => $e->getMessage()));
}
?>
