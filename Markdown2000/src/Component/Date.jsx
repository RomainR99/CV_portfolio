import  { useEffect, useState } from 'react';

function DateComponent() { //On met datecomponent pour pas avoir de problème avec Date qui est une fonction par dédault de react
    const [currentDate, setCurrentDate] = useState(""); //Déclaration d'une state avec une valeur initiale vide 

    useEffect(() => { /* Le hook useEffect est utilisé ici pour exécuter du code après le rendu du composant */
        //const date = new Date(); Si on fait ca la date est en dure il faut donc la monter et la démonter
       //date.setFullYear(2025); 
        //date.setMonth(0); 
        //date.setDate(1); 
        //const formattedDate = date.toDateString(); 
        //setCurrentDate(formattedDate); 
    //}, []);
        const updateDate = () => {
            const date = new Date(); /* Crée un nouvel objet Date représentant l'heure actuelle */
            const formattedDate = date.toDateString(); /*  Convertit la date en format chaîne lisible  Wed Feb 09 2025*/ 
            setCurrentDate(formattedDate); /*  Met à jour l'état 'currentDate' avec la nouvelle date formatée */
        };

        updateDate(); /* Appel initial de la fonction pour mettre à jour la date immédiatement */
        const interval = setInterval(updateDate, 1000); // setinterval toutes les 1000 milliseconde : toute les secondes

        return () => clearInterval(interval); // On clear pour démonter le composant
    }, []);

    return (
        <div style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
            {currentDate ? `${currentDate}` : "Chargement..."} {/* Gestion de l'erreur - date sinon : Chargement...*/}
        </div>
        
    );
}

export default DateComponent;