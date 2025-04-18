import Select from 'react-select';
import './style.css';

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
  const handleChange = (selectedOption) => {
    onChange({
      target: {
        id,
        value: selectedOption ? selectedOption.value : '',
      },
    });
  };

  const selected = options.find((opt) => opt.value === value) || null;
  const errorId = `${id}-error`;

  return (
    <div className="custom-select-container">
      <label htmlFor={id}>{label}</label>
      <Select
        inputId={id}
        value={selected}
        onChange={handleChange}
        options={options}
        isSearchable={false}
        isClearable
        classNamePrefix="custom-select"
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      <p id={errorId} className="custom-select-error" role="status" aria-live="polite">
        {error || '\u00A0'}
      </p>
    </div>
  );
}

export default CustomSelect;
