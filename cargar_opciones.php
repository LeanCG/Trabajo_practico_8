<?php
$conn = new mysqli('localhost', 'usuario', 'contraseña', 'base_de_datos');

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verifica qué tipo de datos se están solicitando
if (isset($_GET['tipo'])) {
    $tipo = $_GET['tipo'];

    if ($tipo === 'tipo_ausencia') {
        $sql = "SELECT idtipo_ausencia, descripcion FROM tipo_ausencia";
    } elseif ($tipo === 'dato_laboral') {
        $sql = "SELECT iddato_laboral, descripcion FROM dato_laboral";
    } else {
        die("Tipo de solicitud no válido");
    }

    $result = $conn->query($sql);

    $opciones = array();
    while ($row = $result->fetch_assoc()) {
        $opciones[] = $row;
    }

    echo json_encode($opciones);
} else {
    die("No se especificó el tipo de solicitud");
}

$conn->close();
?>