import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoPizzaGanhos = ({ dadosGanhosPorClasse }) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Ganhos por Classe',
                data: [],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                hoverOffset: 4,
            },
        ],
    });

    // Atualiza os dados do gráfico sempre que dadosGanhosPorClasse mudar
    useEffect(() => {
        if (!dadosGanhosPorClasse || typeof dadosGanhosPorClasse !== 'object' || Object.keys(dadosGanhosPorClasse).length === 0) {
            // Se não houver dados, define os valores padrão
            setData({
                labels: [],
                datasets: [
                    {
                        label: 'Ganhos por Classe',
                        data: [],
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40'
                        ],
                        hoverOffset: 4,
                    },
                ],
            });
            return;
        }

        // Extrai classes e valores
        const labels = Object.keys(dadosGanhosPorClasse);
        const valores = Object.values(dadosGanhosPorClasse);

        // Atualiza os dados do gráfico
        setData({
            labels: labels,
            datasets: [
                {
                    label: 'Ganhos por Classe',
                    data: valores,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ],
                    hoverOffset: 4,
                },
            ],
        });
    }, [dadosGanhosPorClasse]); // Dependência no dadosGanhosPorClasse

    // Opções de customização
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 12,
                    boxWidth: 10,
                    font: {
                        size: 14,
                    },
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const valor = tooltipItem.raw.toFixed(2);
                        return ` R$ ${valor}`;
                    }
                }
            }
        }
    };

    return (
        <div>
            <h4>Distribuição de Ganhos por Classe</h4>
            <Pie style={{ margin: 'auto' }} data={data} options={options} />
        </div>
    );
};

export default GraficoPizzaGanhos;
