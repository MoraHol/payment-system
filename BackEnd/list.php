<?php
require('DB/DBOperator.php');
$DB = new DBOperator('localhost', 'root', 'company', '');
if (isset($_GET['sales']) && isset($_GET['date'])) {
    $date = json_decode($_GET['date']);
    $query = "SELECT ventas.id, ventas.cc,ventas.first_name, ventas.last_name, ventas.amount FROM (SELECT employees.id,`employees`.`cc`, `employees`.`first_name`, employees.last_name, sales.amount AS amount FROM `employees` LEFT JOIN sales ON `sales`.`month` = '" . $date->month . "' and `sales`.`year` = '" . $date->year . "' and employees.active != 0 and employees.id = sales.employee_id ORDER BY sales.amount desc ) as ventas left JOIN payrolls ON ventas.id = payrolls.employee_id WHERE payrolls.employee_id IS NULL ORDER BY ventas.amount DESC";
} elseif (isset($_GET['date'])) {
    $date = json_decode($_GET['date']);
    $query = "SELECT `employees`.`cc`, `employees`.`first_name`, employees.last_name FROM `employees` LEFT JOIN sales ON `sales`.`month` = '" . $date->month . "' and `sales`.`year` = '" . $date->year . "' and employees.active != 0 and employees.id = sales.employee_id WHERE sales.employee_id IS NULL";
} else {
    $query = "SELECT * FROM `employees` WHERE `active` != '0'";
}
$arr = $DB->consult($query, 'yes');
echo json_encode($arr);
