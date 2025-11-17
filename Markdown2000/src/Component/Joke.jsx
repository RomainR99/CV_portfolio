import { useState, useEffect } from "react";

const Joke = () => { /* Déclaration du composant fonctionnel Joke */
  const [joke, setJoke] = useState("Chargement...");

  useEffect(() => { /*  Utilisation du hook useEffect pour effectuer une action après le premier rendu du composant */
    fetch("https://official-joke-api.appspot.com/random_joke") /* Utilisation de fetch pour récupérer une blague aléatoire depuis l'api "https://official-joke-api.appspot.com/random_joke" */
      .then(res => res.json()) /* Quand la réponse est reçue elle est convertie en JSON */
      .then(data => setJoke(`${data.setup} - ${data.punchline}`)) /* Une fois les données reçues  on les utilise pour mettre à jour l'état joke avec la setup et punchline de la blague */
  }, []);

  return <p><strong>Blague du jour :</strong> {joke}</p>; /*  Retourne un élément <p> contenant la blague  if la blague est encore en cours de chargement le texte affiché sera Chargement... */
};

export default Joke;
