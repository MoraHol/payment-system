document.getElementById('submit').addEventListener('click', listEmployees)
let list = document.getElementById('edit')
let employees = {}
let html = ''

function listEmployees() {
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
  xhttp.open('GET', '../../BackEnd/list.php?date=' + JSON.stringify(date) + '&sales=true', true)
  xhttp.send()
}

function loadHtml() {
  for (let index = 0; index < employees.length; index++) {
    let amount = employees[index].amount
    html += "<tr><th scope='row'>" + (index + 1) + '</th><td>' + employees[index].first_name + '</td><td>' + employees[index].last_name + '</td><td>' + employees[index].cc + '</td>'
    if (amount == null) {
      amount = 'No se ha registrado ventas'
      html += '<td>' + amount + '</td><td><input type="number" id="comision' + index + '"></td><td><span id="salary' + index + '"></span></td>'
      html += '</tr>'
    } else {
      html += '<td>' + amount + '</td><td><input type="number" id="comision' + index + '"></td><td><span id="salary' + index + '"></span></td>'
      html += '<td><button id="save' + index + '" class="btn btn-success">Guardar</button></td></tr>'
    }
  }
  list.innerHTML = html
  html = ''
  loadCalculate()
}

function loadCalculate() {
  for (let index = 0; index < employees.length; index++) {
    document.getElementById('comision' + index).onchange = function () {
      let salary = calculateSalary(parseInt(employees[index].amount), parseInt(this.value))
      if (isNaN(salary)) {
        document.getElementById('salary' + index).innerHTML = 'No se puede asignar sueldo'
      } else {
        document.getElementById('salary' + index).innerHTML = salary
      }
    }
    document.getElementById('save' + index).onclick = function () {
      let data = {
        month: document.getElementById('month-select').value,
        year: document.getElementById('year-select').value,
        cc: employees[index].cc,
        amount: document.getElementById('salary' + index).innerHTML,
        comision: document.getElementById('comision' + index).value
      }
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          alert(this.responseText)
        }
      }
      xhttp.open('GET', '../../BackEnd/payroll.php?data=' + JSON.stringify(data), true)
      xhttp.send()
    }
  }
}

function calculateSalary(value, comison) {
  return value * comison / 100
}