<?php include ('db.php'); ?>
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
        $tipo_inasistencia_options = getOptions($conn, 'tipo_ausencia', 'idtipo_ausencia', 'motivo');
        $dato_laboral_options = getOptions($conn, 'dato_laboral', 'iddato_laboral', 'descripcion');
        ?>
        <form action="create_inasistencia.php" method="post">
            <label for="fecha_salida">Fecha salida:</label>
            <input type="date" name="fecha_salida" id="fecha_salida" required>
            <label for="fecha_entrada">Fecha entrada:</label>
            <input type="date" name="fecha_entrada" id="fecha_entrada" required>
            <label for="tipo_ausencia">Tipo ausencia:</label>
            <select name="tipo_ausencia_idtipo_ausencia" id="tipo_ausencia" required>
                <?php echo $tipo_inasistencia_options; ?>
            </select>            
            <label for="empleado">Empleado:</label>
            <select name="dato_laboral_iddato_laboral" id="dato_laboral_iddato_laboral" required>
                <?php
                $sql = "SELECT e.idempleado, e.nombre, e.apellido, dl.iddato_laboral
                        FROM empleado e
                        LEFT JOIN dato_laboral dl ON e.dato_laboral_iddato_laboral = dl.iddato_laboral";
                $result = $conn->query($sql);
                while ($row = $result->fetch_assoc()) {
                    echo "<option value='{$row['iddato_laboral']}'>{$row['nombre']} {$row['apellido']}</option>";
                }
                ?>
            </select>
            <input type="submit" name="submit" value="Agregar" class="button">
        </form>
        <a href="index.php" class="button">Volver</a>

        <?php
        if (isset($_POST['submit'])){
            $fecha_salida = $_POST['fecha_salida'];
            $fecha_entrada = $_POST['fecha_entrada'];
            $tipo_ausencia_idtipo_ausencia = $_POST['tipo_ausencia_idtipo_ausencia'];
            $dato_laboral_iddato_laboral = $_POST['dato_laboral_iddato_laboral'];

            $sql = "INSERT INTO ausencia (fecha_salida, fecha_entrada, tipo_ausencia_idtipo_ausencia, dato_laboral_iddato_laboral) VALUES('$fecha_salida', '$fecha_entrada', '$tipo_ausencia_idtipo_ausencia', '$dato_laboral_iddato_laboral')";

            if ($conn->query($sql) === true) {
                echo "Nueva inasistencia agregada exitosamente.";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
        ?>

        <h2>Lista de Inasistencias</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha Salida</th>
                    <th>Fecha Entrada</th>
                    <th>Tipo Ausencia</th>
                    <th>Empleado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "SELECT a.idausencia, a.fecha_salida, a.fecha_entrada, ta.motivo, e.nombre, e.apellido
                        FROM ausencia a
                        LEFT JOIN tipo_ausencia ta ON a.tipo_ausencia_idtipo_ausencia = ta.idtipo_ausencia
                        LEFT JOIN dato_laboral dl ON a.dato_laboral_iddato_laboral = dl.iddato_laboral
                        LEFT JOIN empleado e ON dl.iddato_laboral = e.dato_laboral_iddato_laboral";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>{$row['idausencia']}</td>
                                <td>{$row['fecha_salida']}</td>
                                <td>{$row['fecha_entrada']}</td>
                                <td>{$row['motivo']}</td>
                                <td>{$row['nombre']} {$row['apellido']}</td>
                                <td>
                                    <a href='update_inasistencia.php?id={$row['idausencia']}' class='button'>Editar</a>
                                    <a href='delete_inasistencia.php?id={$row['idausencia']}' class='button delete'>Eliminar</a>
                                </td>
                            </tr>";
                    }
                } else {
                    echo "<tr><td colspan='6'>No hay inasistencias registradas</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>
