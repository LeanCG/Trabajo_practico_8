<?php
header('Content-Type: application/json');

$servername = "localhost";  // Cambia estos valores según tu configuración
$username = "root";
$password = "root";
$dbname = "recursohumano";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT idrubro, descripcion FROM rubro";
$result = $conn->query($sql);

$rubros = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rubros[] = $row;
    }
}

echo json_encode($rubros);

$conn->close();
?>
