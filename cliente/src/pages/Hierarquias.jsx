import React, { Fragment } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HierarquiasPage = () => {
    return (
        <Fragment>
            <header className="home-header text-center py-4 bg-primary text-white">
                <h1>Bem-vindo ao Sistema de Finanças Pessoais</h1>
                <p>Gerencie suas finanças de forma simples e eficiente.</p>
            </header>

            <main>
                <Container className="mt-5">

                </Container>
            </main>

            <footer className="home-footer text-center py-3 mt-5 bg-light text-secondary">
                <p>&copy; {new Date().getFullYear()} Sistema de Finanças Pessoais. Todos os direitos reservados.</p>
            </footer>
        </Fragment>
    );
};

export default HierarquiasPage;
