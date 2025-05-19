import DataTable from 'react-data-table-component';
import './style.css';
import PropTypes from 'prop-types';

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
  // Pour l'accessibilité
  const tableTitleId = 'employee-table-title';
  const tableDescId = 'employee-table-description';

  return (
    // Uniquement pour les technologies d'assistance (titre et description)
    <>
      <h2 id={tableTitleId} className="sr-only">Employee Table</h2>
      <p id={tableDescId} className="sr-only">
        This table lists all current employees. You can navigate using arrow keys, and paginate through results.
      </p>

      <DataTable
        columns={columns}
        data={data}
        pagination // Affiche des boutons de pagination pour naviguer entre les pages du tableau (au lieu d’afficher tous les résultats d’un coup)
        highlightOnHover // Met en surbrillance la ligne survolée avec la souris - au départ active un style au survol par défaut, mais ici active .rdt_TableRow:hover dans le css pour un style personnalisé
        responsive
        striped // Colore une ligne sur deux (effet de bandes alternées)
        aria-label="Employee table"
        aria-labelledby={tableTitleId}
        aria-describedby={tableDescId}
        // Si il y a des employés dans redux, mais qu'aucun ne correspond à la recherche 
        noDataComponent={
          <p className="no-data" role="status" aria-live="polite">
            No employees found.
          </p>
        }
      />
    </>
  );
}

// Définition des propTypes pour documenter l’interface du composant et en valider l’usage
CustomDataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      selector: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      sortable: PropTypes.bool,
    })
  ).isRequired,

  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CustomDataTable;
