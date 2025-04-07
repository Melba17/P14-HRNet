import { useSelector } from 'react-redux';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import './style.css';

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

  const filteredEmployees = employees.filter((emp) => {
    const query = search.toLowerCase();
    return (
      emp.firstName.toLowerCase().includes(query) ||
      emp.lastName.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query) ||
      emp.street.toLowerCase().includes(query) ||
      emp.city.toLowerCase().includes(query) ||
      emp.state.toLowerCase().includes(query) ||
      emp.zipCode.toString().includes(query) ||
      emp.dateOfBirth.includes(query) ||
      emp.startDate.includes(query) ||
      emp.startDate.slice(0, 4).includes(query) // année d'embauche
    );
  });

  return (
    <div className="list-container">
      <h1>Current Employees</h1>

      {employees.length > 0 ? (
        <>
          <input
            type="text"
            placeholder="Search employees..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DataTable
            columns={columns}
            data={filteredEmployees}
            pagination
            highlightOnHover
            responsive
            striped
            noDataComponent={<p className="no-data">No employees found.</p>}
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
