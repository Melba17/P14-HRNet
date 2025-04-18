import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import NotFound from './pages/NotFound';

/**
 * Composant racine de l'application.
 *
 * Définit la structure de navigation avec React Router :
 * - `/` rend la page de création d'employé.
 * - `/employee-list` rend la liste des employés.
 * - Toute autre route affiche une page 404 personnalisée.
 *
 * @component
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
