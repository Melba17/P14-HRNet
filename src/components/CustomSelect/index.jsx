import Select from 'react-select';
import './style.css';
import PropTypes from 'prop-types';


/**
 * Composant personnalisé de sélection basé sur `react-select`.
 *
 * Inclut la gestion des erreurs avec accessibilité renforcée : indication de champ invalide,
 * association du message d'erreur au champ via `aria-describedby`, et affichage dynamique.
 *
 * @component
 * @param {string} id - Identifiant unique du champ (lié au label).
 * @param {string} label - Libellé du champ.
 * @param {string} value - Valeur actuellement sélectionnée.
 * @param {function} onChange - Fonction déclenchée à la sélection ou suppression.
 * @param {Array<{ value: string, label: string }>} options - Liste des options.
 * @param {string} placeholder - Texte par défaut affiché si rien n'est sélectionné.
 * @param {string} [error] - Message d'erreur à afficher et lier au champ (accessibilité).
 * @returns {JSX.Element} Champ de sélection avec accessibilité et validation.
 */
function CustomSelect({ id, label, value, onChange, options, placeholder, error }) {
  
  // Fonction appelée à chaque sélection ou suppression d’option. Elle extrait uniquement la valeur et la transmet au composant parent, accompagnée de l’identifiant du champ (id) pour la mise à jour dans le formulaire global
  const handleChange = (selectedOption) => {
    onChange({
      id,
      value: selectedOption ? selectedOption.value : '',
    }); // Soit l’abréviation d’un État américain, soit un nom de service dans l’entreprise 
  };

  // "opt.value" (valeur de chaque option du menu déroulant) - "value" (valeur sélectionnée dans le formulaire) => Recherche dans la liste des options celle dont la valeur correspond à la valeur sélectionnée dans le formulaire
  // 'selected' contient alors l’objet complet { value, label } requis par react-select pour afficher correctement l'option choisie, ou null si aucune correspondance
  const selected = options.find((opt) => opt.value === value) || null;

  const errorId = `${id}-error`;

  return (
    <div className="custom-select-container">
      
      <label htmlFor={id}>{label}</label>  {/* State ou Department */}
      <Select
        inputId={id}
        value={selected} // L’objet sélectionné par l'utilisateur (doit être { value, label })
        onChange={handleChange} // Formate la sélection et stocke la valeur (value) dans `form`
        options={options} // La liste des choix affichés dans le menu déroulant
        isSearchable={false} // désactive le champ de recherche dans le menu
        isClearable // permet de réinitialiser/supprimer la sélection
        classNamePrefix="custom-select"
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      <p id={errorId} className="custom-select-error" role="status" aria-live="polite"> {/* role="status" aria-live="polite"=> indique que l’élément contient un message important à destination de l’utilisateur, et que ce message doit être annoncé automatiquement par les lecteurs d’écran, sans que l’utilisateur ait besoin de le focus et sans interrompre une lecture en cours */}
        {error || '\u00A0'}
      </p>
    </div>
  );
}

// Définition des propTypes pour documenter l’interface du composant et en valider l’usage
CustomSelect.propTypes = {
  id: PropTypes.string.isRequired, 
  label: PropTypes.string.isRequired, 
  value: PropTypes.string.isRequired, 
  onChange: PropTypes.func.isRequired, 
  options: PropTypes.arrayOf( 
    PropTypes.shape({
      value: PropTypes.string.isRequired, 
      label: PropTypes.string.isRequired, 
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired, 
  error: PropTypes.string, 
};

export default CustomSelect;
