import './style.css';

/**
 * Composant personnalisé de champ texte avec accessibilité et affichage d'erreur intégré.
 *
 * @component
 * @param {string} id - Identifiant unique du champ, utilisé pour le `label` et les attributs ARIA.
 * @param {string} label - Libellé affiché au-dessus du champ.
 * @param {string} value - Valeur actuelle du champ.
 * @param {function} onChange - Fonction appelée à chaque modification.
 * @param {string} [type="text"] - Type d'entrée (`text`, `number`, etc.).
 * @param {string} [error] - Message d'erreur associé au champ.
 * @returns {JSX.Element} Champ input accessible avec gestion d'erreur.
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
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      <p id={errorId} className="input-error" role="status" aria-live="polite">
        {error || '\u00A0'} {/* espace insécable invisible mais réel qui occupe de l’espace dans l’affichage => permet de garder l'espace même si il n'y a pas de message d'erreur à afficher */}
      </p>
    </div>
  );
}

export default CustomInput;
