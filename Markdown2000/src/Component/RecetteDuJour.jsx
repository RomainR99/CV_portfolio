import { useEffect, useState } from "react";
function RecetteDuJour() {
    const [recette, setRecette] = useState(null);
  
    useEffect(() => {
      fetch("https://www.themealdb.com/api/json/v1/1/random.php") /* Récuperer des data à partir de l'api */
        .then((res) => res.json()) /* if tru convertir les data en json */
        .then((data) => setRecette(data.meals[0])); /* Une fois les données reçues on met à jour l'état 'recette' avec la première recette présente =>[0]  */
    }, []);
  
    return (
      <div className="card">
        <h2>Recette du Jour</h2> {/* Affiche le titre  "Recette de Jour" */}
        {recette ? ( /* if  l'état 'recette' a été mis à jour avec une recette => il n'est plus null alors affiche le contenu suivant  */
          <div>
            <p>{recette.strMeal}</p> {/* Le nom de la recette recup */}
            <img src={recette.strMealThumb} alt={recette.strMeal} width="150" /> {/* Image de la recette recup */}
          </div>
        ) : ( /* else  */
          <p>Chargement...</p>
        )}
      </div>
    );
  }
  
  export default RecetteDuJour;