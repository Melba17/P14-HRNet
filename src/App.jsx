import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import NotFound from './components/NotFound';

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
