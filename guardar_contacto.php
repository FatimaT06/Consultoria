<?php
include("conexion.php");

$nombre        = $_POST['nombre'];
$correo        = $_POST['correo'];
$tipo_servicio = $_POST['tipo_servicio'];

$sql = "INSERT INTO contactos (nombre, correo, tipo_servicio) 
        VALUES ('$nombre', '$correo', '$tipo_servicio')";

if ($conn->query($sql) === TRUE) {
    echo "¡Contacto guardado exitosamente!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
