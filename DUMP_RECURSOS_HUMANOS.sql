CREATE DATABASE  IF NOT EXISTS `RecursoHumano` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `RecursoHumano`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: RecursoHumano
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ausencia`
--

DROP TABLE IF EXISTS `ausencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ausencia` (
  `idausencia` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_salida` varchar(45) NOT NULL,
  `fecha_entrada` varchar(45) NOT NULL,
  `tipo_ausencia_idtipo_ausencia` int(11) NOT NULL,
  `dato_laboral_iddato_laboral` int(11) NOT NULL,
  PRIMARY KEY (`idausencia`),
  KEY `fk_ausencia_tipo_ausencia1_idx` (`tipo_ausencia_idtipo_ausencia`),
  KEY `fk_ausencia_dato_laboral1_idx` (`dato_laboral_iddato_laboral`),
  CONSTRAINT `fk_ausencia_dato_laboral1` FOREIGN KEY (`dato_laboral_iddato_laboral`) REFERENCES `dato_laboral` (`iddato_laboral`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ausencia_tipo_ausencia1` FOREIGN KEY (`tipo_ausencia_idtipo_ausencia`) REFERENCES `tipo_ausencia` (`idtipo_ausencia`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ausencia`
--

LOCK TABLES `ausencia` WRITE;
/*!40000 ALTER TABLE `ausencia` DISABLE KEYS */;
INSERT INTO `ausencia` VALUES (1,'2023-01-01','2023-01-02',1,1),(2,'2023-01-02','2023-01-03',2,2),(3,'2023-01-03','2023-01-10',3,3),(4,'2023-01-04','2023-01-19',4,4),(5,'2023-01-05','2023-04-05',5,5),(6,'2023-01-06','2023-01-07',6,6),(7,'2023-01-07','2023-01-08',7,7),(8,'2023-01-08','2023-01-09',8,8),(9,'2023-01-09','2023-01-10',9,9),(10,'2023-01-10','2023-01-11',10,10),(11,'2023-01-11','2023-01-12',11,11),(12,'2023-01-12','2023-01-13',12,12),(13,'2023-01-13','2023-01-14',13,13),(14,'2023-01-14','2023-01-15',14,14),(15,'2023-01-15','2023-01-16',15,15),(19,'2023-01-19','2023-01-20',19,19),(20,'2023-01-20','2023-01-21',20,20),(21,'2023-01-21','2023-01-22',1,21),(22,'2023-01-22','2023-01-23',2,22),(23,'2023-01-23','2023-01-24',3,23),(24,'2023-01-24','2023-01-25',4,24),(25,'2023-01-25','2023-01-27',6,25),(26,'2023-01-26','2023-01-28',8,26),(27,'2023-01-27','2023-01-28',8,27),(28,'2023-01-28','2023-01-29',9,28),(29,'2023-01-29','2023-01-30',9,29),(30,'2023-01-30','2023-01-31',9,30),(31,'2023-01-31','2023-02-01',10,31),(32,'2023-02-01','2023-02-02',11,32),(33,'2023-02-02','2023-02-03',11,33),(34,'2023-02-03','2023-02-04',12,34),(35,'2023-02-04','2023-02-08',16,35),(36,'2023-02-05','2023-02-09',17,36),(37,'2023-02-06','2023-02-11',19,37),(38,'2023-02-07','2023-02-10',9,38),(39,'2023-02-08','2023-02-15',3,39);
/*!40000 ALTER TABLE `ausencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dato_academico`
--

DROP TABLE IF EXISTS `dato_academico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dato_academico` (
  `idhistorial_academico` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idhistorial_academico`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dato_academico`
--

LOCK TABLES `dato_academico` WRITE;
/*!40000 ALTER TABLE `dato_academico` DISABLE KEYS */;
INSERT INTO `dato_academico` VALUES (1,'Médico'),(2,'Abogado'),(3,'Ingeniero Civil'),(4,'Arquitecto'),(5,'Psicólogo'),(6,'Enfermero'),(7,'Contador Público'),(8,'Administrador de Empresas'),(9,'Profesor'),(10,'Químico'),(11,'Farmacéutico'),(12,'Periodista'),(13,'Diseñador Gráfico'),(14,'Trabajador Social'),(15,'Biólogo'),(16,'Economista'),(17,'Veterinario'),(18,'Físico'),(19,'Matemático'),(20,'Historiador');
/*!40000 ALTER TABLE `dato_academico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dato_laboral`
--

DROP TABLE IF EXISTS `dato_laboral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dato_laboral` (
  `iddato_laboral` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  `fecha_ingreso` varchar(45) NOT NULL,
  `rubro_idrubro` int(11) NOT NULL,
  `iddesempenio` int(11) DEFAULT NULL,
  `porcentaje_sobre_sueldo` float DEFAULT NULL,
  PRIMARY KEY (`iddato_laboral`),
  KEY `fk_dato_laboral_rubro1_idx` (`rubro_idrubro`),
  KEY `fk_dato_laboral_desempeño1_idx` (`iddesempenio`),
  CONSTRAINT `fk_dato_laboral_desempeño1` FOREIGN KEY (`iddesempenio`) REFERENCES `desempenio` (`iddesempenio`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_dato_laboral_rubro1` FOREIGN KEY (`rubro_idrubro`) REFERENCES `rubro` (`idrubro`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dato_laboral`
--

LOCK TABLES `dato_laboral` WRITE;
/*!40000 ALTER TABLE `dato_laboral` DISABLE KEYS */;
INSERT INTO `dato_laboral` VALUES (1,'Recepcionista','2017-05-15',20,1,11),(2,'Recepcionista','2016-11-23',20,2,10),(3,'Recepcionista','2015-08-04',20,3,9),(4,'Técnico de Mantenimiento','2018-02-11',19,4,8),(5,'Técnico de Mantenimiento','2019-09-30',19,5,7),(6,'Técnico de Mantenimiento','2016-04-17',19,6,6),(7,'Administración y Oficina','2018-07-22',18,7,5),(8,'Administración y Oficina','2017-10-09',18,8,11),(9,'Administración y Oficina','2019-01-28',18,9,10),(10,'Mantenimiento y Reparación','2015-06-10',17,10,9),(11,'Mantenimiento y Reparación','2018-12-03',17,11,8),(12,'Mantenimiento y Reparación','2017-03-19',17,12,7),(13,'Producción y Operaciones','2016-08-27',16,13,6),(14,'Producción y Operaciones','2019-05-05',16,14,5),(15,'Producción y Operaciones','2016-01-12',16,15,11),(19,'Logística y Cadena de Suministro','2019-10-15',14,19,7),(20,'Logística y Cadena de Suministro','2016-05-20',14,20,6),(21,'Logística y Cadena de Suministro','2015-09-02',14,21,5),(22,'Marketing y Publicidad','2018-10-29',13,22,11),(23,'Marketing y Publicidad','2017-01-07',13,23,10),(24,'Marketing y Publicidad','2019-03-14',13,1,9),(25,'Administración y Oficina','2016-06-30',12,2,8),(26,'Administración y Oficina','2018-08-09',12,3,7),(27,'Administración y Oficina','2017-11-18',12,4,6),(28,'Finanzas y Contabilidad','2015-12-26',11,5,5),(29,'Finanzas y Contabilidad','2018-01-03',11,6,11),(30,'Finanzas y Contabilidad','2019-06-21',11,7,10),(31,'Ventas y Comercialización','2016-09-08',10,8,9),(32,'Ventas y Comercialización','2015-03-16',10,9,8),(33,'Ventas y Comercialización','2018-05-23',10,10,7),(34,'Ventas y Comercialización','2017-02-11',9,11,6),(35,'Ventas y Comercialización','2019-08-02',9,12,5),(36,'Ventas y Comercialización','2016-02-19',9,13,11),(37,'Diseño y Creatividad','2015-10-04',8,14,10),(38,'Diseño y Creatividad','2018-11-11',8,15,9),(39,'Diseño y Creatividad','2017-04-29',8,16,8);
/*!40000 ALTER TABLE `dato_laboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desempenio`
--

DROP TABLE IF EXISTS `desempenio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desempenio` (
  `iddesempenio` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  `puntualidad` int(11) DEFAULT NULL,
  `compañerismo` int(11) DEFAULT NULL,
  `autoconciencia` int(11) DEFAULT NULL,
  `liderazgo` int(11) DEFAULT NULL,
  PRIMARY KEY (`iddesempenio`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desempenio`
--

LOCK TABLES `desempenio` WRITE;
/*!40000 ALTER TABLE `desempenio` DISABLE KEYS */;
INSERT INTO `desempenio` VALUES (1,'bueno',NULL,NULL,NULL,NULL),(2,'medio ',NULL,NULL,NULL,NULL),(3,'excelente',NULL,NULL,NULL,NULL),(4,'Gran tapa',NULL,NULL,NULL,NULL),(5,'Malo',NULL,NULL,NULL,NULL),(6,'distinguido',NULL,NULL,NULL,NULL),(7,'Excª',NULL,NULL,NULL,NULL),(8,'buena melena',NULL,NULL,NULL,NULL),(9,'necesario',NULL,NULL,NULL,NULL),(10,'Buen desempeño',NULL,NULL,NULL,NULL),(11,'Excelentes',NULL,NULL,NULL,NULL),(12,'Ex',NULL,NULL,NULL,NULL),(13,'buen m',NULL,NULL,NULL,NULL),(14,'gran l',NULL,NULL,NULL,NULL),(15,'Excelente grupal',NULL,NULL,NULL,NULL),(16,'Excelente individual',NULL,NULL,NULL,NULL),(17,'Buen desempeño en contacto',NULL,NULL,NULL,NULL),(18,'Excelen',NULL,NULL,NULL,NULL),(19,'Necesita mejor',NULL,NULL,NULL,NULL),(20,'Buen desempeño en',NULL,NULL,NULL,NULL),(21,'Excelente servicio técnico',NULL,NULL,NULL,NULL),(22,'Excelente en',NULL,NULL,NULL,NULL),(23,'Buen manejo',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `desempenio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `idempleado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `dni` varchar(45) NOT NULL,
  `cuil` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `tipo_empleado_idtipo_empleado` int(11) NOT NULL,
  `historial_academico_idhistorial_academico` int(11) NOT NULL,
  `dato_laboral_iddato_laboral` int(11) NOT NULL,
  PRIMARY KEY (`idempleado`),
  KEY `fk_empleado_tipo_empleado_idx` (`tipo_empleado_idtipo_empleado`),
  KEY `fk_empleado_historial_academico1_idx` (`historial_academico_idhistorial_academico`),
  KEY `fk_empleado_dato_laboral1_idx` (`dato_laboral_iddato_laboral`),
  CONSTRAINT `fk_empleado_dato_laboral1` FOREIGN KEY (`dato_laboral_iddato_laboral`) REFERENCES `dato_laboral` (`iddato_laboral`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_empleado_historial_academico1` FOREIGN KEY (`historial_academico_idhistorial_academico`) REFERENCES `dato_academico` (`idhistorial_academico`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_empleado_tipo_empleado` FOREIGN KEY (`tipo_empleado_idtipo_empleado`) REFERENCES `tipo_empleado` (`idtipo_empleado`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'Juan','Pérez','30123456','20-30123456-7','juan.perez@example.com',2,1,1),(2,'María','García','30234567','27-30234567-4','maria.garcia@example.com',1,2,2),(3,'Carlos','López','30345678','20-30345678-1','carlos.lopez@example.com',1,3,3),(4,'Ana','González','30456789','27-30456789-8','ana.gonzalez@example.com',3,4,4),(5,'Luis','Rodríguez','30567890','20-30567890-5','luis.rodriguez@example.com',1,5,5),(6,'Laura','Fernández','30678901','27-30678901-2','laura.fernandez@example.com',1,2,6),(7,'José','Martínez','30789012','20-30789012-9','jose.martinez@example.com',1,3,7),(8,'Lucía','Sánchez','30890123','27-30890123-6','lucia.sanchez@example.com',2,20,8),(9,'Pablo','Ramírez','30901234','20-30901234-3','pablo.ramirez@example.com',3,19,9),(10,'Marta','Torres','31012345','27-31012345-0','marta.torres@example.com',4,18,10),(11,'Jorge','Díaz','31123456','20-31123456-7','jorge.diaz@example.com',5,17,11),(12,'Clara','Vázquez','31234567','27-31234567-4','clara.vazquez@example.com',6,16,12),(13,'Ricardo','Castro','31345678','20-31345678-1','ricardo.castro@example.com',8,15,13),(14,'Sofía','Romero','31456789','27-31456789-8','sofia.romero@example.com',7,20,14),(15,'Andrés','Suárez','31567890','20-31567890-5','andres.suarez@example.com',4,18,15),(19,'Alberto','Hernández','31901234','20-31901234-3','alberto.hernandez@example.com',19,14,19),(20,'Julia','Muñoz','32012345','27-32012345-0','julia.munoz@example.com',18,13,20),(21,'Gonzalo','Álvarez','32123456','20-32123456-7','gonzalo.alvarez@example.com',17,12,21),(22,'Teresa','Pardo','32234567','27-32234567-4','teresa.pardo@example.com',9,1,22),(23,'Fernando','Rivas','32345678','20-32345678-1','fernando.rivas@example.com',5,2,23),(24,'Paula','Vega','32456789','27-32456789-8','paula.vega@example.com',15,3,24),(25,'Santiago','Ortiz','32567890','20-32567890-5','santiago.ortiz@example.com',11,4,25),(26,'Cristina','León','32678901','27-32678901-2','cristina.leon@example.com',8,5,26),(27,'Javier','Cabrera','32789012','20-32789012-9','javier.cabrera@example.com',4,6,27),(28,'Natalia','Soto','32890123','27-32890123-6','natalia.soto@example.com',3,7,28),(29,'Diego','Aguirre','32901234','20-32901234-3','diego.aguirre@example.com',2,8,29),(30,'Rosa','Molina','33012345','27-33012345-0','rosa.molina@example.com',14,9,30),(31,'Manuel','Salazar','33123456','20-33123456-7','manuel.salazar@example.com',13,15,31),(32,'Valeria','Navarro','33234567','27-33234567-4','valeria.navarro@example.com',12,14,32),(33,'Pedro','Méndez','33345678','20-33345678-1','pedro.mendez@example.com',12,11,33),(34,'Sandra','Hidalgo','33456789','27-33456789-8','sandra.hidalgo@example.com',15,20,34),(35,'Antonio','Reyes','33567890','20-33567890-5','antonio.reyes@example.com',18,19,35),(36,'Marta','Campos','33678901','27-33678901-2','marta.campos@example.com',20,11,36),(37,'Eduardo','Pizarro','33789012','20-33789012-9','eduardo.pizarro@example.com',1,20,37),(38,'Clara','Silva','33890123','27-33890123-6','clara.silva@example.com',2,10,38),(39,'Miguel','Montes','33901234','20-33901234-3','miguel.montes@example.com',3,10,39);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubro`
--

DROP TABLE IF EXISTS `rubro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubro` (
  `idrubro` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  `salario` float NOT NULL,
  PRIMARY KEY (`idrubro`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro`
--

LOCK TABLES `rubro` WRITE;
/*!40000 ALTER TABLE `rubro` DISABLE KEYS */;
INSERT INTO `rubro` VALUES (8,'Diseñador Gráfico',600),(9,'Ejecutivo de Cuentas',750),(10,'Supervisor de Ventas',850),(11,'Contador',950),(12,'Asistente Administrativo',650),(13,'Vendedor',600),(14,'Representante de Atención al Cliente',620),(15,'Community Manager',600),(16,'Encargado de Logística',630),(17,'Analista de Datos',700),(18,'Jefe de Producción',989),(19,'Técnico de Mantenimiento',700),(20,'Recepcionista',650);
/*!40000 ALTER TABLE `rubro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_ausencia`
--

DROP TABLE IF EXISTS `tipo_ausencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_ausencia` (
  `idtipo_ausencia` int(11) NOT NULL AUTO_INCREMENT,
  `motivo` varchar(45) NOT NULL,
  PRIMARY KEY (`idtipo_ausencia`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_ausencia`
--

LOCK TABLES `tipo_ausencia` WRITE;
/*!40000 ALTER TABLE `tipo_ausencia` DISABLE KEYS */;
INSERT INTO `tipo_ausencia` VALUES (1,'Ausencia justificada'),(2,'Ausencia injustificada'),(3,'Ausencia por enfermedad'),(4,'Ausencia por accidente'),(5,'Ausencia por maternidad/paternidad'),(6,'Ausencia por motivos personales'),(7,'Ausencia por duelo'),(8,'Ausencia por vacaciones'),(9,'Ausencia por formación o capacitación'),(10,'Ausencia por permisos especiales'),(11,'Ausencia por cita médica'),(12,'Ausencia por traslado o mudanza'),(13,'Ausencia por asuntos legales'),(14,'Ausencia por huelga'),(15,'Ausencia por inclemencias del tiempo'),(16,'Ausencia por problemas de transporte'),(17,'Ausencia por licencia sabática'),(18,'Ausencia por servicio militar'),(19,'Ausencia por reuniones familiares'),(20,'Ausencia por eventos deportivos');
/*!40000 ALTER TABLE `tipo_ausencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_empleado`
--

DROP TABLE IF EXISTS `tipo_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_empleado` (
  `idtipo_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idtipo_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_empleado`
--

LOCK TABLES `tipo_empleado` WRITE;
/*!40000 ALTER TABLE `tipo_empleado` DISABLE KEYS */;
INSERT INTO `tipo_empleado` VALUES (1,'Asalariados'),(2,'Por horas'),(3,'Comisionados'),(4,'Temporales'),(5,'Contratistas independientes'),(6,'A medio tiempo'),(7,'A tiempo completo'),(8,'Pasantes'),(9,'Teletrabajadores'),(10,'Subcontratados'),(11,'Empleados de temporada'),(12,'Freelancers'),(13,'Empleados de prácticas'),(14,'Empleados de agencia'),(15,'Empleados de proyecto'),(16,'Empleados de reemplazo'),(17,'Consultores'),(18,'Empleados bajo contrato fijo'),(19,'Empleados con contrato indefinido'),(20,'Empleados con horarios flexibles');
/*!40000 ALTER TABLE `tipo_empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_estado`
--

DROP TABLE IF EXISTS `tipo_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_estado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_estado`
--

LOCK TABLES `tipo_estado` WRITE;
/*!40000 ALTER TABLE `tipo_estado` DISABLE KEYS */;
INSERT INTO `tipo_estado` VALUES (1,'Activo'),(2,'Inactivo');
/*!40000 ALTER TABLE `tipo_estado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-01  1:07:13
