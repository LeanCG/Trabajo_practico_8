<?php
header('Content-Type: application/json');
include('database.php');

$sql = "SELECT idrubro, descripcion FROM rubro";
$result = $conn->query($sql);

$rubros = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rubros[] = $row;
    }
}

echo json_encode($rubros);

$conn->close();
