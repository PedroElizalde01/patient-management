import { useState, useMemo } from 'react';
import './App.css';
import {
  PatientCard,
  PatientsGrid,
  Searchbar,
  Button,
  PatientFormModal,
} from './components';
import { type Patient } from './types';
import { useDebounce } from './hooks/useDebounce';
import { usePatients } from './hooks/usePatients';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    patients,
    loading,
    error,
    refetch,
    deletePatient,
    updatePatient,
    addPatient,
  } = usePatients();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredPatients = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return patients;
    }

    const query = debouncedSearchQuery.toLowerCase();
    return patients.filter((patient: Patient) =>
      patient.name.toLowerCase().includes(query)
    );
  }, [debouncedSearchQuery, patients]);

  if (loading) {
    return (
      <div className="app-container">
        <div className="app-header-section">
          <header className="app-header">
            <h1>Patient Management System</h1>
          </header>
        </div>
        <main className="app-main">
          <div className="no-results">
            <p>Loading patients...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="app-header-section">
          <header className="app-header">
            <h1>Patient Management System</h1>
          </header>
        </div>
        <main className="app-main">
          <div className="no-results">
            <p>Error loading patients: {error.message}</p>
            <button onClick={refetch}>Retry</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="app-header-section">
        <header className="app-header">
          <h1>Patient Management System</h1>
        </header>

        <div className="app-searchbar">
          <div className="searchbar-container">
            <Searchbar
              value={searchQuery}
              onChange={setSearchQuery}
              showResults={debouncedSearchQuery.length > 0}
              resultsCount={filteredPatients.length}
            />
            <Button
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              style={{ whiteSpace: 'nowrap' }}
            >
              + Add Patient
            </Button>
          </div>
        </div>
      </div>

      <main className="app-main">
        <PatientsGrid>
          {filteredPatients.map((patient: Patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              shadow
              onDelete={deletePatient}
              onUpdate={updatePatient}
            />
          ))}
        </PatientsGrid>

        {filteredPatients.length === 0 && debouncedSearchQuery && (
          <div className="no-results">
            <p>No patients found matching "{debouncedSearchQuery}"</p>
            <p className="no-results-subtitle">Try a different search term</p>
          </div>
        )}
      </main>

      <PatientFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={addPatient}
        onSave={updatePatient}
      />
    </div>
  );
}

export default App;
