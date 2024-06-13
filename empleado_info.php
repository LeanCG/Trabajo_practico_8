<?php include('db.php'); ?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información del Empleado</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Información del Empleado</h1>
        
        <?php
        if (isset($_GET['id'])) {
            // Obtener el ID del empleado desde la URL
            $idempleado = $_GET['id'];

            // Obtener información del empleado
            $sql = "SELECT nombre, apellido FROM empleado WHERE idempleado = $idempleado";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $nombre = $row['nombre'];
                $apellido = $row['apellido'];
                echo "<h2>$nombre $apellido</h2>";
            }
            // Consultar la cantidad de inasistencias del empleado
            $sql = "SELECT COUNT(*) AS total_inasistencias 
                    FROM ausencia a
                    LEFT JOIN dato_laboral dl ON a.dato_laboral_iddato_laboral = dl.iddato_laboral
                    LEFT JOIN empleado e ON dl.iddato_laboral = e.dato_laboral_iddato_laboral
                    WHERE e.idempleado = $idempleado";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $total_inasistencias = $row['total_inasistencias'];
                echo "<p>El empleado tiene un total de $total_inasistencias inasistencias</p><br>";

                // Mostrar las inasistencias en una tabla
                $sql = "SELECT a.fecha_salida, a.fecha_entrada, ta.motivo 
                        FROM ausencia a
                        LEFT JOIN tipo_ausencia ta ON a.tipo_ausencia_idtipo_ausencia = ta.idtipo_ausencia
                        LEFT JOIN dato_laboral dl ON a.dato_laboral_iddato_laboral = dl.iddato_laboral
                        LEFT JOIN empleado e ON dl.iddato_laboral = e.dato_laboral_iddato_laboral
                        WHERE e.idempleado = $idempleado";
                $result = $conn->query($sql);

                echo "<h3>Inasistencias del empleado:</h3>";
                if ($result->num_rows > 0) {
                    echo "<table>
                            <thead>
                                <tr>
                                    <th>Desde</th>
                                    <th>Hasta</th>
                                    <th>Motivo</th>
                                </tr>
                            </thead>
                            <tbody>";
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>{$row['fecha_salida']}</td>
                                <td>{$row['fecha_entrada']}</td>
                                <td>{$row['motivo']}</td>
                              </tr>";
                    }
                    echo "</tbody></table>";
                } else {
                    echo "<p>No hay inasistencias registradas para este empleado.</p>";
                }
            } else {
                echo "<p>No se encontró información del empleado.</p>";
            }
        } else {
            echo "<p>No se ha proporcionado un ID de empleado.</p>";
        }
        ?>
        <a href="index.php" class="button">Volver</a>
    </div>
</body>
</html>