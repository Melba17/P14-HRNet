import DataTable from 'react-data-table-component';
import './style.css';

/**
 * Composant personnalisé d'affichage de tableau basé sur `react-data-table-component`.
 *
 * Affiche les données dans un tableau interactif avec pagination, mise en surbrillance au survol,
 * lignes alternées rayées, et message personnalisé en cas d'absence de données.
 * Comprend des améliorations d'accessibilité via des attributs ARIA.
 *
 * @component
 * @param {Object[]} columns - Définition des colonnes du tableau, au format attendu par la librairie.
 * @param {Object[]} data - Données à afficher dans le tableau.
 * @returns {JSX.Element} Composant de tableau stylisé avec fonctionnalités intégrées et accessibilité améliorée.
 */
function CustomDataTable({ columns, data }) {
  const tableTitleId = 'employee-table-title';
  const tableDescId = 'employee-table-description';

  return (
    <>
      <h2 id={tableTitleId} className="sr-only">Employee Table</h2>
      <p id={tableDescId} className="sr-only">
        This table lists all current employees. You can navigate using arrow keys, and paginate through results.
      </p>

      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        responsive
        striped
        aria-label="Employee table"
        aria-labelledby={tableTitleId}
        aria-describedby={tableDescId}
        noDataComponent={
          <p className="no-data" role="status" aria-live="polite">
            No employees found.
          </p>
        }
      />
    </>
  );
}

export default CustomDataTable;
