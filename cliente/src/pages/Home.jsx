import React, { Fragment } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Fragment>
            <header className="home-header text-center py-4 bg-primary text-white">
                <h1>Bem-vindo ao Sistema de Finanças Pessoais</h1>
                <p>Gerencie suas finanças de forma simples e eficiente.</p>
            </header>

            <main>
                <Container className="mt-5">
                    <Row className="text-center">
                        <Col md={4} className="mb-4">
                            <div className="home-feature">
                                <h3>Transações</h3>
                                <p>Visualize e gerencie todas as suas transações financeiras.</p>
                                <Button variant="primary" as={Link} to="/transacoes">
                                    Ver Transações
                                </Button>
                            </div>
                        </Col>

                        <Col md={4} className="mb-4">
                            <div className="home-feature">
                                <h3>Relatórios</h3>
                                <p>Acompanhe gráficos e relatórios detalhados das suas finanças.</p>
                                <Button variant="primary" as={Link} to="/relatorios">
                                    Ver Relatórios
                                </Button>
                            </div>
                        </Col>

                        <Col md={4} className="mb-4">
                            <div className="home-feature">
                                <h3>Configurações</h3>
                                <p>Personalize suas preferências e dados do sistema.</p>
                                <Button variant="primary" as={Link} to="/configuracoes">
                                    Configurações
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <Row className="text-center mt-4">
                        <Col>
                            <h4>Pronto para começar?</h4>
                            <Button variant="success" as={Link} to="/transacoes">
                                Começar Agora
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </main>

            <footer className="home-footer text-center py-3 mt-5 bg-light text-secondary">
                <p>&copy; {new Date().getFullYear()} Sistema de Finanças Pessoais. Todos os direitos reservados.</p>
            </footer>
        </Fragment>
    );
};

export default HomePage;
