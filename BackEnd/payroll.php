<?php
require('DB/DBOperator.php');
$DB = new DBOperator('localhost', 'root', 'company', '');
$data = json_decode($_GET['data']);
$query = "INSERT INTO `payrolls` (`id`, `month`, `year`, `amount`, `employee_id`,`comision`) VALUES (NULL, '" . $data->month . "', '" . $data->year . "', '" . $data->amount . "', (SELECT id FROM employees WHERE cc = '" . $data->cc . "' LIMIT 1),'" . $data->comision . "')";

$arr = $DB->consult($query);
echo json_encode($arr);

SELECT * FROM (SELECT employees.id,`employees`.`cc`, `employees`.`first_name`, employees.last_name, sales.amount AS amount FROM `employees` LEFT JOIN sales ON `sales`.`month` = 'february' and `sales`.`year` = '2018' and employees.active != 0 and employees.id = sales.employee_id ORDER BY sales.amount desc ) as ventas left JOIN payrolls ON ventas.id = payrolls.employee_id WHERE payrolls.employee_id IS NULL