import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/employeeSlice';
import states from '../../data/states';
import CustomDatePicker from '../../components/CustomDatePicker';
import './style.css';


function CreateEmployee() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales',
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleDateChange = (field, date) => {
    setForm((prevForm) => ({ ...prevForm, [field]: date }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in form) {
      if (!form[key] || (typeof form[key] === 'string' && form[key].trim() === '')) {
        newErrors[key] = 'This field is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const employeeData = {
      ...form,
      dateOfBirth: form.dateOfBirth.toISOString().split('T')[0], // Convertit un objet Date (form.dateOfBirth) en chaîne ISO (format 'YYYY-MM-DDTHH:MM:SSZ' => format standard international), puis extrait uniquement la date (avant le 'T'), sans l'heure.
      startDate: form.startDate.toISOString().split('T')[0],
    };

    dispatch(addEmployee(employeeData));
    setShowModal(true);

    setForm({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      startDate: null,
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: 'Sales',
    });
    setErrors({});
  };

  return (
    <div className="form-container">
      <h1>HRnet</h1>

      <div className="link-wrapper">
        <a href="/employee-list" className="link">View Current Employees</a>
      </div>

      <h2>Create Employee</h2>

      <form onSubmit={handleSubmit} id="create-employee">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={form.firstName} onChange={handleChange} />
        <p className="error">{errors.firstName || '\u00A0'}</p> {/* '\u00A0' = espace insécable : garde l'espace vide pour éviter les décalages visuels si il n'y a pas de message d'erreur à afficher */}

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={form.lastName} onChange={handleChange} />
        <p className="error">{errors.lastName || '\u00A0'}</p>

        <CustomDatePicker
          id="dateOfBirth"
          label="Date of Birth"
          selected={form.dateOfBirth}
          onChange={handleDateChange}
          error={errors.dateOfBirth}
        />

        <CustomDatePicker
          id="startDate"
          label="Start Date"
          selected={form.startDate}
          onChange={handleDateChange}
          error={errors.startDate}
        />

        <fieldset className="address">
          <legend>Address</legend>
          <div className="address-group">
            <div>
              <label htmlFor="street">Street</label>
              <input type="text" id="street" value={form.street} onChange={handleChange} />
              <p className="error">{errors.street || '\u00A0'}</p>
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input type="text" id="city" value={form.city} onChange={handleChange} />
              <p className="error">{errors.city || '\u00A0'}</p>
            </div>
            <div>
              <label htmlFor="state">State</label>
              <select id="state" value={form.state} onChange={handleChange}>
                <option value="">-- Choose a state --</option>
                {states.map((state) => (
                  <option key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </option>
                ))}
              </select>
              <p className="error">{errors.state || '\u00A0'}</p>
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input type="number" id="zipCode" value={form.zipCode} onChange={handleChange} />
              <p className="error">{errors.zipCode || '\u00A0'}</p>
            </div>
          </div>
        </fieldset>

        <label htmlFor="department">Department</label>
        <select id="department" value={form.department} onChange={handleChange}>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
        <p className="error">{errors.department || '\u00A0'}</p>

        <button type="submit">Save</button>
      </form>

      {showModal && (
        <div className="modal" role="alertdialog" aria-labelledby="modal-title" aria-describedby="modal-desc">
          <p id="modal-title">Employee Created!</p>
          <p id="modal-desc">The new employee was successfully added to the list.</p>
          <button onClick={() => setShowModal(false)} aria-label="Close success message">
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateEmployee;
