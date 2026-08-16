import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <div className="settings-page">

      {/* Header */}
      <header className="settings-header">

        <div>

          <div className="ecorp-mark">
            <span>ECORP</span>

            <span className="ecorp-line"></span>

            <span>NETWORK-01</span>
          </div>

          <h1 className="settings-title">
            SETTINGS
          </h1>

          <p className="settings-description">
            System configuration and dashboard preferences
          </p>

        </div>

        <div className="settings-status">
          <span className="settings-status-dot"></span>
          CONFIGURATION ACTIVE
        </div>

      </header>


      {/* System Information */}
      <section className="settings-section">

        <div className="settings-section-header">

          <div>
            <span className="section-index">
              01
            </span>

            <span className="section-title">
              SYSTEM INFORMATION
            </span>
          </div>

          <span className="section-code">
            SYSTEM
          </span>

        </div>


        <div className="system-info-grid">

          <div className="info-item">
            <span>APPLICATION</span>
            <strong>ECorp Network</strong>
          </div>

          <div className="info-item">
            <span>VERSION</span>
            <strong>2.0.0</strong>
          </div>

          <div className="info-item">
            <span>ENVIRONMENT</span>
            <strong>PRODUCTION</strong>
          </div>

          <div className="info-item">
            <span>STATUS</span>
            <strong className="online-text">
              ONLINE
            </strong>
          </div>

        </div>

      </section>


      {/* Preferences */}
      <section className="settings-section">

        <div className="settings-section-header">

          <div>
            <span className="section-index">
              02
            </span>

            <span className="section-title">
              DASHBOARD PREFERENCES
            </span>
          </div>

          <span className="section-code">
            CONFIG
          </span>

        </div>


        <div className="settings-options">

          {/* Notifications */}
          <div className="setting-row">

            <div>
              <strong>
                Payment Notifications
              </strong>

              <p>
                Receive notifications when customer payments
                are pending.
              </p>
            </div>

            <button
              className={
                notifications
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setNotifications((prev) => !prev)
              }
              aria-label="Toggle payment notifications"
            >
              <span></span>
            </button>

          </div>


          {/* Auto Refresh */}
          <div className="setting-row">

            <div>
              <strong>
                Automatic Data Refresh
              </strong>

              <p>
                Automatically refresh dashboard data when
                changes are detected.
              </p>
            </div>

            <button
              className={
                autoRefresh
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setAutoRefresh((prev) => !prev)
              }
              aria-label="Toggle automatic data refresh"
            >
              <span></span>
            </button>

          </div>

        </div>

      </section>


      {/* Account */}
      <section className="settings-section">

        <div className="settings-section-header">

          <div>
            <span className="section-index">
              03
            </span>

            <span className="section-title">
              ADMIN ACCOUNT
            </span>
          </div>

          <span className="section-code">
            ADMIN
          </span>

        </div>


        <div className="admin-info">

          <div className="admin-avatar">
            A
          </div>

          <div>
            <strong>
              Administrator
            </strong>

            <span>
              admin@ecorp.network
            </span>
          </div>

        </div>

      </section>


      {/* Save */}
      <div className="settings-footer">

        <button
          className="save-settings-btn"
          onClick={handleSave}
        >
          {saved ? "CONFIGURATION SAVED" : "SAVE CONFIGURATION"}
        </button>

        <span>
          CHANGES APPLY TO CURRENT SESSION
        </span>

      </div>

    </div>
  );
}

export default Settings;