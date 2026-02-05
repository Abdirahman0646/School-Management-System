import React from 'react';

export default function DataTable({ columns, data }) {
  return (
    <div className="table-card">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center text-muted">No records</td>
            </tr>
          )}
          {data.map(row => (
            <tr key={row.id}>
              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
