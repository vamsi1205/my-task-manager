const fs = require("fs");
const path = require("path");

const rootEnvPath = path.resolve(__dirname, "../../.env");
const devEnvironmentPath = path.resolve(
  __dirname,
  "../src/environments/environment.ts",
);
const prodEnvironmentPath = path.resolve(
  __dirname,
  "../src/environments/environment.prod.ts",
);

const parseEnv = (content) =>
  content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .reduce((acc, line) => {
      const separatorIndex = line.indexOf("=");
      if (separatorIndex === -1) {
        return acc;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      acc[key] = value;
      return acc;
    }, {});

const env = fs.existsSync(rootEnvPath)
  ? parseEnv(fs.readFileSync(rootEnvPath, "utf8"))
  : {};

// const apiUrl = env.API_URL || 'http://localhost:5000/api';
const apiUrl =
  env.API_URL || "https://my-task-manager-api-33wp.onrender.com/api";

const devEnvironment = `// This file can be replaced during build by using the \`fileReplacements\` array.
// \`ng build\` replaces \`environment.ts\` with \`environment.prod.ts\`.
// The list of file replacements can be found in \`angular.json\`.

export const environment = {
  production: false,
  apiUrl: '${apiUrl}',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as \`zone.run\`, \`zoneDelegate.invokeTask\`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
`;

const prodEnvironment = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
};
`;

fs.writeFileSync(devEnvironmentPath, devEnvironment, "utf8");
fs.writeFileSync(prodEnvironmentPath, prodEnvironment, "utf8");

console.log(`Synced API_URL to Angular environments from ${rootEnvPath}`);
