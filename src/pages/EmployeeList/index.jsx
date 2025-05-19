import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import CustomDataTable from '../../components/CustomDataTable';
import states from '../../data/states';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Formatage de la date au format US pour l'affichage dans le tableau
function formatDateToUS(isoDate) {
  if (!isoDate) return ''; // Au cas où une valeur serait manquante ce qui provoquerait une erreur
  const [year, month, day] = isoDate.split('-'); // découpe "2025-04-27" en [2025, 04, 27]
  return `${month}/${day}/${year}`; // retourne "04/27/2025"
}

// Construction d'une Map (objet clé/valeur) directement avec reduce() : { CA: "California", NY: "New York", ... } prête à l'emploi
// Permet d'accéder rapidement au nom complet d'un État à partir de son abréviation, sans avoir besoin de parcourir tout le tableau avec states.find() à chaque recherche (recherches instantanées, pas de recalculs inutiles)
// Approche plus performante pour filtrer dynamiquement une liste d'employés, tout en conservant states.js au format tableau d'origine (pratique pour alimenter les menus déroulants du formulaire)
const statesMap = states.reduce((map, state) => {
  map[state.abbreviation] = state.name;
  return map;
}, {});

// Fonction pour récupérer directement le nom d'un état depuis son abréviation => accès immédiat via statesMap
function getStateName(abbr) {
  return statesMap[abbr] || '';
}

/**
 * Page listant tous les employés enregistrés.
 *
 * Affiche un champ de recherche global permettant de filtrer dynamiquement les employés
 * par quasiment tous les champs sauf "Street" et "Zipcode".
 * Si aucun employé n'est trouvé, un message est affiché.
 *
 * @component
 */
function EmployeeList() {
  const employees = useSelector((state) => state.employee.list);
  // État local pour stocker la valeur saisie dans la barre de recherche
  const [search, setSearch] = useState('');
  // État secondaire pour gérer un délai (debounce) avant d’effectuer réellement la recherche
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Attente de 500ms après la dernière frappe de l'utilisateur avant d’effectuer la recherche
  useEffect(() => {
    // Effet de bord ou comportement asynchrone qui n’est pas purement lié au rendu React
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer); // Nettoyage du timer si l’utilisateur continue de taper
  }, [search]);

  // Définition des colonnes du tableau : chaque objet correspond à une colonne
  // Pour les colonnes de date, on garde une vraie Date (new Date) pour le tri, et on affiche un format lisible via `cell`.
  const columns = [
    { name: 'First Name', selector: row => row.firstName, sortable: true }, // 'selector' est une fonction qui permet à la bibliothèque de récupérer la valeur brute d’une colonne, à partir d’une ligne (row) du tableau (row représente un objet employé) => ici, signifie : «donne-moi la valeur du prénom de cette ligne»
    { name: 'Last Name', selector: row => row.lastName, sortable: true },
    {
      name: 'Date of Birth',
      selector: row => new Date(row.dateOfBirth), // Pour le tri correct (objet Date) 
      cell: row => formatDateToUS(row.dateOfBirth), // Pour l'affichage 
      sortable: true
    },
    { name: 'Department', selector: row => row.department, sortable: true },
    {
      name: 'Start Date',
      selector: row => new Date(row.startDate), 
      cell: row => formatDateToUS(row.startDate), 
      sortable: true
    },
    { name: 'Street', selector: row => row.street, sortable: true },
    { name: 'City', selector: row => row.city, sortable: true },
    { name: 'State', selector: row => row.state, sortable: true },
    { name: 'Zip Code', selector: row => row.zipCode, sortable: true }
  ];

  // Délai appliqué et mise en minuscule de la requête de recherche, pour une comparaison insensible à la casse et sans espaces
  const query = debouncedSearch.trim().toLowerCase();
  // Remplace tous les tirets par des slashs dans la requête, pour unifier le format de date
  const normalizedQuery = query.replace(/-/g, '/');
  // Vérifie si la recherche est potentiellement une abréviation d’État (ex: "CA", "NY")
  const isStateQuery = query.length === 2;
  // Le dernier employé enregistré est affiché en premier
  const sortedEmployees = [...employees].reverse();


  // Filtrage des employés : on vérifie si la requête est incluse dans un des champs de chaque employé
  const filteredEmployees = sortedEmployees.filter((emp) => {
    if (isStateQuery) {
      // Recherche uniquement par abréviation exacte de l'état
      return emp.state.toLowerCase() === query;
    }
    // Sinon recherche globale sur tous les champs principaux
    return (
      emp.firstName.toLowerCase().includes(query) ||
      emp.lastName.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query) ||
      emp.street.toLowerCase().includes(query) ||
      emp.city.toLowerCase().includes(query) ||
      // Recherche sur le code postal : conversion en chaîne pour utiliser includes() => pas de .toLowerCase() ici car zipCode est un nombre, sans notion de casse
      emp.zipCode.toString().includes(query) ||
      // Recherche dans la date complète, que l'utilisateur tape avec des "/" ou des "-"
      formatDateToUS(emp.dateOfBirth).includes(normalizedQuery) ||
      // Recherche uniquement par année (4 premiers chiffres du format ISO stocké dans le localstorage)
      emp.dateOfBirth.slice(0, 4).includes(query) ||
      formatDateToUS(emp.startDate).includes(normalizedQuery) ||
      emp.startDate.slice(0, 4).includes(query) ||
      // Recherche sur le nom complet de l’État
      getStateName(emp.state).toLowerCase().includes(query)
    );
  });

  return (
    <div className="list-container">
      <h1 id="employee-list-title">Current Employees</h1>

      {/* Si au moins un employé est présent dans Redux */}
      {employees.length > 0 ? (
        <>
          <div className="search-wrapper">
            <input
              type="text"
              className="search-bar"
              placeholder="Search employees"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search employees"
            />
            {search && (
              <button
                className="clear-button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>

          <CustomDataTable
            columns={columns}
            // Soit toute la liste des employés (si la recherche est vide), soit seulement ceux correspondant à la requête => "filteredEmployees" est donc toujours à jour
            data={filteredEmployees}
          />
        </>
      ) : (
        // S'il n’y a aucun employé du tout dans Redux
        <p className="no-data">No employees found.</p>
      )}

      <div className="link-wrapper">
        <a href="/" className="link">Home</a>
      </div>
    </div>
  );
}

export default EmployeeList;
