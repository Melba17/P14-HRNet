import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/employeeSlice';
import states from '../../data/states';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomSelect from '../../components/CustomSelect';
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
    department: '',
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
      dateOfBirth: form.dateOfBirth.toISOString().split('T')[0],
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
      department: '',
    });
    setErrors({});
  };

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const departmentOptions = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' },
  ];

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
        <p className="error">{errors.firstName || '\u00A0'}</p>

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
              <CustomSelect
                id="state"
                label="State"
                value={form.state}
                onChange={handleChange}
                options={stateOptions}
                placeholder="Choose a state"
              />
              <p className="error">{errors.state || '\u00A0'}</p>
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input type="number" id="zipCode" value={form.zipCode} onChange={handleChange} />
              <p className="error">{errors.zipCode || '\u00A0'}</p>
            </div>
          </div>
        </fieldset>

        <CustomSelect
          id="department"
          label="Department"
          value={form.department}
          onChange={handleChange}
          options={departmentOptions}
          placeholder="Choose a department"
        />

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
