function editNav () {
  const x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

function mettreDateDuJour () {
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
}
mettreDateDuJour()

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')
const btnClose = document.getElementsByClassName('close')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))
btnClose[0].addEventListener('click', closeModal)

class Erreur {
  constructor (id, message, presenceErreur, idErreur) {
    this.id = id
    this.message = message
    this.presenceErreur = presenceErreur
    this.idErreur = idErreur
  }
}
let tErreurs = []
let ePrenom = new Erreur('idPrenom', 'Merci de saisir minimum deux caractères pour le prénom', false, 'idPrenomErreur')
let eNom = new Erreur('idNom', 'Merci de saisir minimum deux caractères pour le Nom', false, 'idNomErreur')
let eMail = new Erreur('idEmail', 'Merci de saisir une adresse e-mail valide', false, 'idEmailErreur')
let eDate = new Erreur('idDate', 'Merci de saisir une date de naissance', false, 'idDateErreur')
let eConditions = new Erreur('idCheckboxConditions', 'Merci accepter les conditions utilisation', false, 'idCheckboxConditionsErreur')

tErreurs.push(ePrenom)
tErreurs.push(eNom)
tErreurs.push(eMail)
tErreurs.push(eDate)
tErreurs.push(eConditions)

function montreErreur (eErreur, checkbox = false) {
  const elt = document.getElementById(eErreur.id)
  const eltParent = elt.parentElement
  const erreur = document.createElement('label')
  erreur.classList.add('erreur')
  erreur.innerHTML = eErreur.message
  elt.style.border = '3px solid red'
  erreur.id = eErreur.idErreur
  eltParent.appendChild(erreur)

  if (checkbox) {
    elt.style.backgroundColor = 'red'
  } else {
    
  }
}
function fermeErreur (id, checkbox = false) {
  const elt = document.getElementById(id)
  const eltParent = elt.parentElement
  const erreur = document.getElementById(id + 'Erreur')
  eltParent.removeChild(erreur)

  if (checkbox) {
    elt.style.backgroundColor = '#279e7a'
  } else {
    elt.style.border = '0.8px solid #ccc'
  }
}

function verificationChamp (idChamp, contenuChamp) {
  if (contenuChamp === '' || contenuChamp.length < 2) {
    for (let i = 0; i < tErreurs.length; i++) {
      if (tErreurs[i].id === idChamp && !tErreurs[i].presenceErreur) {
        tErreurs[i].presenceErreur = true
        montreErreur(tErreurs[i])
        break
      }
    }
  } else {
    for (let i = 0; i < tErreurs.length; i++) {
      if (tErreurs[i].id === idChamp && tErreurs[i].presenceErreur) {
        tErreurs[i].presenceErreur = false
        fermeErreur(tErreurs[i].id)
        break
      }
    }
  }
}

function presenceErreurChamp () {
  let bErreur = false
  for (let i = 0; i < tErreurs.length; i++) {
    if (tErreurs[i].presenceErreur && !bErreur) {
      bErreur = true
      break
    }
  }
  return bErreur
}

function verificationFormulaire () {
  const prenom = document.getElementById('idPrenom')
  const nom = document.getElementById('idNom')
  const email = document.getElementById('idEmail')
  const date = document.getElementById('idDate')
  const tournois = document.getElementById('idTournois')
  const conditions = document.getElementById('checkbox1').checked
  
  verificationChamp(prenom.id, prenom.value)
  verificationChamp(nom.id, nom.value)
  verificationChamp(email.id, email.value)
  verificationChamp(date.id, date.value)
  
  /*if (!conditions) {
    montreErreur('idCheckboxConditions', 'Merci accepter les conditions utilisation', true)
  } else {
    fermeErreur('idCheckboxConditions', true)
  }*/

  return !presenceErreurChamp()
  
}

// launch modal form
function launchModal () {
  modalbg.style.display = 'block'
}

// close modal form
function closeModal () {
  modalbg.style.display = 'none'
}
