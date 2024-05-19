module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            screens: "./src/screens",
            global: "./src/global",
            store: "./src/store",
            components: "./src/components",
            assets: "./src/assets",
            hooks: "./src/hooks",
            utils: "./src/utils",
            actions: "./src/actions",
            navigators: "./src/navigators",
            reducers: "./src/reducers",
          },
        },
      ],
    ],
  };
};
