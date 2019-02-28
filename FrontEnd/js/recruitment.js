let i = 1
document.getElementById('button-recruitment').addEventListener('click', function () {
  if (i == 1) {
    this.innerHTML = 'Ocultar'
    i = 2
  } else {
    this.innerHTML = 'Contratar'
    i = 1
  }
})