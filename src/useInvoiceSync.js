import { useState, useCallback } from 'react';

export function useInvoiceSync() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: 'inactive', message: 'Servicio Inactivo' });

  const fetchInvoices = useCallback(async (empresa) => {
    setIsLoading(true);
    setStatus({ type: 'loading', message: 'Sincronizando...' });

    // Configurar un AbortController para el límite de tiempo (5 minutos = 300,000 ms)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000);

    try {
      // Se recomienda definir VITE_API_URL en un archivo .env
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';
      // Se descargan las facturas filtrando únicamente por el concepto 4, con límite de 10 para pruebas
      const response = await fetch(`${API_BASE_URL}/api/Facturas/${empresa}/descarga?concepto=4&limite=10`, { signal: controller.signal });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Error ${response.status} del servidor`;
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.error) errorMessage = errorJson.error;
        } catch (e) { /* Si no es JSON, ignora */ }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      setInvoices(data);
      setStatus({ type: 'success', message: `SDK Conectado (${data.length} Facturas)` });
    } catch (error) {
      console.error(error);
      // Mostrar mensaje específico si el error fue por tiempo de espera
      if (error.name === 'AbortError') {
        setStatus({ type: 'error', message: 'Tiempo de espera agotado (5 minutos)' });
      } else {
        setStatus({ type: 'error', message: 'Error de enlace con API' });
      }
    } finally {
      clearTimeout(timeoutId); // Limpiar el temporizador para evitar fugas de memoria
      setIsLoading(false);
    }
  }, []);

  return { invoices, isLoading, status, fetchInvoices };
}