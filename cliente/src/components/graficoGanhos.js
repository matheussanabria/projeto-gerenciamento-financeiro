import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoPizzaGanhos = ({ dadosGanhosPorClasse }) => {
    // Verifica se dadosGanhosPorClasse é um objeto válido e não está vazio
    if (!dadosGanhosPorClasse || typeof dadosGanhosPorClasse !== 'object' || Object.keys(dadosGanhosPorClasse).length === 0) {
        return <p>Dados de ganhos não disponíveis</p>;
    }

    // Extrair classes e valores
    const labels = Object.keys(dadosGanhosPorClasse);
    const valores = Object.values(dadosGanhosPorClasse);

    // Configuração do gráfico
    const data = {
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
    };

    // Opções de customização
    const options = {
        plugins: {
            legend: {
                position: 'top', // Define a posição da legenda
                labels: {
                    usePointStyle: true, // Usa círculos pequenos ao invés de quadrados na legenda
                    padding: 12, // Ajusta o espaçamento entre os itens da legenda
                    boxWidth: 10, // Largura do quadrado/círculo da legenda
                    font: {
                        size: 14, // Tamanho da fonte da legenda
                    },
                    generateLabels: (chart) => {
                        const data = chart.data;
                        return data.labels.map((label, i) => ({
                            text: `${label}`, // Exibe o valor com "R$" na legenda
                            fillStyle: data.datasets[0].backgroundColor[i], // Cor do círculo na legenda
                            strokeStyle: data.datasets[0].backgroundColor[i], // Cor do contorno
                            pointStyle: 'rect', // Define a forma como um retângulo na legenda
                        }));
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const valor = tooltipItem.raw.toFixed(2); // Formatar valor com 2 casas decimais
                        return ` R$ ${valor}`; // Adicionar "R$" antes do valor na tooltip
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
