/* Classe Erreur prenant en paramètres :
id : chaine de caractères correspondant à l'id CSS du champ
message : chaine de caractères correspondant au message d'erreur personnalisé du champ
presenceErreur : booléen à faux par défaut correspondant à la présence ou non d'une erreur sur le champ
idErreur : chaine de caractères correspondant au label créer pour afficher le message d'erreur
typeErreur : chaine de caractères parmis 5 choix : saisie, email, date, checkbox et location
*/
class Erreur {
  constructor (id, message, presenceErreur, idErreur, typeErreur) {
    this.id = id
    this.message = message
    this.presenceErreur = presenceErreur
    this.idErreur = idErreur
    this.typeErreur = typeErreur
  }
}

// tableau comprenant les erreurs
const tErreurs = []

// Nouvel objet pour chaque erreur
const ePrenom = new Erreur('idPrenom', 'Merci de saisir minimum deux caractères pour le prénom', false, 'idPrenomErreur', 'saisie')
const eNom = new Erreur('idNom', 'Merci de saisir minimum deux caractères pour le nom', false, 'idNomErreur', 'saisie')
const eMail = new Erreur('idEmail', 'Merci de saisir une adresse e-mail valide', false, 'idEmailErreur', 'email')
const eDate = new Erreur('idDate', 'Merci de saisir une date de naissance', false, 'idDateErreur', 'date')
const eConditions = new Erreur('idCheckboxConditions', 'Merci d\'accepter les conditions d\'utilisation', false, 'idCheckboxConditionsErreur', 'checkbox')
const eLocations = new Erreur('location6', 'Merci de choisir une ville', false, 'idLocationErreur', 'location')

// remplissage du tableau avec chaque erreur
tErreurs.push(ePrenom)
tErreurs.push(eNom)
tErreurs.push(eMail)
tErreurs.push(eDate)
tErreurs.push(eConditions)
tErreurs.push(eLocations)

function editNav () { // eslint-disable-line no-unused-vars
  const x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

const titre = document.getElementsByTagName('h1')

function redimensionnement () {
  if ((window.matchMedia('(min-width : 800px)').matches) && (window.matchMedia('(max-width : 1020px)').matches)) {
    titre[0].innerHTML = 'Marathon <br> national <br> de jeux vidéos'
  } else {
    titre[0].innerHTML = 'Marathon national <br> de jeux vidéos'
  }
}

window.addEventListener('resize', redimensionnement, false)

redimensionnement()

// Fonction permettant de griser le calendrier
// à toute date supérieure à la date du jour dans le champ date de naissance
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
const formData = document.querySelectorAll('.formData') // eslint-disable-line no-unused-vars
const close = document.getElementsByClassName('close')
const btnClose = document.getElementsByClassName('btn-close')
const modalBody = document.getElementsByClassName('modal-body') // eslint-disable-line no-unused-vars

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))
close[0].addEventListener('click', closeModal)

// Fonction permettant de créer dans le DOM
// un label contenant le message d'erreur
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

// Fonction permettant de supprimer du DOM
// le label créé auparavant
function fermeErreur (eErreur) {
  const elt = document.getElementById(eErreur.id)
  const eltParent = elt.parentElement
  const erreur = document.getElementById(eErreur.idErreur)
  eltParent.removeChild(erreur)

  if (eErreur.typeErreur !== 'checkbox') {
    elt.style.border = '0.8px solid #ccc'
  }
}

// Fonction qui vérifie selon le type de champ
// l'erreur correspondante
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

        case 'email' : {
          let bValide = false
          // boucle permettant de parcourir chaque caractère de l'email
          for (let j = 0; j < (contenuChamp.length); j++) {
            // Si on trouve un @
            if (contenuChamp.charAt(j) === '@') {
              if (j < (contenuChamp.length - 4)) {
                for (let k = j; k < (contenuChamp.length - 2); k++) {
                  // Si il y a un point après @
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
        }

        case 'date' : {
          // Fonction permettant de verifier si la date est valide
          // converti la date en nombre si elle est valide
          const dateValide = Date.parse(contenuChamp)
          if (isNaN(dateValide)) {
            bErreur = true
          }
          break
        }

        case 'checkbox' :
          if (!document.getElementById(idChamp).checked) {
            bErreur = true
          }
          break
        case 'location' : {
          const tabLocations = document.getElementsByName('location')
          let bCoche = false
          // Boucle qui parcourt tous les boutons radios
          // et qui vérifie si y en a un qui est coché
          for (let j = 0; j < tabLocations.length; j++) {
            if (tabLocations[j].checked) {
              bCoche = true
              break
            }
          }
          bErreur = !bCoche
          break
        }
      }
      if (bErreur) {
        // S'il n'y a pas déjà une erreur
        // On crée une erreur et on actualise l'objet
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

// Fonction qui parcourt tout le tableau d'erreurs
// et qui vérifie si une erreur est présente pour empêcher le formulaire
// d'être envoyé
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
// Cette fonction verifie si les champs sont rempli comme voulu
function verificationFormulaire () { // eslint-disable-line no-unused-vars
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
// Fonction qui permet l'affichage d'un message de confirmation
function afficheMessageConfirmation () {
  const eForm = document.getElementById('idFormReserve')
  const eltParent = eForm.parentElement
  // Suppression du formulaire reserve
  eltParent.removeChild(eForm)

  // Création de l'élément p pour le message de confirmation d'envoi
  const eMessageConfirmation = document.createElement('p')
  eMessageConfirmation.innerHTML = 'Merci ! Votre réservation a été reçue.'
  eMessageConfirmation.classList.add('confirmation-message')
  eltParent.appendChild(eMessageConfirmation)

  // Création du bouton fermer qui permet de fermer le formulaire
  const eBoutonFermer = document.createElement('button')
  eBoutonFermer.classList.add('btn-submit')
  eBoutonFermer.classList.add('btn-close')
  eBoutonFermer.innerHTML = 'Fermer'
  eltParent.appendChild(eBoutonFermer)
  btnClose[0].addEventListener('click', closeModal)
}
