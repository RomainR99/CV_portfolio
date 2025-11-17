function HistoricEvent() {
    const adresseUrl = 'https://history.muffinlabs.com/date'; /* Déclaration de l'URL pour récupérer les événements historiques via une API publique */
    /* L'appel fetch pour récupérer des données de l'API via HTTP (url) */
    fetch(adresseUrl)
        .then(res => res.json()) /* La réponse de l'API est transformée en JSON */
        .then(data => { /* if true on traite les données récupérées */
            const conteneurHistoricEvent = document.querySelector('#historic_event');
            /* Sélection du conteneur HTML avec l'id 'historic_event' où l'événement sera affiché */
            if (data.data && data.data.Events.length > 0) { /* Vérifie que les données existent et que la liste des événements n'est pas vide */
                const event = data.data.Events[Math.floor(Math.random() * data.data.Events.length)]; //un historic_event random sélectionne un événement aléatoire parmi ceux présents dans la réponse
                /*  Met à jour le contenu du conteneur avec les informations de l'événement choisi */
                conteneurHistoricEvent.innerHTML = ` 
                    <p class="annee_historic_event">Année : ${event.year}</p>
                    <p class="text_historic_event">${event.text}</p>
                `;
            } else { /* Si aucun événement n'est trouvé */
                conteneurHistoricEvent.innerText = "Pas d'évènement historique marquant pour aujourd'hui. Revenez demain ! "; 
                /*  Affiche un message indiquant qu'il n'y a pas d'événement à afficher */
            }
        })
        .catch(error => { /* Si une erreur se produit lors de la récupération ou du traitement des données */
            /*  Affiche l'erreur dans la console pour aider au débogage */
            console.error("Erreur : Impossible de charger l'évènement historique :", error);
            /* Affiche un message d'erreur à l'utilisateur dans le conteneur */
            document.querySelector('#historic_event').innerText = "Impossible de charger l'évènement historique.";
        });
}
export default HistoricEvent; /* Exportation de la fonction HistoricEvent pour pouvoir l'utiliser ailleurs dans l'application import */