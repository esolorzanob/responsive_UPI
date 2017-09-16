<?php
$username = "root";
$password = "";
$servername = "127.0.0.1";
$dbname = "test";
$conn = new mysqli($servername, $username, $password, $dbname);
if($_POST["metodo"] == "select"){
    $sql = "select * from usuarios where username ='".$_POST["username"]."'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "selectID"){
    $sql = "select * from parqueos where idparqueos =".$_POST["idparqueos"];
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "solicitar"){
    $master = array();
    $sql = "select * from parqueos where areas_idAreas =".$_POST["area"];
    $parqueos = array();
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($parqueos, $row);
        }
        array_push($master, $parqueos);
    }else{
        array_push($master, $parqueos);
    }
    $sql = "select * from parqueoLibre where idhorarios ="
    .$_POST["turno"]." and fecha ='".$_POST["fecha"]."' and idareas ="
    .$_POST["area"];
   
    $parqueoLibre = array();
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($parqueoLibre, $row);
        }
        array_push($master, $parqueoLibre);
    }else{
        
        array_push($master, $parqueoLibre);
    }
    echo json_encode($master);
}else{
    if($_POST["metodo"] == "insert"){
        $sql = "insert into parqueos (numero, areas_idAreas) values ('"
        .$_POST["numero"]."',"
        .$_POST["area"].")";
    }else if($_POST["metodo"] == "update"){
        $sql = "update parqueos set 
        numero='".$_POST["numero"]."',
        areas_idAreas=".$_POST["area"]."
        where idparqueos = ".$_POST["idparqueos"];
    }

    if($conn->query($sql) === TRUE){
        echo "Exito";
    }else{
        echo "Error";
    }

}

$conn->close();
?>