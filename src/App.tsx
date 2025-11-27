import { useState, useMemo } from 'react';
import './App.css';
import {
  PatientCard,
  PatientsGrid,
  Searchbar,
  Button,
  PatientFormModal,
  Dropdown,
} from './components';
import { type Patient } from './types';
import { useDebounce } from './hooks/useDebounce';
import { usePatients } from './hooks/usePatients';

type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'createdAt-asc'
  | 'createdAt-desc'
  | '';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
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

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'createdAt-asc', label: 'Oldest' },
    { value: 'createdAt-desc', label: 'Newest' },
  ];

  const filteredAndSortedPatients = useMemo(() => {
    let result = patients;

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      result = patients.filter((patient: Patient) =>
        patient.name.toLowerCase().includes(query)
      );
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.name.trim().localeCompare(b.name.trim());
          case 'name-desc':
            return b.name.trim().localeCompare(a.name.trim());
          case 'createdAt-asc':
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case 'createdAt-desc':
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          default:
            return 0;
        }
      });
    }

    return result;
  }, [debouncedSearchQuery, patients, sortBy]);

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
              resultsCount={filteredAndSortedPatients.length}
            />
            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value as SortOption)}
              placeholder="Sort by..."
            />
            <Button
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              className="add-patient-btn"
            >
              <span className="btn-icon">+</span>
              <span className="btn-text">Add Patient</span>
            </Button>
          </div>
        </div>
      </div>

      <main className="app-main">
        <PatientsGrid>
          {filteredAndSortedPatients.map((patient: Patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              shadow
              onDelete={deletePatient}
              onUpdate={updatePatient}
            />
          ))}
        </PatientsGrid>

        {filteredAndSortedPatients.length === 0 && debouncedSearchQuery && (
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
