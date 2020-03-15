$(document).ready(function() {
	//alert("hi");
	//console.log('hi');
	var libelle = $('#libelle'),
		quantite = $('#quantite'),
		description = $('#description'),
	    date = $('#date'),
		envoi = $('#envoi'),
		reset = $('#rafraichir'),
		erreur = $('#erreur').css('display', 'none')
	fcontrol = $('.form-control');
	fcontrol.keyup(function () {
		if ($(libelle).val().length < 5 || $(libelle).val().length > 10) {
			alert("libelle doit etre entre 5 et 10 caracteres !!")
		}
		else if  ($(quantite).val()< 0 || $(quantite).val() > 999) {
			alert("quantite doit etre entre 0 et 999  !!")
		}
		else if  ($(date).val().length !== 10) {
			alert("date  doit etre de 10 caracteres  !!")
		}
		else if  ($(description).val().length > 20) {
			alert("description ne doit pas depasser les 20 caracteres  !!")
		}

	});
	envoi.click(function(e){

			if ($(libelle).val().length < 5 || $(libelle).val().length > 10) {
				e.preventDefault();
				alert("libelle doit etre entre 5 et 10 caracteres !!")

			}
			else if  ($(quantite).val() < 0 || $(quantite).val() > 999) {
				e.preventDefault();
				alert("quantite doit etre entre 0 et 999  !!")
			}
			else if  ($(date).val().length !== 10) {
				e.preventDefault();
				alert("date  doit etre de 10 caracteres  !!")
			}
			else if  ($(description).val().length > 20) {
				e.preventDefault();
				alert("description ne doit pas depasser les 20 caracteres  !!")
			}


		if(fcontrol.val() == "") {
			e.preventDefault(); // on annule la fonction par défaut du bouton d'envoi

			// puis on lance la fonction de vérification sur tous les champs :
			verifier(libelle);
			verifier(quantite);
			verifier(description);
			verifier(date);
		}
	});

	reset.click(function(){
		fcontrol.css({ // on remet le style des champs comme on l'avait défini dans le style CSS
			borderColor : '#ccc',
			color : '#555'
		});
		erreur.css('display', 'none'); // on prend soin de cacher le message d'erreur
	});

	function verifier(fcontrol){
		if(fcontrol.val() == ""){ // si le champ est vide
			erreur.css('display', 'block'); // on affiche le message d'erreur
			fcontrol.css({ // on rend le champ rouge
				borderColor : 'red',
				color : 'red'
			});
		}
	}
});



// if($(this).val() != $mdp.val()){ // si la confirmation est différente du mot de passe
