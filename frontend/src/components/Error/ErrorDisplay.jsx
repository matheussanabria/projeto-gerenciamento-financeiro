// src/components/Error/ErrorDisplay.jsx
import React from 'react';
import { Alert } from 'react-bootstrap';

export const ErrorDisplay = ({ message }) => (
  <Alert variant="danger" className="my-4">
    <Alert.Heading>Erro ao carregar dados</Alert.Heading>
    <p>{message}</p>
    <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
  </Alert>
);