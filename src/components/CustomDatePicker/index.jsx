import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.css'

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
 * @param {Date|null} selected - Date actuellement sélectionnée.
 * @param {function} onChange - Fonction appelée lors de la sélection d'une nouvelle date. Reçoit l'id et la date.
 * @param {string} error - Message d'erreur à afficher sous le champ (ou espace vide si aucun message d'erreur).
 * @param {string} label - Libellé du champ affiché au-dessus du calendrier.
 * @returns {JSX.Element} Champ de date personnalisable avec validation et accessibilité améliorée.
 */
function CustomDatePicker({ id, selected, onChange, error, label, maxDate }) {
  const errorId = `${id}-error`

  return (
    <div className="custom-datepicker-container">
      <label htmlFor={id}>{label}</label>
      <DatePicker
        id={id}
        selected={selected}
        onChange={(date) => onChange(id, date)}
        dateFormat="yyyy-MM-dd"
        placeholderText={`Select ${label.toLowerCase()}`}
        withPortal
        portalId="root-portal"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
        maxDate={maxDate}
      />
      <p id={errorId} className="datepicker-error" role="status" aria-live="polite">
        {error || '\u00A0'}
      </p>
    </div>
  )
}

export default CustomDatePicker
