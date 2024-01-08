module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "macros",
      "relay",
      "expo-router/babel",
      [
        require.resolve("babel-plugin-module-resolver"), {
          include: ["."],
          root: ["."],
          alias: {
            "@/mobile": ".",
          },
        }
      ],
      "react-native-reanimated/plugin",
    ],
  };
};