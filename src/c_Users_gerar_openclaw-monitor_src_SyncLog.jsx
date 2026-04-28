import React from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";

const statusIcons = {
  success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
};

export default function SyncLog({ log }) {
  return (
    <div className="flex-1 min-w-[300px]">
      <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">
        Log de Sincronización
      </label>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 h-[84px] overflow-y-auto text-xs scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-50">
        {log.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400 italic gap-2">
            <Info className="w-4 h-4" />
            <span>No hay registros de sincronización.</span>
          </div>
        ) : (
          <ul className="space-y-2">
            {log.map((entry, index) => (
              <li key={index} className="flex items-start gap-2.5 font-medium">
                <div className="flex-shrink-0 pt-0.5">{statusIcons[entry.type]}</div>
                <div className="flex-1">
                  <p className={`font-bold ${entry.type === 'success' ? 'text-slate-700' : 'text-red-600'}`}>
                    {entry.message}
                  </p>
                  <p className="text-slate-400 text-[10px] font-mono">{entry.timestamp.toLocaleTimeString()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}