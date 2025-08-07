// Client-side service for API communication
import { useState, useEffect } from 'react';
import { Student } from '@/types';

const API_BASE = '/api';

// Student API service
export const studentService = {
  // Get all students
  async getAll(params?: {
    search?: string;
    tpqGroup?: string;
    level?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.tpqGroup) queryParams.append('tpqGroup', params.tpqGroup);
    if (params?.level) queryParams.append('level', params.level);

    const url = `${API_BASE}/students${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    
    return response.json();
  },

  // Get student by ID
  async getById(id: string) {
    const response = await fetch(`${API_BASE}/students?id=${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch student');
    }
    
    return response.json();
  },

  // Create new student
  async create(studentData: Partial<Student>) {
    const response = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create student');
    }
    
    return response.json();
  },

  // Update student
  async update(id: string, studentData: Partial<Student>) {
    const response = await fetch(`${API_BASE}/students`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...studentData }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update student');
    }
    
    return response.json();
  },

  // Delete student
  async delete(id: string) {
    const response = await fetch(`${API_BASE}/students?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete student');
    }
    
    return response.json();
  },

  // Get statistics
  async getStats() {
    const response = await fetch(`${API_BASE}/students/stats`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    
    return response.json();
  },
};

// Hook for using student data
export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async (params?: Parameters<typeof studentService.getAll>[0]) => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentService.getAll(params);
      setStudents(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    error,
    refetch: fetchStudents,
  };
}

// Hook for student statistics
export function useStudentStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await studentService.getStats();
        setStats(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}
