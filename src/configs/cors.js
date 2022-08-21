const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
};
module.exports = corsOptions;
