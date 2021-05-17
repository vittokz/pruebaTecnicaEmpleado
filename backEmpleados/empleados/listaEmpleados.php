<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);

$fecha_nacimiento = new DateTime("1998-01-25");
$hoy = new DateTime();
$edad = $hoy->diff($fecha_nacimiento);

try {
   $stmt 	= $pdo->query("SELECT * FROM usu_usuario order by fechaContratacion DESC");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
       $data[] = $row;
   }
   // retorno datos en JSON
}
catch(PDOException $e)
{
   echo $e->getMessage();
}
echo json_encode($data);

?>