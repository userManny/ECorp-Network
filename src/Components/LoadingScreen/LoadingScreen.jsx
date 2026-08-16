import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="loading-screen">

      <div className="loading-content">

        <div className="loading-brand">
          ECORP
        </div>

        <div className="loading-line">
          <span></span>
        </div>

        <div className="loading-text">
          INITIALIZING NETWORK
        </div>

        <div className="loading-status">
          <span className="loading-dot"></span>
          SYSTEM LOADING...
        </div>

      </div>

    </div>
  );
}

export default LoadingScreen;