<?php include('db.php'); ?> <!-- Incluye el archivo de conexión a la base de datos. -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"> <!-- Define la codificación de caracteres como UTF-8. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configura la ventana gráfica para dispositivos móviles. -->
    <title>Agregar Empleado</title> <!-- Título de la página. -->
    <link rel="stylesheet" href="styles.css"> <!-- Incluye el archivo de estilos CSS. -->
</head>
<body>
    <div class="container"> <!-- Contenedor principal de la página. -->
        <h1>Agregar Nuevo Empleado</h1> <!-- Encabezado principal. -->
        <?php
        // Obtener listas de descripciones para los selects
        function getOptions($conn, $table, $idField, $descField) {
            $options = "";
            $sql = "SELECT $idField, $descField FROM $table";
            $result = $conn->query($sql);
            while ($row = $result->fetch_assoc()) {
                $options .= "<option value='{$row[$idField]}'>{$row[$descField]}</option>";
            }
            return $options;
        }

        $tipoEmpleadoOptions = getOptions($conn, 'tipo_empleado', 'idtipo_empleado', 'descripcion');
        $historialAcademicoOptions = getOptions($conn, 'dato_academico', 'idhistorial_academico', 'descripcion');
        $datoLaboralOptions = getOptions($conn, 'dato_laboral', 'iddato_laboral', 'descripcion');
        ?>


        <form action="create.php" method="post"> <!-- Formulario para agregar un nuevo empleado. -->
            <label for="nombre">Nombre:</label>
            <input type="text" name="nombre" id="nombre" required> <!-- Campo de entrada para el nombre. -->
            <label for="apellido">Apellido:</label>
            <input type="text" name="apellido" id="apellido" required> <!-- Campo de entrada para el apellido. -->
            <label for="dni">DNI:</label>
            <input type="text" name="dni" id="dni" required> <!-- Campo de entrada para el DNI. -->
            <label for="cuil">CUIL:</label>
            <input type="text" name="cuil" id="cuil" required> <!-- Campo de entrada para el CUIL. -->
            <label for="mail">Email:</label>
            <input type="email" name="mail" id="mail" required> <!-- Campo de entrada para el correo electrónico. -->
            <label for="tipo_empleado">Tipo Empleado:</label>
            
            <select name="tipo_empleado_idtipo_empleado" id="tipo_empleado" required> <!-- Campo de selección para el tipo de empleado. -->
                <?php echo $tipoEmpleadoOptions; ?>
            </select>
            <label for="historial_academico">Historial Académico:</label>
            <select name="historial_academico_idhistorial_academico" id="historial_academico" required> <!-- Campo de selección para el historial académico. -->
                <?php echo $historialAcademicoOptions; ?>
            </select>
            <label for="dato_laboral">Dato Laboral:</label>
            <select name="dato_laboral_iddato_laboral" id="dato_laboral" required> <!-- Campo de selección para el dato laboral. -->
                <?php echo $datoLaboralOptions; ?>
            </select>
            
            <input type="submit" name="submit" value="Agregar" class="button"> <!-- Botón para enviar el formulario. -->
        </form>
        <a href="index.php" class="button">Volver</a> <!-- Enlace para volver a la página principal. -->

        <?php
        // Verifica si el formulario ha sido enviado.
        if (isset($_POST['submit'])) {
            // Recoge los datos del formulario.
            $nombre = $_POST['nombre'];
            $apellido = $_POST['apellido'];
            $dni = $_POST['dni'];
            $cuil = $_POST['cuil'];
            $mail = $_POST['mail'];
            $tipo_empleado_idtipo_empleado = $_POST['tipo_empleado_idtipo_empleado'];
            $historial_academico_idhistorial_academico = $_POST['historial_academico_idhistorial_academico'];
            $dato_laboral_iddato_laboral = $_POST['dato_laboral_iddato_laboral'];

            // Consulta SQL para insertar un nuevo empleado en la base de datos.
            $sql = "INSERT INTO empleado (nombre, apellido, dni, cuil, mail, tipo_empleado_idtipo_empleado, historial_academico_idhistorial_academico, dato_laboral_iddato_laboral) VALUES ('$nombre', '$apellido', '$dni', '$cuil', '$mail', '$tipo_empleado_idtipo_empleado', '$historial_academico_idhistorial_academico', '$dato_laboral_iddato_laboral')";

            // Ejecuta la consulta y verifica si se realizó con éxito.
            if ($conn->query($sql) === TRUE) {
                echo "Nuevo empleado agregado exitosamente."; // Mensaje de éxito.
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error; // Mensaje de error.
            }
        }
        ?>
    </div>
</body>
</html>