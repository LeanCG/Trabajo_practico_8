<?php
// Conexión a la base de datos
include("database.php");

// Consulta para obtener los tipos de empleado
$sql = "SELECT idhistorial_academico, descripcion FROM dato_academico";
$result = mysqli_query($conn, $sql);

// Verifica si hubo un error en la consulta
if (!$result) {
    die('Error de consulta: ' . mysqli_error($conn));
}

// Crea un array para almacenar los resultados
$dato_academico = array();
while ($row = mysqli_fetch_array($result)) {
    $dato_academico[] = array(
        'id' => $row['idhistorial_academico'],
        'descripcion' => $row['descripcion']
    );
}

// Convierte el array en una cadena JSON
echo json_encode($dato_academico);
?>
