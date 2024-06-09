<?php include('db.php'); ?> <!-- Incluye el archivo de conexión a la base de datos. -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"> <!-- Define la codificación de caracteres como UTF-8. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configura la ventana gráfica para dispositivos móviles. -->
    <title>Editar Empleado</title> <!-- Título de la página. -->
    <link rel="stylesheet" href="styles.css"> <!-- Incluye el archivo de estilos CSS. -->
</head>
<body>
    <div class="container"> <!-- Contenedor principal de la página. -->
        <h1>Editar Empleado</h1> <!-- Encabezado principal. -->
        
        <?php

        // Verifica si el formulario de actualización ha sido enviado.
        if (isset($_POST['update'])) {
            // Recoge los datos enviados por el formulario.
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $apellido = $_POST['apellido'];
            $dni = $_POST['dni'];
            $cuil = $_POST['cuil'];
            $mail = $_POST['mail'];
            $tipo_empleado_idtipo_empleado = $_POST['tipo_empleado_idtipo_empleado'];
            $historial_academico_idhistorial_academico = $_POST['historial_academico_idhistorial_academico'];
            $dato_laboral_iddato_laboral = $_POST['dato_laboral_iddato_laboral'];

            // Consulta SQL para actualizar los datos del empleado.
            $sql = "UPDATE empleado SET nombre='$nombre', apellido='$apellido', dni='$dni', cuil='$cuil', mail='$mail', tipo_empleado_idtipo_empleado='$tipo_empleado_idtipo_empleado', historial_academico_idhistorial_academico='$historial_academico_idhistorial_academico', dato_laboral_iddato_laboral='$dato_laboral_iddato_laboral' WHERE idempleado='$id'";

            // Ejecuta la consulta y verifica si se realizó con éxito.
            if ($conn->query($sql) === TRUE) {
                echo "Empleado actualizado exitosamente."; // Mensaje de éxito.
                // Volver a cargar los datos del empleado.
                $sql = "SELECT * FROM empleado WHERE idempleado = $id";
                $result = $conn->query($sql); // Ejecuta la consulta.

                // Verifica si se han encontrado resultados.
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc(); // Almacena los datos del empleado.
                } else {
                    echo "Empleado no encontrado."; // Muestra un mensaje si no se encuentra el empleado.
                    exit; // Termina el script.
                }

            } else {
                echo "Error: " . $sql . "<br>" . $conn->error; // Mensaje de error.
            }
        }
        // Verifica si se ha recibido un ID de empleado mediante GET para edición.
        elseif (isset($_GET['id'])) {
            $id = $_GET['id']; // Almacena el ID del empleado.
            // Consulta SQL para obtener los datos del empleado específico.
            $sql = "SELECT * FROM empleado WHERE idempleado = $id";
            $result = $conn->query($sql); // Ejecuta la consulta.
            
            // Verifica si se han encontrado resultados.
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc(); // Almacena los datos del empleado.
            } else {
                echo "Empleado no encontrado."; // Muestra un mensaje si no se encuentra el empleado.
                exit; // Termina el script.
            }
        }else {
            echo "No se proporcionó un ID de empleado."; // Mensaje si no se proporciona un ID.
            exit; // Termina el script.
        }
        
        // Función para obtener listas de descripciones para los selects
        function getOptions($conn, $table, $idField, $descField, $selectedId) {
            $options = "";
            $sql = "SELECT $idField, $descField FROM $table";
            $result = $conn->query($sql);
            while ($row = $result->fetch_assoc()) {
                $selected = $row[$idField] == $selectedId ? "selected" : "";
                $options .= "<option value='{$row[$idField]}' $selected>{$row[$descField]}</option>";
            }
            return $options;
        }
        //Se envían los datos correspondientes de lo seleccionado por el usuario a la función 'getOptions
        $tipoEmpleadoOptions = getOptions($conn, 'tipo_empleado', 'idtipo_empleado', 'descripcion', $row['tipo_empleado_idtipo_empleado']);
        $historialAcademicoOptions = getOptions($conn, 'dato_academico', 'idhistorial_academico', 'descripcion', $row['historial_academico_idhistorial_academico']);
        $datoLaboralOptions = getOptions($conn, 'dato_laboral', 'iddato_laboral', 'descripcion', $row['dato_laboral_iddato_laboral']);
        ?>

        <!-- Formulario para editar los datos del empleado -->
        <form action="update.php" method="post">
            <input type="hidden" name="id" value="<?php echo $row['idempleado']; ?>"> <!-- Campo oculto para el ID del empleado. -->
            <label for="nombre">Nombre:</label>
            <input type="text" name="nombre" value="<?php echo $row['nombre']; ?>" required> <!-- Campo de entrada para el nombre. -->
            <label for="apellido">Apellido:</label>
            <input type="text" name="apellido" value="<?php echo $row['apellido']; ?>" required> <!-- Campo de entrada para el apellido. -->
            <label for="dni">DNI:</label>
            <input type="text" name="dni" value="<?php echo $row['dni']; ?>" required> <!-- Campo de entrada para el DNI. -->
            <label for="cuil">CUIL:</label>
            <input type="text" name="cuil" value="<?php echo $row['cuil']; ?>" required> <!-- Campo de entrada para el CUIL. -->
            <label for="mail">Email:</label>
            <input type="email" name="mail" value="<?php echo $row['mail']; ?>" required> <!-- Campo de entrada para el correo electrónico. -->
            
            <label for="tipo_empleado_idtipo_empleado">Tipo Empleado:</label>
            <select name="tipo_empleado_idtipo_empleado" required>
                <?php echo $tipoEmpleadoOptions; ?>
            </select>
            <label for="historial_academico_idhistorial_academico">Historial Académico:</label>
            <select name="historial_academico_idhistorial_academico" required>
                <?php echo $historialAcademicoOptions; ?>
            </select>
            <label for="dato_laboral_iddato_laboral">Dato Laboral:</label>
            <select name="dato_laboral_iddato_laboral" required>
                <?php echo $datoLaboralOptions; ?>
            </select>

            <input type="submit" name="update" value="Actualizar" class="button"> <!-- Botón para enviar el formulario de actualización. -->
        </form>
        <a href="index.php" class="button">Volver</a> <!-- Enlace para volver a la página principal. -->
    </div>
</body>
</html>