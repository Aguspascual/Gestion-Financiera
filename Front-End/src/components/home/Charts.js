import React from 'react';
import ChartSlider from './ChartsSlider';
import './Charts.css';

function Charts() {
  const chartData = [
    {
      type: 'line',
      title: 'Ventas Mensuales',
      description: 'Los gráficos de líneas son ideales para mostrar tendencias a lo largo del tiempo y series de datos continuas. Permiten visualizar la evolución de un conjunto de datos a lo largo de un intervalo, destacando patrones, fluctuaciones y tendencias, lo que facilita la identificación de comportamientos a largo plazo y la predicción de valores futuros.',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Ventas',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    },
    {
      type: 'bar',
      title: 'Egresos por Categoria',
      description: 'Los gráficos de barras son excelentes para comparar cantidades en distintas categorías, ya que permiten visualizar de manera clara y rápida las diferencias entre los datos. Son especialmente útiles cuando se desea mostrar la distribución de valores en grupos específicos, facilitando la identificación de tendencias, patrones y variaciones.',
      data: {
        labels: ['Electronica', 'Ropa', 'Comida', 'Libros'],
        datasets: [{
          label: 'Revenue',
          data: [300, 450, 200, 150],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ]
        }]
      }
    },
    {
      type: 'pie',
      title: 'Ingresos',
      description: 'Los gráficos circulares son ideales para mostrar partes de un todo y distribuciones porcentuales. Se utilizan mejor cuando se tiene una pequeña cantidad de categorías que suman el 100 %, como la participación en el mercado o la asignación presupuestaria.',
      data: {
        labels: ['Producto A', 'Producto B', 'Producto C'],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ]
        }]
      }
    },
    {
      type: 'doughnut',
      title: 'Customer Demographics',
      description: 'Los gráficos de anillos, similares a los gráficos circulares, muestran relaciones entre las partes y el todo, pero con una mayor eficiencia espacial. Son ideales para datos jerárquicos o cuando se desea mostrar información adicional en el centro.',
      data: {
        labels: ['18-24', '25-34', '35-44', '45+'],
        datasets: [{
          data: [120, 230, 180, 90],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ]
        }]
      }
    }
  ];

  return (
    <div>
      <h1>Charts</h1>
      <p className="subtitle">Los gráficos (charts) son representaciones visuales de datos que facilitan la comprensión de la información. En nuestra plataforma, ofrecemos una variedad de gráficos:</p>
      <div className="section-header">
        <div className="divider"></div>
      </div>
      <div className="app">
        <ChartSlider charts={chartData} />
      </div>
    </div>
  );
}

export default Charts;