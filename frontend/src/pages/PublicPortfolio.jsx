import { useEffect, useState } from "react";

export default function PublicPortfolio() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const host = window.location.hostname;
    const subdomain = host.split(".")[0];

    fetch(
      `https://portfoliobackend.centennialinfotech.com/api/public/${subdomain}`,
    )
      .then((res) => res.json())
      .then(setPortfolio);
  }, []);

  if (!portfolio) return <h2>Loading...</h2>;

  return (
    <>
      <h1>{portfolio.name}</h1>
      <p>{portfolio.role}</p>
    </>
  );
}
