import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

function CustomDatePicker({ id, selected, onChange, error, label }) {
  return (
    <>
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
      />
      <p className="error">{error || '\u00A0'}</p>
    </>
  );
}

export default CustomDatePicker;
