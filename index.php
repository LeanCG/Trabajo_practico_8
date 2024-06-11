<?php include('db.php'); ?> <!-- Incluye el archivo de conexión a la base de datos. -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"> <!-- Define la codificación de caracteres como UTF-8. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configura la ventana gráfica para dispositivos móviles. -->
    <title>Gestión de Empleados</title> <!-- Título de la página. -->
    <link rel="stylesheet" href="styles.css"> <!-- Incluye el archivo de estilos CSS. -->
</head>
<body>
    <div class="container"> <!-- Contenedor principal de la página. -->
        <h1>Lista de Empleados</h1> <!-- Encabezado principal. -->
        <a href="create.php" class="button">Agregar Nuevo Empleado</a>
        <a href="create_inasistencia.php" class="button">Agregar Inasistencia</a> <!-- Enlace para agregar un nuevo empleado. -->
        <table>
            <thead>
                <tr>
                    <!-- Encabezados de la tabla. -->
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>CUIL</th>
                    <th>Email</th>
                    <th>Tipo Empleado</th>
                    <th>Historial Académico</th>
                    <th>Dato Laboral</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                /*Se realiza una consulta SQL utilizando 'joins' para que
                se muestre la descripción del 'tipo de empleado', 'historial académico' y
                el 'dato laboral' de manera más legible, en vez de mostrar los 'ids'*/
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
                ";

                $result = $conn->query($sql); // Ejecuta la consulta y guarda el resultado.
                if ($result->num_rows > 0) { // Verifica si hay al menos un registro.
                    while($row = $result->fetch_assoc()) { // Recorre cada registro devuelto por la consulta.
                        echo "<tr>
                                <!-- Muestra los datos del empleado en una fila de la tabla. -->
                                <td>{$row['idempleado']}</td>
                                <td>{$row['nombre']}</td>
                                <td>{$row['apellido']}</td>
                                <td>{$row['dni']}</td>
                                <td>{$row['cuil']}</td>
                                <td>{$row['mail']}</td>
                                <td>{$row['tipo_empleado']}</td>
                                <td>{$row['historial_academico']}</td>
                                <td>{$row['dato_laboral']}</td>
                                <td>
                                    <!-- Enlaces para editar y eliminar al empleado. -->
                                    <a href='update.php?id={$row['idempleado']}' class='button'>Editar</a>
                                    <a href='delete.php?id={$row['idempleado']}' class='button delete'>Eliminar</a>
                                </td>
                            </tr>";
                    }
                } else {
                    // Muestra un mensaje si no hay registros en la tabla 'empleado'.
                    echo "<tr><td colspan='10'>No hay empleados registrados</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>