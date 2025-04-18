import { useSelector } from 'react-redux';
import { useState } from 'react';
import CustomDataTable from '../../components/CustomDataTable';
import './style.css';

/**
 * Page listant tous les employés enregistrés.
 *
 * Affiche un champ de recherche global permettant de filtrer dynamiquement les employés
 * par n'importe quel champ (nom, département, ville, etc.).
 * Si aucun employé n'est trouvé, un message est affiché.
 *
 * @component
 */
function EmployeeList() {
  const employees = useSelector((state) => state.employee.list);
  const [search, setSearch] = useState('');

  const columns = [
    { name: 'First Name', selector: row => row.firstName, sortable: true },
    { name: 'Last Name', selector: row => row.lastName, sortable: true },
    { name: 'Start Date', selector: row => row.startDate, sortable: true },
    { name: 'Department', selector: row => row.department, sortable: true },
    { name: 'Date of Birth', selector: row => row.dateOfBirth, sortable: true },
    { name: 'Street', selector: row => row.street },
    { name: 'City', selector: row => row.city },
    { name: 'State', selector: row => row.state },
    { name: 'Zip Code', selector: row => row.zipCode }
  ];

  const query = search.toLowerCase();

  const filteredEmployees = employees.filter((emp) =>
    emp.firstName.toLowerCase().includes(query) ||
    emp.lastName.toLowerCase().includes(query) ||
    emp.department.toLowerCase().includes(query) ||
    emp.street.toLowerCase().includes(query) ||
    emp.city.toLowerCase().includes(query) ||
    emp.state.toLowerCase().includes(query) ||
    emp.zipCode.toString().includes(query) ||
    emp.dateOfBirth.includes(query) ||
    emp.startDate.includes(query) ||
    emp.startDate.slice(0, 4).includes(query)
  );

  return (
    <div className="list-container">
      <h1 id="employee-list-title">Current Employees</h1>

      {employees.length > 0 ? (
        <>
          <input
            type="text"
            className="search-bar"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search employees by any field"
          />

          <CustomDataTable
            columns={columns}
            data={filteredEmployees}
          />
        </>
      ) : (
        <p className="no-data">No employees found.</p>
      )}

      <div className="link-wrapper">
        <a href="/" className="link">Home</a>
      </div>
    </div>
  );
}

export default EmployeeList;
