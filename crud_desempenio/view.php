<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


// Conexión a la base de datos
include ("../database.php");

if (isset($_POST['idempleado'])) {

    $idempleado = $_POST['idempleado'];
    $sql="SELECT dato_laboral_iddato_laboral FROM empleado WHERE idempleado = $idempleado";
    $resultado = $conn->query($sql);

    if ($resultado->num_rows > 0) {
        // Obtener el resultado
        $row = $resultado->fetch_assoc();
        $dato_laboral = $row['dato_laboral_iddato_laboral'];
        //echo "El ID seleccionado es: " . $dato_laboral;
    } else {
        echo "No se encontraron resultados";
    }

    $sql = "SELECT 
        d.descripcion,
        d.puntualidad,
        d.compañerismo,
        d.autoconciencia,
        d.liderazgo
    FROM 
        desempenio d
    WHERE
        d.iddesempenio = (SELECT iddesempenio FROM dato_laboral WHERE iddato_laboral = $dato_laboral)";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        die('Error de consulta: ' . mysqli_error($conn));
    }
    
    $json = array();
    while ($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'descripcion' => $row['descripcion'],
            'puntualidad' => $row['puntualidad'],
            'compañerismo' => $row['compañerismo'],
            'autoconciencia' => $row['autoconciencia'],
            'liderazgo' => $row['liderazgo']
        );
    }

    $jsonstring = json_encode($json);

    echo $jsonstring;
}
?>
