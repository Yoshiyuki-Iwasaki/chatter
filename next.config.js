module.exports = {
  distDir: "public/",
  reactStrictMode: true,
  images: {
    loader: "imgix",
    domains: ["pbs.twimg.com"],
  },
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
};
