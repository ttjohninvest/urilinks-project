
const fs = require("fs");
const path = require("path");
const terser = require("terser");

async function minifyProduction() {
  const bundlePath = path.join(
    __dirname,
    "public",
    "dist",
    "bundle.js"
  );

  const originalCode = fs.readFileSync(bundlePath, "utf8");

  const result = await terser.minify(originalCode, {
    compress: true,
    mangle: true,
    sourceMap: false
  });

  if (result.error || !result.code) {
    throw result.error || new Error("Minification failed");
  }

  fs.writeFileSync(bundlePath, result.code, "utf8");

  console.log("Terser minification completed successfully.");
  console.log(
    "Minified bundle size:",
    (fs.statSync(bundlePath).size / 1024).toFixed(0),
    "KB"
  );
}

minifyProduction().catch((error) => {
  console.error("Terser minification failed:", error);
  process.exitCode = 1;
});
