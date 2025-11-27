import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './App.css';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PatientCard,
  PatientsGrid,
  PatientFormModal,
  Toolbar,
  LoadingState,
  ErrorState,
  EmptyState,
  AppLayout,
  Button,
} from './components';
import { type Patient } from './types';
import { useDebounce } from './hooks/useDebounce';
import { usePatients } from './hooks/usePatients';
import { usePatientFilters } from './hooks/usePatientFilters';
import { type SortOption } from './constants/sortOptions';
import { patientCardAnimation } from './utils/animations';

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

  const showNoPatients = patients.length === 0 && !debouncedSearchQuery;

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
      {showNoPatients ? (
        <div className="no-patients-state">
          <p className="no-patients-title">No patients yet</p>
          <p className="no-patients-subtitle">
            Start by adding your first patient to the system
          </p>
          <Button
            style={{ marginRight: '12px', gap: '8px' }}
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            className="add-patient-btn"
          >
            <MdAdd size={20} />
            <span className="btn-text">Add Patient</span>
          </Button>
        </div>
      ) : (
        <PatientsGrid>
          <AnimatePresence mode="popLayout">
            {filteredAndSortedPatients.map((patient: Patient) => (
              <motion.div
                key={patient.id}
                layout
                initial={patientCardAnimation.initial}
                animate={patientCardAnimation.animate}
                exit={patientCardAnimation.exit}
              >
                <PatientCard
                  patient={patient}
                  shadow
                  onDelete={deletePatient}
                  onUpdate={updatePatient}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </PatientsGrid>
      )}

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
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
        limit={3}
        style={{ zIndex: 9999 }}
      />
    </AppLayout>
  );
}

export default App;
