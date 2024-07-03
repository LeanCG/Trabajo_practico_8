<?php

    include("database.php");

    $search = $_POST['search'];

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(!empty($search)){
            $query = "SELECT idempleado, nombre, apellido FROM empleado WHERE nombre LIKE '$search%'";
            $result = mysqli_query($conn, $query);
            if(!$result){
                die('Error de consulta' . mysqli_error($conexion));
            }

            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json[] =  array('idempleado' => $row['idempleado'],
                'nombre' => $row['nombre'],
                'apellido' => $row['apellido']
            );
            }
            $jsonstrin = json_encode($json);
            echo $jsonstrin;
        }
    }    