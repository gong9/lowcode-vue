const path = require("path");
module.exports = {
  title: "blm-lowcode",
  description: "lowcode 组件封装",
  dest: "./build",
  port: "8088",
  configureWebpack: {
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "../../src"),
      },
    },
  },
  themeConfig: {
    // 主题配置
    nav: [
      {
        text: "主页",
        link: "/",
      }, // 导航条
    ],
    sidebar: {
      // 侧边栏配置
      "/components/": [
        {
          collapsable: false,
          children: ["lowcode-table"],
        },
        {
          collapsable: false,
          children: ["lowcode-form"],
        },
      ],
    },
  },
};
