import Select from 'react-select'
import './style.css'

function CustomSelect({ id, label, value, onChange, options, placeholder }) {
  const handleChange = (selectedOption) => {
    onChange({ target: { id, value: selectedOption.value } })
  }

  const selected = options.find((opt) => opt.value === value)

  return (
    <div className="custom-select-container">
      <label htmlFor={id}>{label}</label>
      <Select
        inputId={id}
        value={selected}
        onChange={handleChange}
        options={options}
        isSearchable={false}
        classNamePrefix="custom-select"
        placeholder={placeholder}
      />
    </div>
  )
}

export default CustomSelect
