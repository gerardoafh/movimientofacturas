import React from 'react';
import { Layers, Inbox } from 'lucide-react';

export default function TablaResumen({ summaryData, granTotal }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4 ml-1">
        <Layers className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Resumen por Número de Parte</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
              <th className="py-3 px-6 w-16 text-center border-r border-slate-800 uppercase">NO</th>
              <th className="py-3 px-6 border-r border-slate-800 uppercase">No. Parte</th>
              <th className="py-3 px-6 border-r border-slate-800 uppercase">Descripción</th>
              <th className="py-3 px-6 text-right border-r border-slate-800 uppercase">Precio Prom.</th>
              <th className="py-3 px-6 text-right border-r border-slate-800 uppercase">TTL Qty</th>
              <th className="py-3 px-6 text-right uppercase">Total Amt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            {summaryData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-20 text-slate-400 italic flex flex-col items-center gap-2">
                   <Inbox className="w-8 h-8 opacity-20" />
                   No hay datos sincronizados del SDK
                </td>
              </tr>
            ) : (
              summaryData.map((item, i) => (
                <tr key={item.codigo} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-3 px-6 text-center text-slate-400 font-bold border-r border-slate-50">{i + 1}</td>
                  <td className="py-3 px-6 font-black text-slate-900 border-r border-slate-50 group-hover:text-blue-600">{item.codigo}</td>
                  <td className="py-3 px-6 font-medium text-slate-500 border-r border-slate-50">{item.nombre}</td>
                  <td className="py-3 px-6 text-right text-slate-400 font-mono border-r border-slate-50">
                    $ {item.precio.toLocaleString(undefined, { minimumFractionDigits: 4 })}
                  </td>
                  <td className="py-3 px-6 text-right font-black text-slate-900 border-r border-slate-50">{item.totalQty.toLocaleString()}</td>
                  <td className="py-3 px-6 text-right font-black text-blue-600">
                    $ {item.totalAmt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="bg-slate-50 border-t-2 border-slate-200">
            <tr>
              <td colSpan="5" className="text-right py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total General del Periodo</td>
              <td className="text-right py-4 px-6 text-lg font-black text-slate-900">
                $ {granTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}