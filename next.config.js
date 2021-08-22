module.exports = {
  distDir: "public/",
  reactStrictMode: true,
  images: {
    domains: ["pbs.twimg.com"],
  },
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
};
