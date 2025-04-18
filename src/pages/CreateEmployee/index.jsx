import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/employeeSlice';
import states from '../../data/states';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomSelect from '../../components/CustomSelect';
import CustomInput from '../../components/CustomInput';
import Modal from 'react-custom-modal-publish';
import './style.css';

const initialFormState = {
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  startDate: null,
  street: '',
  city: '',
  state: '',
  zipCode: '',
  department: '',
};


/**
 * `CreateEmployee` est un composant de formulaire permettant la création d'un nouvel employé.
 *
 * Il inclut :
 * - des champs de texte (`CustomInput`) pour les informations personnelles et l'adresse,
 * - des sélecteurs de date (`CustomDatePicker`) pour la date de naissance et la date d'embauche,
 * - des sélecteurs (`CustomSelect`) pour le département et l'état,
 * - une validation basique des champs requis,
 * - une modale de confirmation à la soumission réussie.
 *
 * L'état du formulaire est entièrement contrôlé via React (`useState`),
 * avec une fonction centralisée `updateField()` pour mettre à jour les champs et réinitialiser les erreurs.
 *
 * L'envoi du formulaire déclenche une action Redux `addEmployee` avec les données au format ISO pour les dates.
 *
 * @component
 * @returns {JSX.Element} Le formulaire de création d’un employé, avec validation, composants personnalisés, et modale de confirmation.
 */
function CreateEmployee() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const updateField = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleChange = (e) => updateField(e.target.id, e.target.value);
  const handleDateChange = (id, date) => updateField(id, date);

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
  
    for (const key in form) {
      if (!form[key] || (typeof form[key] === 'string' && form[key].trim() === '')) {
        newErrors[key] = 'This field is required';
      }
    }
  
    // Validation spécifique pour la date de naissance car l’utilisateur ne pourra pas tricher et entrer une date future via les DevTools ou scripts
    if (form.dateOfBirth && form.dateOfBirth > today) {
      newErrors.dateOfBirth = 'Date of birth cannot be in the future';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const employeeData = {
      ...form,
      // Sert à formater une date JavaScript en chaîne de caractères au format YYYY-MM-DD (année-mois-jour), sans l'heure.'T' sépare la date et l’heure dans le format ISO => ["2025-04-08", "14:30:00.000Z"]. [0]récupère la première partie du tableau, c’est-à-dire juste la date 
      dateOfBirth: form.dateOfBirth.toISOString().split('T')[0], 
      startDate: form.startDate.toISOString().split('T')[0],
    };

    dispatch(addEmployee(employeeData));
    setShowModal(true);
    setForm(initialFormState);
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

      <h2 id="form-title">Create Employee</h2>

      <form onSubmit={handleSubmit} id="create-employee" aria-labelledby="form-title" role="form">
        <CustomInput id="firstName" label="First Name" value={form.firstName} onChange={handleChange} error={errors.firstName} />
        <CustomInput id="lastName" label="Last Name" value={form.lastName} onChange={handleChange} error={errors.lastName} />

        <CustomDatePicker id="dateOfBirth" label="Date of Birth" selected={form.dateOfBirth} onChange={handleDateChange} error={errors.dateOfBirth} maxDate={new Date()} />
        <CustomDatePicker id="startDate" label="Start Date" selected={form.startDate} onChange={handleDateChange} error={errors.startDate} />

        <fieldset className="address">
          <legend>Address</legend>
          <div className="address-group">
            <div>
              <CustomInput id="street" label="Street" value={form.street} onChange={handleChange} error={errors.street} />
            </div>
            <div>
              <CustomInput id="city" label="City" value={form.city} onChange={handleChange} error={errors.city} />
            </div>
            <div>
              <CustomSelect id="state" label="State" value={form.state} onChange={handleChange} options={stateOptions} placeholder="Choose a state" error={errors.state} />
            </div>
            <div>
              <CustomInput id="zipCode" label="Zip Code" value={form.zipCode} onChange={handleChange} type="number" error={errors.zipCode} />
            </div>
          </div>
        </fieldset>

        <CustomSelect id="department" label="Department" value={form.department} onChange={handleChange} options={departmentOptions} placeholder="Choose a department" error={errors.department} />

        <button type="submit">Save</button>
      </form>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Great news !"
      >
        <p>The new employee has been successfully created.</p>
      </Modal>
    </div>
  );
}

export default CreateEmployee;
