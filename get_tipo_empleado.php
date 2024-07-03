<?php
// Conexión a la base de datos
include("database.php");

// Consulta para obtener los tipos de empleado
$sql = "SELECT idtipo_empleado, descripcion FROM tipo_empleado";
$result = mysqli_query($conn, $sql);

// Verifica si hubo un error en la consulta
if (!$result) {
    die('Error de consulta: ' . mysqli_error($conn));
}

// Crea un array para almacenar los resultados
$tipo_empleado = array();
while ($row = mysqli_fetch_array($result)) {
    $tipo_empleado[] = array(
        'id' => $row['idtipo_empleado'],
        'descripcion' => $row['descripcion']
    );
}

// Convierte el array en una cadena JSON
echo json_encode($tipo_empleado);
?>
