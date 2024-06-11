<?php include ('db.php');?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agregar inasistencia</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="container">
            <h1>Agregar nueva inasistencia</h1>
            <?php
             function getOptions($conn, $table, $idField, $descField) {
                $options = "";
                $sql = "SELECT $idField, $descField FROM $table";
                $result = $conn->query($sql);
                while ($row = $result->fetch_assoc()) {
                    $options .= "<option value='{$row[$idField]}'>{$row[$descField]}</option>";
                }
                return $options;
            }
            $tipo_inasistencia_options= getOptions($conn,'tipo_ausencia','idtipo_ausencia','motivo');
            $dato_laboral_options=getOptions($conn,'dato_laboral','iddato_laboral','descripcion');
            ?>
        <form action="create_inasistencia.php" method="post">
        <label for="fecha_salida">Fecha salida:</label>
        <input type="date" name="fecha_salida" id="fecha_salida" required>
        <label for="fecha_entrada">Fecha entrada:</label>
        <input type="date" name="fecha_entrada" id="fecha_entrada" required>
        <label for="tipo_ausencia">Tipo ausencia:</label>
            <select name="tipo_ausencia_idtipo_ausencia" id="tipo_ausencia" required>
                <?php echo $tipo_inasistencia_options; ?>
            <select>
            <label for="dato_laboral">Dato laboral:</label>
            <select name="dato_laboral_iddato_laboral" id="dato_laboral" required> 
                <?php echo $dato_laboral_options; ?>
            </select>
            <input type="submit" name="submit" value="Agregar" class="button">
        </form>
        <a href="index.php" class="button">Volver</a>

        <?php
        if (isset($_POST['submit'])){
            $fecha_salida=$_POST['fecha_salida'];
            $fecha_entrada=$_POST['fecha_entrada'];
            $tipo_ausencia_idtipo_ausencia=$_POST['tipo_ausencia_idtipo_ausencia'];
            $dato_laboral_iddato_laboral=$_POST['dato_laboral_iddato_laboral'];

            $sql="INSERT INTO ausencia (fecha_salida,fecha_entrada,tipo_ausencia_idtipo_ausencia,dato_laboral_iddato_laboral) VALUES('$fecha_salida','$fecha_entrada','$tipo_ausencia_idtipo_ausencia','$dato_laboral_iddato_laboral')";

            if ($conn ->query($sql)===true){
                echo "nueva inasistencia agregada exitosamente.";
            }
            else{
                echo "Error: ".$sql."<br>".$conn->error;
            }
        }
        ?>
        </div>
    </body>                                                 
</html> 
