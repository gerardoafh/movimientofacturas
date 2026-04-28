import { useMemo } from 'react';

export function useInvoiceData(allInvoices, filterText, dateStart, dateEnd) {
  return useMemo(() => {
    const rows = [];
    const summaryMap = new Map();
    let total = 0;

    allInvoices.forEach(doc => {
      // Parseo de fecha dd/mm/yyyy para filtros
      // Se agrega T00:00:00 para evitar que la fecha se atrase un día por UTC
      const parts = doc.fecha.split('/');
      const invDate = parts.length === 3 ? new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`) : new Date(doc.fecha);

      doc.conceptos.forEach((mov, index) => {
        const matchesSearch = 
          mov.codigoProducto.toLowerCase().includes(filterText.toLowerCase()) || 
          doc.folio.includes(filterText) || 
          (doc.rfc && doc.rfc.toLowerCase().includes(filterText.toLowerCase())) ||
          doc.cliente.toLowerCase().includes(filterText.toLowerCase());

        const matchesDate = 
          (!dateStart || invDate >= new Date(dateStart)) && 
          (!dateEnd || invDate <= new Date(dateEnd));

        if (matchesSearch && matchesDate) {
          // Aplanado para Tabla de Detalle
          rows.push({
            fecha: doc.fecha,
            factura: doc.folio,
            rfc: doc.rfc || 'N/A',
            codigo: mov.codigoProducto,
            nombre: mov.nombreProducto,
            cantidad: mov.cantidad,
            precio: mov.precioUnitario,
            monto: mov.importe,
            metodoPago: doc.metodoPago || 'PPD',
            uuid: doc.uuid
          });

          // Agrupado para Tabla de Resumen
          if (!summaryMap.has(mov.codigoProducto)) {
            summaryMap.set(mov.codigoProducto, {
              codigo: mov.codigoProducto,
              nombre: mov.nombreProducto,
              precio: mov.precioUnitario,
              totalQty: 0,
              totalAmt: 0
            });
          }
          const group = summaryMap.get(mov.codigoProducto);
          group.totalQty += mov.cantidad;
          group.totalAmt += mov.importe;
          total += mov.importe;
        }
      });
    });

    return { detailedRows: rows, summaryData: Array.from(summaryMap.values()), granTotal: total };
  }, [allInvoices, filterText, dateStart, dateEnd]);
}