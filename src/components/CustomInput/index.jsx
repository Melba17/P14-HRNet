import './style.css';
import PropTypes from 'prop-types';


/**
 * Composant personnalisé de champ texte avec accessibilité et affichage d'erreur intégré.
 *
 * @component
 * @param {string} id - Identifiant unique du champ, utilisé pour le `label` et les attributs ARIA.
 * @param {string} label - Libellé affiché au-dessus du champ.
 * @param {string} value - Valeur actuelle du champ.
 * @param {function} onChange - Fonction appelée à chaque modification. Reçoit un objet { id, value }.
 * @param {string} [type="text"] - Type d’input HTML (par défaut "text"). Peut être "number", "email", etc.
 * @param {string} [error] - Message d'erreur à afficher sous le champ lorsque nécessaire.
 * @returns {JSX.Element} Champ input accessible avec gestion d'erreur personnalisée et support ARIA.
 */
function CustomInput({ id, label, value, onChange, type = 'text', error }) {
  const errorId = `${id}-error`;

  return (
    <div className="custom-input-container">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange({ id, value: e.target.value })}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        onKeyDown={(e) => {
          // Empêche la saisie du caractère "-" pour le champ ZipCode
          if (type === 'number' && e.key === '-') {
            e.preventDefault();
          }
        }}
      />
      <p id={errorId} className="input-error" role="status" aria-live="polite">
        {error || '\u00A0'}
      </p>
    </div>
  );
}

// Définition des propTypes pour documenter l’interface du composant et en valider l’usage
CustomInput.propTypes = {
  id: PropTypes.string.isRequired, 
  label: PropTypes.string.isRequired, 
  value: PropTypes.string.isRequired, 
  onChange: PropTypes.func.isRequired, 
  type: PropTypes.string, 
  error: PropTypes.string 
};


export default CustomInput;
