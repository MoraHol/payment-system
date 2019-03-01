let i = false
let employees
let html = ''
let list = document.getElementById('edit')
document.getElementById('submit').addEventListener('click', register)
window.onload = function () {
  loadDoc()
}
document.getElementById('button-recruitment').addEventListener('click', function () {
  if (!i) {
    this.innerHTML = 'Ocultar'
    i = true
  } else {
    this.innerHTML = 'Contratar'
    i = false
  }
})

function register() {
  let employee = {
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    identification: document.getElementById('identification').value
  }
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('test').innerHTML = this.responseText
    }
  }
  xhttp.open('GET', '../../BackEnd/register.php?employee=' + JSON.stringify(employee), true)
  xhttp.send()
}

function loadDoc() {
  html = ''
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      employees = JSON.parse(this.responseText)
      loadHtml()
      loadDismiss()
    }
  }
  xhttp.open('GET', '../../BackEnd/list.php', true)
  xhttp.send()
}

function loadHtml() {
  for (let index = 0; index < employees.length; index++) {
    html += "<tr><th scope='row'>" + (index + 1) + '</th><td>' + employees[index].first_name + '</td><td>' + employees[index].last_name + '</td><td>' + employees[index].cc + '</td><td><button id="dismiss' + index + '" class="btn btn-danger">Despedir</button></td></tr>'
  }
  list.innerHTML = html
}

function loadDismiss() {
  for (let index = 0; index < employees.length; index++) {
    document.getElementById('dismiss' + index).addEventListener('click', function () {
      if (confirm('¿Esta seguro que desea despedir al empleado?')) {
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            loadDoc()
          }
        }
        xhttp.open('GET', '../../BackEnd/dismiss.php?id=' + employees[index].cc, true)
        xhttp.send()
      }
    })
  }
}
