export const homeUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://main--gentle-lolly-617c28.netlify.app";

export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "DeployedBackendUrl";
