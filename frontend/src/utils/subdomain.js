export function getSubdomain() {
  const host = window.location.hostname;

  // Local development
  if (host === "localhost" || host.startsWith("127.")) {
    return null;
  }

  const parts = host.split(".");

  // john.centennialinfotech.com
  if (parts.length >= 3) {
    return parts[0];
  }

  return null;
}
