<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $id	  = filter_var($obj->id, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombre	  = filter_var($obj->nombre, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $fechaNacimiento= filter_var($obj->fechaNacimiento, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $pais	  = filter_var($obj->pais, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombreUsuario	  = filter_var($obj->nombreUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $fechaContratacion= filter_var($obj->fechaContratacion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $estado	  = filter_var($obj->estado, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $area	  = filter_var($obj->area, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $cargo	  = filter_var($obj->cargo, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $comision	  = filter_var($obj->comision, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW); 
         
    try {
        $stmt 	= $pdo->query("update usu_usuario set nombre='$nombre',fechaNacimiento='$fechaNacimiento',pais='$pais',nombreUsuario='$nombreUsuario',fechaContratacion='$fechaContratacion',estado='$estado',area='$area',cargo='$cargo',comision='$comision' where id like '$id'"); 
      
            $data[] = "ok";
        
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

