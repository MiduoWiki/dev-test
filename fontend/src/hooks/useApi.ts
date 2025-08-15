import { useEffect, useRef, useState } from 'react';

interface UseApiReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  fetchData: (url: string) => void;
}

export const useApi = <T,>(): UseApiReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const dataRef = useRef<T[]>([]);

  // Update dataRef when data changes
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const fetchData = (url: string) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    setLoading(true);
    setError(null);

    fetch(url, { signal: newAbortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        // Check if returned data is different from current data
        if (JSON.stringify(responseData) !== JSON.stringify(dataRef.current)) {
          setData(responseData);
        }
        setLoading(false);
      })
      .catch((err) => {
        // Ignore aborted request errors
        if (err.name === 'AbortError') {
          console.log('Request aborted');
          return;
        }
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  return { data, loading, error, setError, fetchData };
};