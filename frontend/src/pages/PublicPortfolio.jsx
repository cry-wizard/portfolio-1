import { useEffect, useState } from "react";

export default function PublicPortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const subdomain = window.location.hostname.split(".")[0];

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const res = await fetch(
          `https://portfoliobackend.centennialinfotech.com/api/public/${subdomain}`,
        );

        if (!res.ok) {
          throw new Error("Portfolio not found");
        }

        const data = await res.json();
        setPortfolio(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [subdomain]);

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Loading Portfolio...</h2>
        <p>Subdomain: {subdomain}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Portfolio Not Found</h1>
        <p>Subdomain: {subdomain}</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{portfolio.name}</h1>
      <p>{portfolio.role}</p>

      <hr />

      <h3>Debug Information</h3>
      <p>
        <strong>Subdomain:</strong> {subdomain}
      </p>

      <pre>{JSON.stringify(portfolio, null, 2)}</pre>
    </div>
  );
}
