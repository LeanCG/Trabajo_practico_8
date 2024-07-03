<?php include('db.php'); ?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Inasistencia</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Editar Inasistencia</h1>
        

        <?php
        $tipo_ausencia_idtipo_ausencia = ""; 
        
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sql = "SELECT * FROM ausencia WHERE idausencia = $id";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $fecha_salida = $row['fecha_salida'];
                $fecha_entrada = $row['fecha_entrada'];
                $tipo_ausencia_idtipo_ausencia = $row['tipo_ausencia_idtipo_ausencia'];
                $dato_laboral_iddato_laboral = $row['dato_laboral_iddato_laboral'];
            } else {
                echo "No se encontró la inasistencia.";
            }
        echo $id;
        } else {
            echo "No se ha proporcionado un ID de inasistencia para editar.";
        }

        function getOptions($conn, $table, $idField, $descField, $selectedId) {
            $options = "";
            $sql = "SELECT $idField, $descField FROM $table";
            $result = $conn->query($sql);
            while ($row = $result->fetch_assoc()) {
                $selected = ($row[$idField] == $selectedId) ? "selected" : "";
                $options .= "<option value='{$row[$idField]}' $selected>{$row[$descField]}</option>";
            }
            return $options;
        }

        $tipo_inasistencia_options = getOptions($conn, 'tipo_ausencia', 'idtipo_ausencia', 'motivo', $tipo_ausencia_idtipo_ausencia);
        
        ?>

        <form action="update_inasistencia.php" method="post">
            <input type="hidden" name="idausencia" value="<?php echo $id; ?>">
            <label for="fecha_salida">Fecha salida:</label>
            <input type="date" name="fecha_salida" id="fecha_salida" value="<?php echo $fecha_salida; ?>" required>
            <label for="fecha_entrada">Fecha entrada:</label>
            <input type="date" name="fecha_entrada" id="fecha_entrada" value="<?php echo $fecha_entrada; ?>" required>
            <label for="tipo_ausencia">Tipo ausencia:</label>
            <select name="tipo_ausencia_idtipo_ausencia" id="tipo_ausencia" required>
                <?php echo $tipo_inasistencia_options; ?>
            </select>
            <input type="submit" name="submit" value="Actualizar" class="button">
            <input type="hidden" name="idausencia" value="<?php echo $id; ?>">

        </form>
        <a href="create_inasistencia.php" class="button">Volver</a>

        <?php
        if (isset($_POST['submit'])){
            $id = $_POST['idausencia'];
            $fecha_salida = $_POST['fecha_salida'];
            $fecha_entrada = $_POST['fecha_entrada'];
            $tipo_ausencia_idtipo_ausencia = $_POST['tipo_ausencia_idtipo_ausencia'];
            

            $sql = "UPDATE ausencia SET 
                    fecha_salida='$fecha_salida', 
                    fecha_entrada='$fecha_entrada', 
                    tipo_ausencia_idtipo_ausencia='$tipo_ausencia_idtipo_ausencia'
                    WHERE idausencia=$id";

            if ($conn->query($sql) === true) {
                echo "Inasistencia actualizada exitosamente.";
                header("Location: create_inasistencia.php");
                exit();
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
        ?>
    </div>
</body>
</html>
