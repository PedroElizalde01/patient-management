import { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  PatientCard,
  PatientsGrid,
  PatientFormModal,
  Toolbar,
  LoadingState,
  ErrorState,
  EmptyState,
  AppLayout,
} from './components';
import { type Patient } from './types';
import { useDebounce } from './hooks/useDebounce';
import { usePatients } from './hooks/usePatients';
import { usePatientFilters } from './hooks/usePatientFilters';
import { type SortOption } from './constants/sortOptions';

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
  const filteredAndSortedPatients = usePatientFilters(
    patients,
    debouncedSearchQuery,
    sortBy
  );

  if (loading) {
    return (
      <AppLayout>
        <LoadingState />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <ErrorState
          message={`Error loading patients: ${error.message}`}
          onRetry={refetch}
        />
      </AppLayout>
    );
  }

  const showEmptyState =
    filteredAndSortedPatients.length === 0 && debouncedSearchQuery;

  return (
    <AppLayout
      toolbar={
        <Toolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showResults={debouncedSearchQuery.length > 0}
          resultsCount={filteredAndSortedPatients.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onAddPatient={() => setIsAddModalOpen(true)}
        />
      }
    >
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

      {showEmptyState && <EmptyState searchQuery={debouncedSearchQuery} />}

      <PatientFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={addPatient}
        onSave={updatePatient}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AppLayout>
  );
}

export default App;
