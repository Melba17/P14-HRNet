import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/employeeSlice';
import states from '../../data/states'; 
import './style.css'; 

function CreateEmployee() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee(form));
    setShowModal(true);
    setForm({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: 'Sales',
    });
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
        <input type="text" id="firstName" value={form.firstName} onChange={handleChange} required />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={form.lastName} onChange={handleChange} required />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input type="date" id="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />

        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" value={form.startDate} onChange={handleChange} required />

        <fieldset className="address">
          <legend>Address</legend>
          <div className="address-group">
            <div>
              <label htmlFor="street">Street</label>
              <input type="text" id="street" value={form.street} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input type="text" id="city" value={form.city} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <select id="state" value={form.state} onChange={handleChange} required>
                <option value="">-- Choose a state --</option>
                {states.map((state) => (
                  <option key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input type="number" id="zipCode" value={form.zipCode} onChange={handleChange} required />
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

        <button type="submit">Save</button>
      </form>

      {showModal && (
        <div className="modal">
          <p>Employee Created!</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default CreateEmployee;
