let employees = {}
let html = ''
let list = document.getElementById('edit')
document.getElementById('submit').addEventListener('click', loadDoc)

function loadDoc() {
  var xhttp = new XMLHttpRequest()
  let date = {
    month: document.getElementById('month-select').value,
    year: document.getElementById('year-select').value
  }
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      employees = JSON.parse(this.responseText)
      loadHtml()
    }
  }
  xhttp.open('GET', '../../BackEnd/history.php?date=' + JSON.stringify(date), true)
  xhttp.send()
}

function loadHtml() {
  if(employees.length == 0){
    alert("no se han registrado pagos a esta fecha")
  }
  for (let index = 0; index < employees.length; index++) {
    html += "<tr><th scope='row'>" + (index + 1) + '</th><td>' + employees[index].first_name + '</td><td>' + employees[index].last_name + '</td><td>' + employees[index].cc + '</td>'
    html += '<td>' + employees[index].vendido + '</td><td>' + employees[index].comision + ' %</td><td>' + employees[index].amount + '</td></tr>'
  }
  list.innerHTML = html
  html = ''
}
