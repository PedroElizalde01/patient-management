import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPatients } from '../api/patientsApi';
import type { Patient } from '../types';

interface UsePatientsReturn {
  patients: Patient[];
  loading: boolean;
  error: Error | null;
  addPatient: (patientData: Omit<Patient, 'id' | 'createdAt'>) => void;
  updatePatient: (id: string, updatedData: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  refetch: () => Promise<void>;
}

export function usePatients(): UsePatientsReturn {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch patients';
      setError(
        err instanceof Error ? err : new Error('Failed to fetch patients')
      );
      toast.error(`Error loading patients: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setPatients((prevPatients) => [newPatient, ...prevPatients]);
    toast.success(`Patient "${patientData.name}" has been added successfully!`);
  };

  const updatePatient = (id: string, updatedData: Partial<Patient>) => {
    const patientName =
      updatedData.name || patients.find((p) => p.id === id)?.name || 'Patient';

    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id ? { ...patient, ...updatedData } : patient
      )
    );

    toast.success(`Patient "${patientName}" has been updated successfully!`);
  };

  const deletePatient = (id: string) => {
    const patientToDelete = patients.find((p) => p.id === id);

    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== id)
    );

    if (patientToDelete) {
      toast.info(`Patient "${patientToDelete.name}" has been deleted`);
    }
  };

  const refetch = async () => {
    await fetchPatients();
  };

  return {
    patients,
    loading,
    error,
    addPatient,
    updatePatient,
    deletePatient,
    refetch,
  };
}
