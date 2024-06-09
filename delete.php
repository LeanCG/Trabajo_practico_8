<?php
include('db.php'); // Incluye el archivo de conexión a la base de datos.

// Verifica si se ha recibido un ID de empleado mediante GET para eliminar.
if (isset($_GET['id'])) {
    $id = $_GET['id']; // Almacena el ID del empleado.
    // Consulta SQL para eliminar el empleado específico.
    $sql = "DELETE FROM empleado WHERE idempleado = $id";
    
    // Ejecuta la consulta y verifica si se realizó con éxito.
    if ($conn->query($sql) === TRUE) {
        echo "Empleado eliminado exitosamente."; // Mensaje de éxito.
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error; // Mensaje de error.
    }
}

// Redirige al usuario a la página principal.
header('Location: index.php');
?>