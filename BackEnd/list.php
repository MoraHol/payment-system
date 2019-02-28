<?php
require('DB/DBOperator.php');
$DB = new DBOperator('localhost', 'root', 'company', '');
if (isset($_GET['sales']) && isset($_GET['date'])) {
    $date = json_decode($_GET['date']);
    $query = "SELECT `employees`.`cc`, `employees`.`first_name`, employees.last_name, sales.amount AS amount FROM `employees` LEFT JOIN sales ON `sales`.`month` = '" . $date->month . "' and `sales`.`year` = '" . $date->year . "' and active != 0 and employees.id = sales.employee_id";
} elseif (isset($_GET['date'])) {
    $date = json_decode($_GET['date']);
    $query = "SELECT `employees`.`cc`, `employees`.`first_name`, employees.last_name FROM `employees` LEFT JOIN sales ON `sales`.`month` = '" . $date->month . "' and `sales`.`year` = '" . $date->year . "' and active != 0 and employees.id = sales.employee_id WHERE sales.employee_id IS NULL";
} else {
    $query = "SELECT * FROM `employees` WHERE `active` != '0'";
}
$arr = $DB->consult($query, 'yes');
echo json_encode($arr);
