import { useState, useEffect } from 'react';
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
      setError(
        err instanceof Error ? err : new Error('Failed to fetch patients')
      );
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
  };

  const updatePatient = (id: string, updatedData: Partial<Patient>) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id ? { ...patient, ...updatedData } : patient
      )
    );
  };

  const deletePatient = (id: string) => {
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== id)
    );
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
