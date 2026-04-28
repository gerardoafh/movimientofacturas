import React from 'react';
import { List } from 'lucide-react';

export default function TablaDetalle({ detailedRows }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4 ml-1">
        <List className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Detalle Individual de Movimientos</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <th className="py-4 px-6 uppercase">Fecha</th>
                <th className="py-4 px-6 text-center uppercase">Factura</th>
                <th className="py-4 px-6 uppercase">RFC Cliente</th>
                <th className="py-4 px-6 uppercase">No. Parte</th>
                <th className="py-4 px-6 uppercase">Descripción</th>
                <th className="py-4 px-6 text-right uppercase">Qty</th>
                <th className="py-4 px-6 text-right uppercase">Precio</th>
                <th className="py-4 px-6 text-right uppercase">Monto</th>
                <th className="py-4 px-6 text-center uppercase">Pago</th>
                <th className="py-4 px-6 uppercase">UUID Fiscal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[11px] font-medium text-slate-600">
              {detailedRows.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-24 text-slate-400 italic">
                    Los movimientos de facturación aparecerán aquí después de la sincronización
                  </td>
                </tr>
              ) : (
                detailedRows.map((row, idx) => (
                  <tr key={`${row.factura}-${idx}`} className="hover:bg-blue-50/50 group transition-all">
                    <td className="py-2.5 px-6 font-bold text-slate-500">{row.fecha}</td>
                    <td className="py-2.5 px-6 text-center">
                      <span className="px-2.5 py-1 bg-white text-slate-800 rounded-lg font-black border border-slate-200 shadow-sm group-hover:border-blue-300">
                        {row.factura}
                      </span>
                    </td>
                    <td className="py-2.5 px-6 font-mono text-blue-600 font-bold tracking-tighter">{row.rfc}</td>
                    <td className="py-2.5 px-6 font-black text-slate-900 group-hover:text-blue-600">{row.codigo}</td>
                    <td className="py-2.5 px-6 text-slate-500 max-w-[250px] truncate" title={row.nombre}>{row.nombre}</td>
                    <td className="py-2.5 px-6 text-right font-black text-slate-900">{row.cantidad.toLocaleString()}</td>
                    <td className="py-2.5 px-6 text-right text-slate-400 font-mono">$ {row.precio.toFixed(2)}</td>
                    <td className="py-2.5 px-6 text-right font-black text-slate-900">
                      $ {row.monto.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-6 text-center">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{row.metodoPago}</span>
                    </td>
                    <td className="py-2.5 px-6 font-mono text-[9px] text-slate-300 group-hover:text-slate-500 uppercase tracking-tighter">
                      {row.uuid || 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}