import { useState } from "react";

const BASE_DOMAIN = "portfolio.centennialinfotech.com/"; // Change to your domain

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
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">Retrieve Your Domain</h1>

      <p className="text-gray-600 mb-6">
        Enter the email address used when registering your subdomain.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="john@example.com"
          className="w-full border rounded-lg p-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Find My Domains"}
        </button>
      </form>

      {message && (
        <div className="mt-6 text-center text-gray-600">{message}</div>
      )}

      {domains.length > 0 && (
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-4">Registered Domains</h2>

          {domains.map((domain) => (
            <div
              key={domain.id}
              className="border rounded-lg p-4 mb-3 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">
                  {domain.subdomain}.{BASE_DOMAIN}
                </div>
              </div>

              <a
                href={`https://${domain.subdomain}.${BASE_DOMAIN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Open
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
