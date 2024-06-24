<?php


// Conexión a la base de datos
include ("database.php");

if (isset($_POST['idempleado'])) {

    $idempleado = $_POST['idempleado'];

    $sql = "SELECT 
        e.idempleado,
        e.nombre,
        e.apellido,
        e.dni,
        e.cuil,
        e.mail,
        te.descripcion AS tipo_empleado,
        da.descripcion AS historial_academico,
        dl.descripcion AS dato_laboral
    FROM 
        empleado e
    LEFT JOIN 
        tipo_empleado te ON e.tipo_empleado_idtipo_empleado = te.idtipo_empleado
    LEFT JOIN 
        dato_academico da ON e.historial_academico_idhistorial_academico = da.idhistorial_academico
    LEFT JOIN 
        dato_laboral dl ON e.dato_laboral_iddato_laboral = dl.iddato_laboral
    WHERE
        e.idempleado = '$idempleado'";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        die('Error de consulta: ' . mysqli_error($conn));
    }
    
    $json = array();
    while ($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'idempleado' => $row['idempleado'],
            'nombre' => $row['nombre'],
            'apellido' => $row['apellido'],
            'dni' => $row['dni'],
            'cuil' => $row['cuil'],
            'mail' => $row['mail'],
            'tipo_empleado' => $row['tipo_empleado'],
            'historial_academico' => $row['historial_academico'],
            'dato_laboral' => $row['dato_laboral']
        );
    }

    $jsonstring = json_encode($json);

    echo $jsonstring;
}
?>
