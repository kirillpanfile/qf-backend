const corsOptions = {
  origin: "*",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  credentials: true,
};
module.exports = corsOptions;
