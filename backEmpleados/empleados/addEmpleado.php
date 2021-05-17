<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
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
        $stmt 	= $pdo->query("insert into usu_usuario (nombre,fechaNacimiento,pais,nombreUsuario,fechaContratacion,estado,area,cargo,comision) 
        VALUES ('$nombre','$fechaNacimiento','$pais','$nombreUsuario','$fechaContratacion','Activo','$area','$cargo','$comision')");
        
            $data[] = "ok";
        
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

