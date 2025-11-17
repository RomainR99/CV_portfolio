import { useState, useEffect } from "react"; // Importation des hooks useState et useEffect pour gérer l'état et les effets secondaires
import showdown from "showdown"; // Importation de Showdown pour convertir Markdown en HTML
import { useNavigate, useParams } from "react-router-dom"; // Importation des hooks de React Router pour la navigation et les paramètres d'URL

function MarkdownEditor1({ setDocuments, documents }) { /* les props c documents and setDocuments  */
  const { documentId } = useParams(); // Récupération de l'ID du document depuis l'URL
  const navigate = useNavigate(); // Hook pour la navigation entre les pages
  const [title, setTitle] = useState(""); // État pour stocker le titre du document
  const [markdown, setMarkdown] = useState(""); // État pour stocker le contenu Markdown du document

  // Effet qui se déclenche lorsque l'ID du document change ou que la liste des documents est mise à jour
  useEffect(() => {
    if (documentId && documentId !== "new") { // Vérifie si l'on modifie un document existant
      const docIndex = parseInt(documentId); // Convertit l'ID en nombre pour éviter les Error
      if (!isNaN(docIndex) && documents[docIndex]) { // Vérifie si l'ID est valide et si un document existe à cet index
        setTitle(documents[docIndex].title); // Charge le titre du document
        setMarkdown(documents[docIndex].markdown); // Charge le contenu Markdown du document
      }
    }
  }, [documentId, documents]); // Déclenche l'effet lorsque documentId ou documents change

  const converter = new showdown.Converter(); // Création d'un convertisseur Markdown -> HTML
  const html = converter.makeHtml(markdown); // Conversion du contenu Markdown en HTML

  // Fonction pour sauvegarder un document
  const saveDocument = () => {
    if (!title) { // Vérifie si le titre est vide
      alert("Veuillez entrer un titre avant de sauvegarder."); // Alerte si aucun titre n'est fourni
      return;
    }

    let updatedDocs = [...documents]; // Copie de la liste des documents

    if (documentId !== "new" && !isNaN(parseInt(documentId))) {
      updatedDocs[parseInt(documentId)] = { title, markdown }; // Mise à jour du document existant
    } else {
      updatedDocs.push({ title, markdown }); // Ajout d'un nouveau document
    }

    localStorage.setItem("documents", JSON.stringify(updatedDocs)); // Sauvegarde dans localStorage
    setDocuments(updatedDocs); // Mise à jour de l'état global des documents
    navigate("/"); // Redirection vers la page principale après la sauvegarde
  };

  // Fonction pour exporter le contenu Markdown sous forme de fichier .md
  const exportMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" }); // Création d'un fichier blob contenant le Markdown
    const url = URL.createObjectURL(blob); // Création d'une URL pour le téléchargement
    const a = document.createElement("a"); // Création d'un élément <a> pour déclencher le téléchargement
    a.href = url;
    a.download = `${title || "document"}.md`; // Nom du fichier basé sur le titre
    a.click(); // Déclenchement du téléchargement
    URL.revokeObjectURL(url); // Libération de l'URL créée
  };

  // Fonction pour importer un fichier Markdown
  const importMarkdown = (event) => {
    const file = event.target.files[0]; // Récupération du fichier sélectionné
    if (!file) return; // Vérifie si un fichier a été sélectionné

    const reader = new FileReader(); // Création d'un lecteur de fichier
    reader.onload = (e) => setMarkdown(e.target.result); // Mise à jour du contenu Markdown avec le fichier importé
    reader.readAsText(file); // Lecture du fichier en tant que texte
  };

  // Fonction pour fermer l'éditeur et retourner à la liste des documents
  const closeEditor = () => {
    setTitle(""); // Réinitialise le titre
    setMarkdown(""); // Réinitialise le contenu Markdown
    navigate("/"); // Redirection vers la page d'accueil
  };

  return (
    <div>
      {/* Titre principal */}
      <h1 style={{ textAlign: "center", fontFamily: "Tahoma", color: "#684316" }}> {/* css inline */}
        Editeur Markdown - Old School
      </h1>

      <div className="editor-container">

        <div className="Container-Input">
        {/* Champ pour entrer le titre du document */}
        <input
          type="text"
          placeholder="Entrez un titre pour votre document"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "50%", padding: "8px", marginBottom: "20px", height: "20%" }}
        />

        {/* Zone de texte pour écrire en Markdown */}
        <textarea
          className="editor"
          placeholder="##Entrez votre texte Markdown"
          value={markdown} 
          onChange={(e) => setMarkdown(e.target.value)}
          rows="10"
          style={{ width: "100%", padding: "8px" }}
        />

        {/* Aperçu du contenu converti en HTML */}
        <div className="preview">
          <h3 className="TitreHtml">Aperçu HTML</h3>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        
        </div>

        <div className="ContainerBouton">

          <div className="buttons">
            {/* Bouton pour exporter le Markdown */}
            <button onClick={exportMarkdown}>&#128190; Export</button>

            {/* Champ pour importer un fichier Markdown */}
            <input type="file" accept=".md" onChange={importMarkdown} />

            {/* Bouton pour sauvegarder le document */}
            <button onClick={saveDocument}>&#x1F4BD; Sauvegarder</button>
            

            {/* Bouton pour fermer l'éditeur */}
            <button onClick={closeEditor}>&#10060; Fermer</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MarkdownEditor1;
