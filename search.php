<?php
include("database.php");

$sql = "SELECT 
            e.idempleado,
            e.nombre,
            e.apellido 
            FROM 
            empleado e";

$result = mysqli_query($conn, $sql);

if (!$result) {
    die('Error de consulta: ' . mysqli_error($conn));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'idempleado' => $row['idempleado'],
        'nombre' => $row['nombre'],
        'apellido' => $row['apellido']
    );
}

$jsonstring = json_encode($json);
echo $jsonstring;
?>
