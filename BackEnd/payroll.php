<?php
require('DB/DBOperator.php');
$DB = new DBOperator('localhost', 'root', 'company', '');
$data = json_decode($_GET['data']);
$query = "INSERT INTO `payrolls` (`id`, `month`, `year`, `amount`, `employee_id`,`comision`) VALUES (NULL, '" . $data->month . "', '" . $data->year . "', '" . $data->amount . "', (SELECT id FROM employees WHERE cc = '" . $data->cc . "' LIMIT 1),'" . $data->comision . "')";

$arr = $DB->consult($query);
echo json_encode($arr);
