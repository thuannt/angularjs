<?php
$user = [
    "username"=>"admin",
    "password"=>"123456",
    "name"=>"Nguyen Trong Thuan"
];
$action = $_POST['act'];
switch($action){
    case "login":
        login();
        break;
}

function login(){
    global $user;
    $data = [];
    $username = $_POST['username'];
    $password = $_POST['password'];
    if($username == $user['username'] && $password == $user['password']){
        $data=[
            "status"=>1,
            "message"=>null,
            "data"=>$user
        ];
    }else{
        $data=[
            "status"=>0,
            "message"=>"Username or password is invalid!",
            "data"=>null
        ];
    }
    echo json_encode($data);

}