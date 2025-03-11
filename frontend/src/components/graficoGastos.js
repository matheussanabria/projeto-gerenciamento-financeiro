import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoPizzaGastos = ({ dadosGastosPorClasse }) => {
    // Extrair classes e valores
    const labels = Object.keys(dadosGastosPorClasse);
    const valores = Object.values(dadosGastosPorClasse);

    // Configuração do gráfico
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Gastos por Classe',
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
    };

    // Opções de customização
    const options = {
        plugins: {
            legend: {
                position: 'top', // Define a posição da legenda
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    boxWidth: 10,
                    font: {
                        size: 14,
                    },
                    generateLabels: (chart) => {
                        const data = chart.data;
                        return data.labels.map((label, i) => ({
                            text: `${label}`, // Exibe o nome da classe
                            fillStyle: data.datasets[0].backgroundColor[i],
                            strokeStyle: data.datasets[0].backgroundColor[i],
                            pointStyle: 'rect',
                        }));
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const valor = tooltipItem.raw.toFixed(2); // Formatar valor com 2 casas decimais
                        return `R$ ${valor}`; // Adicionar "R$" antes do valor na tooltip
                    }
                }
            }
        }
    };

    return (
        <div>
            <h4 style={{ textAlign: 'center' }}>Distribuição de Gastos por Classe</h4>
            <Pie style={{ margin: 'auto' }} data={data} options={options} />
        </div>
    );
};

export default GraficoPizzaGastos;
