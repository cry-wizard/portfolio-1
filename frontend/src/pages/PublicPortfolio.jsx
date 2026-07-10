import { useEffect, useState } from "react";

export default function PublicPortfolio() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const host = window.location.hostname;
        const subdomain = host.split(".")[0];

        const res = await fetch(
          `https://portfoliobackend.centennialinfotech.com/api/public/${subdomain}`,
        );

        console.log("Status:", res.status);

        if (!res.ok) {
          throw new Error("Portfolio not found");
        }

        const data = await res.json();
        console.log(data);

        setPortfolio(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadPortfolio();
  }, []);

  if (!portfolio) return <h2>Loading...</h2>;

  return (
    <>
      <h1>{portfolio.name}</h1>
      <p>{portfolio.role}</p>
    </>
  );
}
