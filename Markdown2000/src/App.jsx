import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MarkdownEditor1 from "./Component/MarkdownEditor1";
import { useState, useEffect } from "react";
import Heur from "./Component/Heure";
import Joke from "./Component/Joke";
import MocktailDuJour from "./Component/Mocktail";
import RecetteDuJour from "./Component/RecetteDuJour";
import HistoricEvent from "./Component/HistoricEvent";
import Date from "./Component/Date";
import "./App.css"; // Importation du fichier CSS pour le style années 2000

function App() {
  const [documents, setDocuments] = useState([]); //Une state pour stocker les documents

  useEffect(() => { //Exécuté une fois au montage de composant 
    const savedDocs = JSON.parse(localStorage.getItem("documents")) || []; //Récupération des documents sauvegardés ou d'un tableau vide dans le stockage local
    setDocuments(savedDocs); //utilser useState pour modifier les documetns sauvegardés
  }, []); //L'ajout de `[]` permet à l'effet de s'exécuter une seule fois lors du montage du composant.
  //Fonction anonyme pour supprimer un document

  const deleteDocument = (index) => { //l'index de document à supprimer
    const updatedDocs = [...documents]; //Copie du tableau de documents
    updatedDocs.splice(index, 1); //Suppression du document à l'index spécifié
    localStorage.setItem("documents", JSON.stringify(updatedDocs)); //il faut faire même des mise à jour au niveau de local storage
    setDocuments(updatedDocs); //Mise à jour la state avec la nouvelle liste =>(liste/document[index]) de documents
  };

  return (
    <>  {/* Un élément qui contient tous les autres éléments et joue le rôle d'une div*/}
      <BrowserRouter>
        <div className="app-container"> {/* Conteneur principal de l'application */}
          <header className="retro-header">  {/* Un header +un style css */}
            <h1>Bienvenue sur mon site Années 2000</h1> {/* Le titre dans header */}
          </header>

        <div className="content"> {/* Contenu Principal */}
          <div className="Container-Component"> {/* Barre latérale avec diff widgets */}

              <MocktailDuJour />
              <Joke />
              <Heur />
              <Date />
              <RecetteDuJour />
              <HistoricEvent />
              
          </div>

          <div className="main-content">
              <div className="document-editor"> {/* Editeur de documents */}

                <h3>📜 Mes Documents :</h3>

                <ul>
                  {documents.map((doc, index) => ( /* lister les documents par map pour chaque document à l'index [index] */
                    <li key={index} className="doc-item"> {/* Liste des documents + un key pour chaque document Key=>L'identifiant du document est l'index qui nous aide également pour la suppression et la modification d'un document */}
                      <Link to={`/editor/${index}`} className="doc-link"> {/* Lien vers l'éditeur /index de document  */}
                        {doc.title} {/* afficher juste le titre  */}
                      </Link>
                      <button onClick={() => deleteDocument(index)} className="delete-btn">🗑️</button> {/* Un button avec un effect (supp des documents) */}
                    </li>
                  ))}
                </ul>

                <Link to="/editor/new"  className="add-btn"> {/* button Ajouter if (clique) affiche editor  */}
                  ➕ Ajouter
                </Link>

              </div>
              {/* Routage vers le composant MardownEditor1 */}
              <Routes>
                <Route path="/editor/:documentId?" element={<MarkdownEditor1 setDocuments={setDocuments} documents={documents} />} /> {/*  */}
              </Routes>

            </div>

          </div>

        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
