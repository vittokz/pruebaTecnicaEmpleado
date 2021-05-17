<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);

$id = filter_var($obj->id, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
try {
   $stmt 	= $pdo->query("DELETE FROM usu_usuario WHERE id like '$id'");
  
       $data[] = 'ok';
  
   // retorno datos en JSON
}
catch(PDOException $e)
{
   echo $e->getMessage();
}
echo json_encode($data);

?>