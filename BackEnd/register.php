<?php
require('DB/DBOperator.php');
$employee = json_decode($_GET['employee']);
$db = new DBOperator('localhost', 'root', 'company', '');
$query = "INSERT INTO `employees` (`id`, `cc`, `first_name`, `last_name`) VALUES (NULL, '".$employee->identification . "', '".$employee->firstName . "', '".$employee->lastName . "')";
$db->consult($query);