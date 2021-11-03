function editNav () {
  let x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

let dDate = new Date()
let dJour = dDate.getDate()
let dMois = dDate.getMonth() + 1
const dAnnee = dDate.getFullYear()

if (dJour < 10) {
  dJour = '0' + dJour
}

if (dMois < 10) {
  dMois = '0' + dMois
}

dDate = dAnnee + '-' + dMois + '-' + dJour
document.getElementById('idDate').setAttribute('max', dDate)

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')
const btnClose = document.getElementsByClassName('close')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))
btnClose[0].addEventListener('click', closeModal)

// launch modal form
function launchModal () {
  modalbg.style.display = 'block'
}

// close modal form
function closeModal () {
  modalbg.style.display = 'none'
}
