import { Component } from "react";

class Heur extends Component { /* Déclaration du composant de classe Heur */
    state = { /* Initialisation de l'état local du composant */
        date: new  Date() /* L'état 'date' est défini avec l'heure actuelle au moment de l'initialisation */
    };

    callMe(){ /* Méthode qui sera utilisée pour mettre à jour l'état à intervalle régulier */
        setInterval(()=>{ /* setInterval crée une fonction qui s'exécute toutes les 1000 millisecondes (1 seconde) */
            this.setState({ date: new Date() });/* Met à jour l'état 'date' avec la nouvelle date et heure actuelles */
        },1000);/*  1000 millisecondes (1 seconde) */
    }
    render(){ /*  Méthode render qui renvoie le JSX affiché par le composant */
        return(
         <div className="App">
            <h2>{this.state.date.toLocaleTimeString()}</h2>
            {/* Affiche l'heure actuelle sous forme de chaîne formatée en fonction de la locale */}
            {this.callMe()}
            {/* Appelle la méthode callMe()  */}
         </div>
        );
    }
}

export default Heur;
