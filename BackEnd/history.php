<?php
require('DB/DBOperator.php');
$DB = new DBOperator('localhost', 'root', 'company', '');
$date = json_decode($_GET['date']);
$query = "SELECT `employees`.`cc`, `employees`.`first_name`, employees.last_name, sales.amount AS vendido, payrolls.comision, payrolls.amount FROM `employees`, sales, payrolls WHERE `sales`.`month` = '" . $date->month . "' and `sales`.`year` = '" . $date->year . "' and payrolls.`month` = '" . $date->month . "' and payrolls.`year` = '" . $date->year . "' and employees.id = sales.employee_id and employees.id = payrolls.employee_id";
$arr = $DB->consult($query, 'yes');
echo json_encode($arr);