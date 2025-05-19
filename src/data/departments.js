/**
 * Liste des départements/services internes de l’entreprise.
 *
 * Chaque élément contient :
 * - `value` : la valeur technique utilisée dans le formulaire et envoyée à Redux,
 * - `label` : le libellé affiché dans les menus déroulants (identique ici à la valeur).
 *
 * Utilisé pour alimenter le composant CustomSelect dans le formulaire de création d’employé.
 *
 * @constant
 * @type {Array<{ value: string, label: string }>}
 */
const departments = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' },
  ];
  
  export default departments;
  