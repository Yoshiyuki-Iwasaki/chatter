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

// const config = {
//   async redirects() {
//     return [
//       {
//         source: "/about", // リダイレクト元のURL
//         destination: "/redirect_page_url", // リダイレクト先のURL
//         permanent: true, // 永続的なリダイレクトかのフラグ
//       },
//     ];
//   },
// };

// module.exports = config;
