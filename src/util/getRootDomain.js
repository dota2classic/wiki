/**
 * @param {string} host
 */
export function getRootDomain(host) {
  if (host === "localhost") return "localhost";
  const temp = host.split(".").reverse();
  return "." + temp[1] + "." + temp[0];
}
