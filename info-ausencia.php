<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conexión a la base de datos
include ("database.php");

// Verificar si se recibió el parámetro idempleado por POST
if (isset($_POST['idempleado'])) {
    // Sanitizar el idempleado (importante para evitar inyección SQL)
    $idempleado = mysqli_real_escape_string($conn, $_POST['idempleado']);
    
    // Obtener dato_laboral_iddato_laboral del empleado
    $sql_empleado = "SELECT dato_laboral_iddato_laboral FROM empleado WHERE idempleado = $idempleado";
    $resultado_empleado = $conn->query($sql_empleado);

    if ($resultado_empleado->num_rows > 0) {
        $row_empleado = $resultado_empleado->fetch_assoc();
        $dato_laboral = $row_empleado['dato_laboral_iddato_laboral'];
    } else {
        echo json_encode(array('error' => 'No se encontraron resultados para el empleado.'));
        exit;
    }

    // Consulta para obtener las ausencias del empleado
    $sql_ausencias = "SELECT ausencia.fecha_salida, ausencia.fecha_entrada, tipo_ausencia.motivo 
                      FROM ausencia 
                      INNER JOIN tipo_ausencia ON tipo_ausencia.idtipo_ausencia = ausencia.tipo_ausencia_idtipo_ausencia 
                      WHERE ausencia.dato_laboral_iddato_laboral = $dato_laboral";

    $result = mysqli_query($conn, $sql_ausencias);

    if (!$result) {
        die(json_encode(array('error' => 'Error de consulta: ' . mysqli_error($conn))));
    }
    
    $json = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = array(
            'fecha_salida' => $row['fecha_salida'],
            'fecha_entrada' => $row['fecha_entrada'],
            'motivo' => $row['motivo'],
        );
    }

    // Devolver los datos como JSON
    echo json_encode($json);

} else {
    echo json_encode(array('error' => 'No se recibió el parámetro idempleado.'));
}
?>