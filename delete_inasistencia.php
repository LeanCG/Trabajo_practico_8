<?php
include('db.php');
if (isset($_GET['id'])) {
    $id=$_GET['id'];
    $sql= "DELETE FROM ausencia WHERE idausencia=$id";

    if ($conn->query($sql)=== true) {
        echo "empleado eliminado exitosamente";

    } else{
        echo"error:" .$sql. "<br>". $conn->error;
    }
}
header('Location: create_inasistencia.php');
?>