// src/components/Loading/LoadingSpinner.jsx
import React from 'react';

export const LoadingSpinner = () => (
  <div className="text-center my-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Carregando...</span>
    </div>
    <p className="mt-2">Carregando transações...</p>
  </div>
);