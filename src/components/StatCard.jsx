const StatCard = ({ icon, value, label, subtitle, highlight = false }) => {
  return (
    <div className={`card ${highlight ? 'border-primary' : ''}`} style={{ height: '100%' }}>
      <div className="d-flex flex-column">
        <div className="mb-2" style={{ color: 'var(--accent)' }}>
          {icon}
        </div>
        <div className="mb-1">
          <h3 className="h2 mb-0 fw-bold">{value}</h3>
        </div>
        <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
          {label}
        </p>
        {subtitle && (
          <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
