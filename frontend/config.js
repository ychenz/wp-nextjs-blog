let wpUrl = "http://localhost:8080/wp-json";

// If we""re running on Docker, use the WordPress container hostname instead of localhost.
if (process.env.HOME === "/home/node") {
  wpUrl = "http://wp-headless:8080/wp-json";
}

// If we are in production, using wordpress api hosted on bluehost
if (process.env.NODE_ENV === "production") {
  wpUrl = "https://blogapi.yuchenz.net/wp-json";
}

const Config = {
  apiUrl: wpUrl,
  AUTH_TOKEN: "auth-token",
  USERNAME: "username",
};

export default Config;
