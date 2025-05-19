import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/employeeSlice';
import states from '../../data/states';
import departments from '../../data/departments';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomSelect from '../../components/CustomSelect';
import CustomInput from '../../components/CustomInput';
import Modal from 'react-custom-modal-publish';
import './style.css';

// Représente la valeur initiale de chaque champ du formulaire
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
 * - un contrôle renforcé sur la validité de la date de naissance (pas de date future),
 * - une modale de confirmation à la soumission réussie.
 *
 * L'état du formulaire est entièrement contrôlé via React (`useState`),
 * avec une fonction centralisée `handleChange` pour mettre à jour les champs et réinitialiser les erreurs.
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

  // Fonction qui centralise la mise à jour du formulaire complet de manière cohérente pour tous les champs => state `form` 
  // Et réinitialise l’éventuel message d’erreur associé dans `errors`
  const handleChange = ({ id, value }) => {
  setForm((prev) => ({ ...prev, [id]: value }));
  setErrors((prev) => ({ ...prev, [id]: '' }));
  };

   // Données "États" transformées au format value/label attendu par react-select
  const stateOptions = states.map((state) => ({
    value: state.abbreviation, // Valeur enregistrée dans le form et envoyée à Redux => donnée technique
    label: state.name, // Libellé affiché dans le menu déroulant
  }));

  // Fonction appelée au moment de la soumission du formulaire pour vérifier si tous les champs sont bien remplis et valides 
  const validateForm = () => {
    const newErrors = {}; // Initialisation d'un nouvel objet qui va contenir les messages d’erreur pour les champs invalides
    const namePattern = /^[a-zA-ZÀ-ÿ' -]+$/; // Lettres, accents, apostrophes, espaces, tirets
  
    // Étape 1 : Boucle qui vérifie que chaque champ (key) est bien rempli (non nul, non vide, pas juste des espaces)
    for (const key in form) {
    const value = form[key]; // Lecture unique de la valeur du champ 
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        newErrors[key] = 'This field is required';
      }
    }

    // Étape 2 : Vérifie que certains champs contiennent uniquement des lettres
    const letterOnlyFields = ['firstName', 'lastName', 'city'];
      letterOnlyFields.forEach((field) => {
        const value = form[field];
        // Si le champ est rempli mais ne respecte pas le format attendu
        if (value && value.trim() !== '' && !namePattern.test(value.trim())) {
          newErrors[field] = 'Only letters are allowed';
        }
      });
    
    // Étape 3 : Vérifie que le zip code n’est pas un nombre négatif. 
    // Même si l’input est de type number, le navigateur fournit toujours une string via e.target.value et en React, cette valeur est transmise telle quelle, donc il faut la convertir manuellement si on veut un vrai number pour la vérification
      if (form.zipCode && !isNaN(form.zipCode)) {
        const zip = Number(form.zipCode);
        if (zip < 0) {
        newErrors.zipCode = 'Zip Code cannot be negative';
        }
      }

    // Enregistre les erreurs détectées
    setErrors(newErrors);
    
    // Retourne true si aucun champ n’a d’erreur, sinon false
    return Object.keys(newErrors).length === 0;
  };
  
  // Fonction globale exécutée à la soumission du formulaire : valide, envoie les données, et réinitialise le formulaire. La validation est centralisée à la soumission pour simplifier le code, éviter les erreurs affichées trop tôt, et garantir une bonne UX sur un formulaire court
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

        <CustomDatePicker id="dateOfBirth" label="Date of Birth" value={form.dateOfBirth}
        onChange={handleChange} error={errors.dateOfBirth} maxDate={new Date()} // Empêche la création de dates dans le futur 
        />

        <CustomDatePicker id="startDate" label="Start Date" value={form.startDate}
        onChange={handleChange} error={errors.startDate} />

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
              <CustomInput id="zipCode" label="Zip Code" value={form.zipCode} onChange={handleChange} type="number" error={errors.zipCode} 
              />
            </div>
          </div>
        </fieldset>

        <CustomSelect id="department" label="Department" value={form.department} onChange={handleChange} options={departments} placeholder="Choose a department" error={errors.department} />
      
        <button type="submit">Save</button>
      </form>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}
      title="Great news !"
      >
        <p>The new employee has been successfully created.</p>
      </Modal>
    </div>
  );
}

export default CreateEmployee;
