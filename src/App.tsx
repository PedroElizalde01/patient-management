import { useState, useMemo } from 'react';
import './App.css';
import { PatientCard, PatientsGrid, Searchbar } from './components';
import { mockPatients } from './data/mockPatients';
import { type Patient } from './types';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredPatients = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return mockPatients;
    }

    const query = debouncedSearchQuery.toLowerCase();
    return mockPatients.filter((patient: Patient) =>
      patient.name.toLowerCase().includes(query)
    );
  }, [debouncedSearchQuery]);

  return (
    <div className="app-container">
      <div className="app-header-section">
        <header className="app-header">
          <h1>Patient Management System</h1>
        </header>

        <div className="app-searchbar">
          <Searchbar
            value={searchQuery}
            onChange={setSearchQuery}
            showResults={debouncedSearchQuery.length > 0}
            resultsCount={filteredPatients.length}
          />
        </div>
      </div>

      <main className="app-main">
        <PatientsGrid>
          {filteredPatients.map((patient: Patient) => (
            <PatientCard key={patient.id} patient={patient} shadow />
          ))}
        </PatientsGrid>

        {filteredPatients.length === 0 && debouncedSearchQuery && (
          <div className="no-results">
            <p>No patients found matching "{debouncedSearchQuery}"</p>
            <p className="no-results-subtitle">Try a different search term</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App
