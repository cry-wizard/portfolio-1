import { useState } from "react";
import "../css/retrievedomain.css";
const BASE_DOMAIN = "portfolio.com"; // Change to your domain
export default function RetrieveDomain() {
  const [email, setEmail] = useState("");
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setDomains([]);

    try {
      const response = await fetch("/api/domains/retrieve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setDomains(data.domains);

        if (data.domains.length === 0) {
          setMessage("No domains found.");
        }
      } else {
        setMessage(data.message || "Unable to retrieve domains.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="retrieve-page">
      <div className="retrieve-container">
        <h1 className="retrieve-title">Retrieve Your Domain</h1>

        <p className="retrieve-description">
          Enter the email address you used when registering your subdomain.
        </p>

        <form className="retrieve-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="retrieve-input"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="retrieve-button" disabled={loading}>
            {loading ? "Searching..." : "Find My Domains"}
          </button>
        </form>

        {message && <div className="message">{message}</div>}

        {domains.length > 0 && (
          <div className="domain-list">
            <h2>Registered Domains</h2>

            {domains.map((domain) => (
              <div className="domain-card" key={domain.id}>
                <div className="domain-name">
                  {domain.subdomain}.{BASE_DOMAIN}
                </div>

                <a
                  href={`https://${domain.subdomain}.${BASE_DOMAIN}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="open-button"
                >
                  Open
                </a>
              </div>
            ))}
          </div>
        )}

        {!loading &&
          domains.length === 0 &&
          message === "No domains found." && (
            <div className="no-domain">
              <p>No domains are registered with this email.</p>

              <a href="/register-domain" className="register-link">
                Register a New Domain
              </a>
            </div>
          )}
      </div>
    </div>
  );
}
