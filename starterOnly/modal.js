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
const modalBody = document.getElementsByClassName('modal-body')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))
btnClose[0].addEventListener('click', closeModal)

class Erreur {
  constructor (id, message, presenceErreur, idErreur, typeErreur) {
    this.id = id
    this.message = message
    this.presenceErreur = presenceErreur
    this.idErreur = idErreur
    this.typeErreur = typeErreur
  }
}
const tErreurs = []
const ePrenom = new Erreur('idPrenom', 'Merci de saisir minimum deux caractères pour le prénom', false, 'idPrenomErreur', 'saisie')
const eNom = new Erreur('idNom', 'Merci de saisir minimum deux caractères pour le Nom', false, 'idNomErreur', 'saisie')
const eMail = new Erreur('idEmail', 'Merci de saisir une adresse e-mail valide', false, 'idEmailErreur', 'email')
const eDate = new Erreur('idDate', 'Merci de saisir une date de naissance', false, 'idDateErreur', 'date')
const eConditions = new Erreur('idCheckboxConditions', 'Merci accepter les conditions utilisation', false, 'idCheckboxConditionsErreur', 'checkbox')
const eLocations = new Erreur('location6', 'Merci de choisir une ville', false, 'idLocationErreur', 'location')

tErreurs.push(ePrenom)
tErreurs.push(eNom)
tErreurs.push(eMail)
tErreurs.push(eDate)
tErreurs.push(eConditions)
tErreurs.push(eLocations)

function montreErreur (eErreur) {
  const elt = document.getElementById(eErreur.id)
  const eltParent = elt.parentElement
  const erreur = document.createElement('label')
  erreur.classList.add('erreur')
  erreur.innerHTML = eErreur.message
  erreur.id = eErreur.idErreur
  eltParent.appendChild(erreur)

  if (eErreur.typeErreur !== 'checkbox') {
    elt.style.border = '3px solid red'
  }
}
function fermeErreur (eErreur) {
  const elt = document.getElementById(eErreur.id)
  const eltParent = elt.parentElement
  const erreur = document.getElementById(eErreur.idErreur)
  eltParent.removeChild(erreur)

  if (eErreur.typeErreur !== 'checkbox') {
    elt.style.border = '0.8px solid #ccc'
  }
}

function verificationChamp (idChamp, contenuChamp = '') {
  let bErreur = false
  for (let i = 0; i < tErreurs.length; i++) {
    if (tErreurs[i].id === idChamp) {
      switch (tErreurs[i].typeErreur) {
        case 'saisie' :
          if (contenuChamp === '' || contenuChamp.length < 2) {
            bErreur = true
          }
          break

        case 'email' :
          let bValide = false
          for (let j = 0; j < (contenuChamp.length); j++) {
            if (contenuChamp.charAt(j) === '@') {
              if (j < (contenuChamp.length - 4)) {
                for (let k = j; k < (contenuChamp.length - 2); k++) {
                  if (contenuChamp.charAt(k) === '.') {
                    bValide = true
                    break
                  }
                }
              }
            }
          }
          bErreur = !bValide
          break

        case 'date' :
          let dateValide = Date.parse(contenuChamp)
          if (isNaN(dateValide)) {
            bErreur = true
          }
          break

        case 'checkbox' :
          if (!document.getElementById(idChamp).checked) {
            bErreur = true
          }
          break
        case 'location' :
          const eLocations = document.getElementsByName('location')
          let bCoche = false
          for (let j = 0; j < eLocations.length; j++) {
            if (eLocations[j].checked) {
              bCoche = true
              break
            }
          }
          bErreur = !bCoche
          break
      }
      if (bErreur) {
        if (!tErreurs[i].presenceErreur) {
          tErreurs[i].presenceErreur = true
          montreErreur(tErreurs[i])
          break
        }
      } else {
        if (tErreurs[i].presenceErreur) {
          tErreurs[i].presenceErreur = false
          fermeErreur(tErreurs[i])
          break
        }
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
  const conditions = document.getElementById('idCheckboxConditions')

  verificationChamp(prenom.id, prenom.value)
  verificationChamp(nom.id, nom.value)
  verificationChamp(email.id, email.value)
  verificationChamp(date.id, date.value)
  verificationChamp(conditions.id)
  verificationChamp('location6')

  if (presenceErreurChamp()) {
    return false
  } else {
    afficheMessageConfirmation()
  }
}

// launch modal form
function launchModal () {
  
  modalbg.style.display = 'block'
}

// close modal form
function closeModal () {
  window.location.reload()
}

function afficheMessageConfirmation () {
  const eForm = document.getElementById('idFormReserve')
  const eltParent = eForm.parentElement
  // Suppression du formulaire reserve
  eltParent.removeChild(eForm)

  // Création de l'élément p pour le message de confirmation d'envoi
  const eMessageConfirmation = document.createElement('p')
  eMessageConfirmation.innerHTML = 'Merci ! Votre réservation a été reçue.'
  eltParent.appendChild(eMessageConfirmation)

  // Création du bouton fermer qui permet de fermer le formulaire
  const eBoutonFermer = document.createElement('button')
  eBoutonFermer.classList.add('btn-submit')
  eBoutonFermer.classList.add('btn-close')
  eBoutonFermer.innerHTML = 'Fermer'
  eltParent.appendChild(eBoutonFermer)
}
