<?php
require('DB/DBOperator.php');
$DB = new DBOperator('localhost', 'root', 'company', '');
$id = $_GET['id'];
$query = "UPDATE `employees` SET `active` = '0' WHERE `employees`.`cc` = '".$id."'";
$arr = $DB->consult($query);
echo json_encode($arr);