module.exports = {
    devServer: {
      proxy: {
        "/qqstudyroom": {
          target: "https://hi8m.yishutech.cn/", // test环境
          changeOrigin: true,
          pathRewrite: {
            "^/qqstudyroom": "/qqstudyroom",
          },
        },
      },
    },
  };
  