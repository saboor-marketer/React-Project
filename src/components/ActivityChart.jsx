import { useMemo } from 'react';
import { getActivityDistribution } from '../utils/analytics.js';

const ActivityChart = ({ repositories }) => {
  const activityData = useMemo(() => {
    if (!repositories || repositories.length === 0) {
      return [];
    }
    return getActivityDistribution(repositories);
  }, [repositories]);

  const maxCount = useMemo(() => {
    if (activityData.length === 0) return 0;
    return Math.max(...activityData.map(item => item.count));
  }, [activityData]);

  if (activityData.length === 0) {
    return (
      <div className="card" style={{ height: '300px' }}>
        <div className="d-flex align-items-center justify-content-center h-100">
          <p className="text-muted mb-0">No activity data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ height: '300px' }}>
      <h5 className="mb-4">Repository Activity</h5>
      <div className="d-flex flex-column gap-3">
        {activityData.map((item, index) => {
          const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
          const colors = ['var(--success)', 'var(--info)', 'var(--warning)', 'var(--text-muted)'];
          
          return (
            <div key={index} className="d-flex align-items-center gap-3">
              <div style={{ minWidth: '140px', fontSize: '0.85rem' }}>
                <span className="text-secondary">{item.label}</span>
              </div>
              <div className="flex-grow-1">
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: colors[index]
                    }}
                    aria-valuenow={item.count}
                    aria-valuemin="0"
                    aria-valuemax={maxCount}
                  ></div>
                </div>
              </div>
              <div style={{ minWidth: '40px', textAlign: 'right', fontSize: '0.9rem' }}>
                <span className="fw-semibold">{item.count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityChart;
