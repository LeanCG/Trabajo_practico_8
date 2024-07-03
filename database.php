<?php
$servername = "localhost"; 
$username = "root";        
$password = "12345";      
$dbname = "recursohumano";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) { 
    die("Conexión fallida: " . $conn->connect_error); 
}
?>
