<?php

include("database.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fecha_salida = $_POST['fecha_salida'];
    $fecha_entrada = $_POST['fecha_entrada'];
    $tipo_ausencia = $_POST['tipo_ausencia_idtipo_ausencia'];
    $dato_laboral = $_POST['dato_laboral_iddato_laboral'];

    $sql = "INSERT INTO ausencia (fecha_salida, fecha_entrada, tipo_ausencia_idtipo_ausencia, dato_laboral_iddato_laboral) 
            VALUES ('$fecha_salida', '$fecha_entrada', '$tipo_ausencia', '$dato_laboral')";

    if ($conn->query($sql) === TRUE) {
        echo "Registro agregado correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>