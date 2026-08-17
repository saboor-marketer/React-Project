const LoadingSkeleton = () => {
  return (
    <div className="container py-4">
      {/* Profile Skeleton */}
      <div className="card mb-4">
        <div className="d-flex gap-4 align-items-center">
          <div className="skeleton rounded-circle" style={{ width: '80px', height: '80px' }}></div>
          <div className="flex-grow-1">
            <div className="skeleton mb-2" style={{ width: '200px', height: '28px' }}></div>
            <div className="skeleton mb-3" style={{ width: '150px', height: '20px' }}></div>
            <div className="skeleton mb-2" style={{ width: '300px', height: '16px' }}></div>
            <div className="skeleton" style={{ width: '250px', height: '16px' }}></div>
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="row g-3 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="col-6 col-md-4 col-lg-2">
            <div className="card" style={{ height: '100%' }}>
              <div className="skeleton mb-2" style={{ width: '32px', height: '32px' }}></div>
              <div className="skeleton mb-1" style={{ width: '80px', height: '32px' }}></div>
              <div className="skeleton" style={{ width: '120px', height: '16px' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Repositories Skeleton */}
      <div className="row g-3 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-md-4">
            <div className="card" style={{ height: '100%' }}>
              <div className="skeleton mb-3" style={{ width: '48px', height: '48px' }}></div>
              <div className="skeleton mb-2" style={{ width: '60%', height: '24px' }}></div>
              <div className="skeleton mb-3" style={{ width: '100%', height: '16px' }}></div>
              <div className="skeleton mb-3" style={{ width: '40%', height: '20px' }}></div>
              <div className="skeleton mb-3" style={{ width: '100%', height: '8px' }}></div>
              <div className="skeleton" style={{ width: '80px', height: '16px' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card" style={{ height: '300px' }}>
            <div className="skeleton mb-3" style={{ width: '40%', height: '24px' }}></div>
            <div className="skeleton" style={{ width: '100%', height: '220px' }}></div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card" style={{ height: '300px' }}>
            <div className="skeleton mb-3" style={{ width: '40%', height: '24px' }}></div>
            <div className="skeleton" style={{ width: '100%', height: '220px' }}></div>
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="card">
        <div className="skeleton mb-3" style={{ width: '30%', height: '24px' }}></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="d-flex gap-3 mb-3 align-items-center">
            <div className="skeleton" style={{ width: '25%', height: '40px' }}></div>
            <div className="skeleton" style={{ width: '15%', height: '40px' }}></div>
            <div className="skeleton" style={{ width: '10%', height: '40px' }}></div>
            <div className="skeleton" style={{ width: '10%', height: '40px' }}></div>
            <div className="skeleton" style={{ width: '10%', height: '40px' }}></div>
            <div className="skeleton" style={{ width: '10%', height: '40px' }}></div>
            <div className="skeleton" style={{ width: '10%', height: '40px' }}></div>
            <div className="skeleton" style={{ width: '15%', height: '40px' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
