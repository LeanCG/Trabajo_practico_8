<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../database.php';


// Obtener y sanitizar los datos del formulario
$idempleado=isset($_POST['id']) ? (int)$conn->real_escape_string($_POST['id']) : 0;
$puntualidad = isset($_POST['puntualidad']) ? (int)$conn->real_escape_string($_POST['puntualidad']) : 0;
$companierismo = isset($_POST['companierismo']) ? (int)$conn->real_escape_string($_POST['companierismo']) : 0;
$autoconciencia = isset($_POST['autoconciencia']) ? (int)$conn->real_escape_string($_POST['autoconciencia']) : 0;
$liderazgo = isset($_POST['liderazgo']) ? (int)$conn->real_escape_string($_POST['liderazgo']) : 0;

$promedio =( $puntualidad + $companierismo + $autoconciencia + $liderazgo )/4;

$result =  ($promedio > 8)? "excelente" : (($promedio >= 5 && $promedio <= 8)? "bueno" : "malo");
echo "descripcion promedio".$result;

$sql = "SELECT dato_laboral_iddato_laboral FROM empleado WHERE idempleado = $idempleado";

// Ejecutar la consulta
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    // Obtener el resultado
    $row = $resultado->fetch_assoc();
    $dato_laboral = $row['dato_laboral_iddato_laboral'];
    echo "El ID seleccionado es: " . $dato_laboral."<br>";
} else {
    echo "No se encontraron resultados";
}

// Verificar que los datos no estén vacíos
if ($puntualidad && $companierismo && $autoconciencia && $liderazgo) {
    // Preparar la consulta SQL
    $sql = "INSERT INTO desempenio (descripcion,puntualidad, compañerismo, autoconciencia, liderazgo) 
            VALUES ('$result','$puntualidad', '$companierismo', '$autoconciencia', '$liderazgo')";

    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        $sql = "UPDATE dato_laboral SET iddesempenio = $last_id WHERE iddato_laboral = $dato_laboral";
        if ($conn->query($sql) === TRUE){echo "Nueva evaluación creada con éxito";}
        
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Todos los campos son obligatorios.";
}

// Cerrar conexión
$conn->close();
?>
