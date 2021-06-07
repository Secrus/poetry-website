import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import eslint from "@rollup/plugin-eslint"
import { terser } from "rollup-plugin-terser"
import postcss from "rollup-plugin-postcss"

import path from "path"

const dev = {
  input: "assets/src/app.js",
  output: {
    file: "assets/assets/app.js",
    format: "esm",
  },
  context: "window",
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      extract: true,
      minimize: false,
    }),
    eslint(),
    babel({
      exclude: "node_modules/**",
      configFile: path.resolve(__dirname, "babel.config.json"),
      babelHelpers: "bundled",
    }),
  ],
}

const prod = {
  input: "assets/src/app.js",
  output: {
    file: "assets/assets/app.js",
    format: "esm",
  },
  context: "window",
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      extract: true,
      minimize: true,
    }),
    eslint(),
    babel({
      exclude: "node_modules/**",
      configFile: path.resolve(__dirname, "babel.config.json"),
      babelHelpers: "bundled",
    }),
    terser(),
  ],
}

const conf = process.env.NODE_ENV == "production" ? prod : dev

export default conf
