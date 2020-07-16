<?php

$con = new mysqli("localhost", "root", "", "crud_vue");

if($con->connect_error){
	die("Connection Failed".$con->connect_error);
}

$result	= array('error'=>false);
$action = "";

if(isset($_GET['action'])){
	$action = $_GET['action'];
}

if($action == 'read'){
	$sql = $con->query("SELECT * FROM users");
	$users = array();
	while ($row = $sql->fetch_assoc()) {
		array_push($users, $row);
	}
	$result['users'] = $users;
}

if($action == 'create'){
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];

	$sql = $con->query("INSERT INTO users (name, email, phone) VALUES ('$name', '$email', '$phone') ");

	if($sql){
		$result['message'] = "User Added Successfully";
	} else {
		$result['error'] = true;
		$result['message'] = "Failed to add new user!";
	}
}

if($action == 'update'){
	$id = $_POST['id'];
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];

	$sql = $con->query("UPDATE users SET name='$name', email='$email', phone='$phone' WHERE id='$id'");

	if($sql){
		$result['message'] = "User Updated Successfully";
	} else {
		$result['error'] = true;
		$result['message'] = "Failed to update user!";
	}
}

if($action == 'delete'){
	$id = $_POST['id'];

	$sql = $con->query("DELETE FROM users WHERE id='$id'");

	if($sql){
		$result['message'] = "User Deleted Successfully";
	} else {
		$result['error'] = true;
		$result['message'] = "Failed to delete user!";
	}
}

$con->close();
echo json_encode($result);

