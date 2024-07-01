<?php
include('db.php'); // Incluye el archivo de conexión a la base de datos

$table = $_GET['table'];
$idField = $_GET['idField'];
$descField = $_GET['descField'];

$options = array();

$sql = "SELECT $idField, $descField FROM $table";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    $options[] = array("id" => $row[$idField], "description" => $row[$descField]);
}


echo json_encode($options);
?>
