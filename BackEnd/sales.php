<?php
require('DB/DBOperator.php');
$DB = new DBOperator('localhost', 'root', 'company', '');
$data = json_decode($_GET['data']);
$query = "INSERT INTO `sales` (`id`, `month`, `year`, `amount`, `employee_id`) VALUES (NULL, '" . $data->month . "', '".$data->year."', '".$data->amount."', (SELECT id FROM employees WHERE cc = '".$data->cc."' LIMIT 1))";
echo $query;
$arr = $DB->consult($query);
echo json_encode($arr);
