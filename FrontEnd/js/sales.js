document.getElementById('submit').addEventListener('click', loadDoc)
let employees = {}
let html = ''
let list = document.getElementById('edit')

function loadDoc() {
  var xhttp = new XMLHttpRequest()
  let date = {
    month: document.getElementById('month-select').value,
    year: document.getElementById('year-select').value
  }
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      employees = JSON.parse(this.responseText)
      console.log(employees)
      loadHtml()
    }
  }
  xhttp.open('GET', '../../BackEnd/list.php?date=' + JSON.stringify(date), true)
  xhttp.send()
}

function loadHtml() {
  for (let index = 0; index < employees.length; index++) {
    html += "<tr><th scope='row'>" + (index + 1) + '</th><td>' + employees[index].first_name + '</td><td>' + employees[index].last_name + '</td><td>' + employees[index].cc + '</td>'
    html += '<td><input  class="form-control" type="number" id="sale' + index + '"></td><td><input class="btn btn-secondary" type="button" onclick="saveSale(' + index + ')" value="Guardar"></td></tr>'
  }
  list.innerHTML = html
  html = ''
}

function saveSale(index) {
  console.log(document.getElementById('sale' + index).value)
  let data = {
    amount: document.getElementById('sale' + index).value,
    cc: employees[index].cc,
    month: document.getElementById('month-select').value,
    year: document.getElementById('year-select').value
  }
  if (data.amount == '') {
    return "eror"
  } else {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        alert('Se ha guardado correctamente')
        loadDoc()
      }
    }
    xhttp.open('GET', '../../BackEnd/sales.php?data=' + JSON.stringify(data), true)
    xhttp.send()
  }
}
let busqueda = "INSERT INTO `sales` (`id`, `month`, `year`, `amount`, `employee_id`, `created_at`) VALUES (NULL, 'frebruary', '2018', '2000000', '1', CURRENT_TIMESTAMP)"
let query = "SELECT * FROM `employees` JOIN sales WHERE `sales`.`month` = 'february' and `sales`.`year` = '2018'"