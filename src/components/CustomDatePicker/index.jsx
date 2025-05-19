import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import PropTypes from 'prop-types';

/**
 * Composant personnalisé de sélection de date basé sur `react-datepicker`.
 *
 * Affiche un champ de sélection de date avec un label, une gestion des erreurs,
 * et des menus déroulants pour les mois et années. Utilise un portail pour afficher
 * le calendrier sans décaler la mise en page.
 *
 * Comprend également des améliorations d'accessibilité : association label/champ,
 * annonce du message d'erreur par un lecteur d'écran, et indication de champ invalide.
 *
 * @component
 * @param {string} id - Identifiant unique pour le champ (lié au label).
 * @param {Date|null} value - Date actuellement sélectionnée.
 * @param {function} onChange - Fonction appelée lors de la sélection d'une nouvelle date. Reçoit un event simulé avec id et date.
 * @param {string} error - Message d'erreur à afficher sous le champ (ou espace vide si aucun message d'erreur).
 * @param {string} label - Libellé du champ affiché au-dessus du calendrier.
 * @param {Date} [maxDate] - Date maximale sélectionnable (ex : aujourd'hui pour la date de naissance).
 * @returns {JSX.Element} Champ de date personnalisable avec validation et accessibilité améliorée.
 */
function CustomDatePicker({ id, value, onChange, error, label, maxDate }) {
  const errorId = `${id}-error`;

  // On formate en objet id/value comme attendu par le composant parent, car sinon react-datepicker renvoie seulement une Date brute
  const handleChange = (date) => {
    onChange({
      id,
      value: date,
    });
  };
  
  return (
    <div className="custom-datepicker-container">
      <label htmlFor={id}>{label}</label>
      <DatePicker
        // Pour que le composant parent sache quel champ mettre à jour, soit "Date of birth", soit "Start Date"
        id={id}
        // Date actuelle sélectionnée dans le champ
        selected={value}
        // Formate la date en objet { id, value } pour le composant parent
        onChange={handleChange}
        dateFormat="MM/dd/yyyy"
        placeholderText={`Select ${label.toLowerCase()}`}
        // Affiche le calendrier dans une couche indépendante en dehors du DOM principal (portail React), ce qui permet un affichage superposé, comme une pop-up
        withPortal
        // Spécifie l’endroit exact où ce calendrier doit apparaître dans le DOM 
        portalId="root-portal"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        aria-describedby={error ? errorId : undefined}
        // valeur booléenne (true ou false) grâce au double !! qui convertit n’importe quelle valeur (chaîne, objet, null, etc.) en valeur booléenne explicite, car, si error vaut "", undefined ou null ça sera interprété comme "false" → OK, mais si error vaut une chaîne de texte (ex: "This field is required"), alors React la passe telle quelle, et non pas comme "true", ce qui peut poser des problèmes d’accessibilité ou d’analyse HTML 
        aria-invalid={!!error}
        maxDate={maxDate}
      />
      {/* role="status" => signale que l’élément affiche une information importante à lire */}
      <p id={errorId} className="datepicker-error" role="status" aria-live="polite">
        {error || '\u00A0'} {/* caractère Unicode "espace insécable" invisible mais réel qui occupe de l’espace dans l’affichage => permet de garder l'espace même si il n'y a pas de message d'erreur à afficher */}
      </p>
    </div>
  );
}

// Définition des propTypes pour documenter l’interface du composant et en valider l’usage. Même s’il encapsule react-datepicker, CustomDatePicker expose sa propre interface et sa logique personnalisée
CustomDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date).isRequired, // objet Date représentant la valeur actuellement sélectionnée (champ contrôlé)
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxDate: PropTypes.instanceOf(Date), // Date maximale sélectionnable dans le calendrier. Instance de l'objet Date (créé avec new Date()), et non une chaîne de caractères représentant une date
};

export default CustomDatePicker;
