import DataTable from 'react-data-table-component';
import './style.css';

function CustomDataTable({ columns, data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      responsive
      striped
      noDataComponent={<p className="no-data">No employees found.</p>}
    />
  );
}

export default CustomDataTable;
