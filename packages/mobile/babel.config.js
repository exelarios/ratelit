module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        require.resolve("babel-plugin-module-resolver"), {
          include: ["."],
          root: ["."],
          alias: {
            "@/mobile": ".",
          },
        }
      ]
    ],
  };
};