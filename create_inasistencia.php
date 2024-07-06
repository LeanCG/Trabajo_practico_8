<?php

include("database.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $idempleado = $_POST['idempleado'];
    $fecha_salida = $_POST['fecha_salida'];
    $fecha_entrada = $_POST['fecha_entrada'];
    $tipo_ausencia = $_POST['tipo_ausencia'];

    $id_datoLaboral = "SELECT dato_laboral_iddato_laboral FROM empleado WHERE idempleado = '$idempleado'";

    $result = $conn->query($id_datoLaboral);

    if ($result->num_rows > 0) {
        // Obtener el ID como entero
        $row = $result->fetch_assoc();
        $dato_laboral_id = (int)$row['dato_laboral_iddato_laboral'];
        
        echo "El dato_laboral_iddato_laboral es: " . $dato_laboral_id;
    }

    $sql = "INSERT INTO ausencia (fecha_salida, fecha_entrada, tipo_ausencia_idtipo_ausencia, dato_laboral_iddato_laboral) 
            VALUES ('$fecha_salida', '$fecha_entrada', '$tipo_ausencia', '$dato_laboral_id')";

    if ($conn->query($sql) === TRUE) {
        echo "Registro agregado correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

}

$conn->close();
?>