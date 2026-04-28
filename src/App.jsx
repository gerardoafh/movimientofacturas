import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  RefreshCw, 
  Search
} from 'lucide-react';
import TablaResumen from './TablaResumen';
import TablaDetalle from './TablaDetalle';
import { useInvoiceSync } from './useInvoiceSync';
import { useInvoiceData } from './useInvoiceData';

/**
 * Dashboard de Facturación OpenClaw Sync
 * Versión React + Tailwind - Estilo Industrial "Excel-Like"
 */
export default function App() {
  // --- ESTADOS ---
  const [empresa, setEmpresa] = useState('adEMPRESANUEVACHEONG');
  const [filterText, setFilterText] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // --- CUSTOM HOOK ---
  const { invoices: allInvoices, isLoading, status, fetchInvoices } = useInvoiceSync();

  // Carga inicial automática al montar el componente
  useEffect(() => {
    fetchInvoices(empresa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- LÓGICA DE FILTRADO Y AGRUPACIÓN (Imágenes 1 y 2) ---
  const { detailedRows, summaryData, granTotal } = useInvoiceData(
    allInvoices, 
    filterText, 
    dateStart, 
    dateEnd
  );

  return (
    <div className="bg-slate-100 text-slate-900 min-h-screen w-full flex flex-col font-sans antialiased">
      
      {/* Header Superior */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm w-full">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-md text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-slate-800">
              OPENCLAW <span className="text-blue-600 italic">SYNC</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border
              ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                status.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
              <span className={`w-2 h-2 rounded-full ${status.type === 'success' ? 'bg-emerald-500' : status.type === 'error' ? 'bg-red-500' : 'bg-slate-300'}`}></span>
              {status.message}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto w-full px-6 py-8 flex-1">
        
        {/* Panel de Controles */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-wrap items-end gap-6 text-left">
          <div className="flex-none">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Directorio Empresa</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold outline-none w-48 focus:ring-2 focus:ring-blue-500 transition-all" 
              />
              <button 
                onClick={() => fetchInvoices(empresa)} 
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all text-xs font-bold uppercase tracking-wider disabled:opacity-50 shadow-lg shadow-blue-100"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Sincronizar API
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-[300px]">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Búsqueda Inteligente</label>
            <div className="relative">
              <Search className="absolute left-4 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="No. Parte / Factura / RFC / Cliente..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-2 w-full text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              />
            </div>
          </div>

          <div className="flex-none">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Rango de Fecha</label>
            <div className="flex gap-2">
              <input 
                type="date" 
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              />
              <input 
                type="date" 
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              />
            </div>
          </div>
        </div>

        {/* --- SECCIÓN 1: RESUMEN --- */}
        <TablaResumen summaryData={summaryData} granTotal={granTotal} />

        {/* --- SECCIÓN 2: DETALLE GLOBAL --- */}
        <TablaDetalle detailedRows={detailedRows} />
      </main>
    </div>
  );
}