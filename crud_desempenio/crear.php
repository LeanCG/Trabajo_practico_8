<?php
include '..database.php';

// Obtener y sanitizar los datos del formulario
$puntualidad = isset($_POST['puntualidad']) ? $conn->real_escape_string($_POST['puntualidad']) : '';
$companierismo = isset($_POST['companierismo']) ? $conn->real_escape_string($_POST['companierismo']) : '';
$autoconciencia = isset($_POST['autoconciencia']) ? $conn->real_escape_string($_POST['autoconciencia']) : '';
$liderazgo = isset($_POST['liderazgo']) ? $conn->real_escape_string($_POST['liderazgo']) : '';

// Verificar que los datos no estén vacíos
if ($puntualidad && $companierismo && $autoconciencia && $liderazgo) {
    // Preparar la consulta SQL
    $sql = "INSERT INTO desempenio (puntualidad, companierismo, autoconciencia, liderazgo) 
            VALUES ('$puntualidad', '$companierismo', '$autoconciencia', '$liderazgo')";

    if ($conn->query($sql) === TRUE) {
        echo "Nueva evaluación creada con éxito";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Todos los campos son obligatorios.";
}

// Cerrar conexión
$conn->close();
?>
