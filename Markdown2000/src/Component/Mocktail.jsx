import { useEffect, useState } from "react";

function MocktailDuJour() {
  const [mocktail, setMocktail] = useState(null); /* Déclare un état local 'mocktail' initialisé à 'null' et une fonction 'setMocktail' pour le mettre à jour avec la recette de mocktail récupérée */

  useEffect(() => { /* Utilisation du hook useEffect pour effectuer une action après le premier rendu du composant */
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic") /* Utilisation de 'fetch' pour récupérer une liste de mocktails depuis l'api*/
      .then((res) => res.json()) /* Quand la réponse est reçue elle est convertie en format JSOn*/
      .then((data) => {
        const randomMocktail = data.drinks[Math.floor(Math.random() * data.drinks.length)]; /*  Sélectionne un mocktail aléatoire parmi ceux présents dans la réponse Api */
        setMocktail(randomMocktail); /* Met à jour l'état 'mocktail' avec le mocktail aléatoire sélectionné */
      });
  }, []);

  return (
    <div className="card">
      <h2 className="MocktailTitle">Mocktail du Jour</h2> {/* Affiche le titre "Mocktail du Jour" */}
      {/*Si l'état 'mocktail' a été mis à jour avec un mocktail => qu'il n'est plus null alors affiche le contenu suivant */}
      {mocktail ? ( 
        <div>
          <p>{mocktail.strDrink}</p> {/* Affiche le nom du mocktail récupéré */}
          <img src={mocktail.strDrinkThumb} alt={mocktail.strDrink} width="150" /> {/* Affiche l'image du mocktail récupéré avec une largeur de 150 pixels */}
        </div>
      ) : ( /* else */
        <p>Chargement...</p> /* Si mocktail == null pendant le chargement des données affiche le message suivant */
      )}
    </div>
  );
}

export default MocktailDuJour;
