import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageChart = ({ repositories }) => {
  const chartData = useMemo(() => {
    if (!repositories || repositories.length === 0) {
      return null;
    }

    const languageCount = {};
    repositories.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    const total = Object.values(languageCount).reduce((sum, count) => sum + count, 0);
    
    const sortedLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    const colors = [
      '#0366d6',
      '#2ea44f',
      '#6f42c1',
      '#d73a49',
      '#e36209',
      '#1f2428'
    ];

    return {
      labels: sortedLanguages.map(([lang]) => lang),
      datasets: [{
        data: sortedLanguages.map(([, count]) => ((count / total) * 100).toFixed(1)),
        backgroundColor: colors,
        borderColor: colors.map(color => color),
        borderWidth: 1
      }]
    };
  }, [repositories]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'var(--text-primary)',
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'var(--surface)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-secondary)',
        borderColor: 'var(--border)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    cutout: '65%'
  }), []);

  if (!chartData || chartData.labels.length === 0) {
    return (
      <div className="card" style={{ height: '300px' }}>
        <div className="d-flex align-items-center justify-content-center h-100">
          <p className="text-muted mb-0">No language data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ height: '300px' }}>
      <h5 className="mb-3">Language Distribution</h5>
      <div style={{ height: '220px', position: 'relative' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LanguageChart;
