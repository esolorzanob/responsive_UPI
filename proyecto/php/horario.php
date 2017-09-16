<?php
$username = "root";
$password = "";
$servername = "127.0.0.1";
$dbname = "test";
$conn = new mysqli($servername, $username, $password, $dbname);
if($_POST["metodo"] == "selectID"){
    $sql = "select * from horarios where idhorarios =".$_POST["idhorarios"];
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "selectAll"){
    $sql = "select * from horarios";
    $horarios = array();
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($horarios, $row);
        }
        echo json_encode($horarios);
    }else{
        echo "Error";
    }
}else{
    if($_POST["metodo"] == "insert"){
        $sql = "insert into horarios (nombre) values ('"
        .$_POST["nombre"]."')";
    }else if($_POST["metodo"] == "update"){
        $sql = "update horarios set 
        nombre='".$_POST["nombre"]."'
        where idhorarios = ".$_POST["idhorarios"];
    }

    if($conn->query($sql) === TRUE){
        echo "Exito";
    }else{
        echo "Error";
    }

}

$conn->close();
?>