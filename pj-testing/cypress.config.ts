// import { defineConfig } from "cypress";
// import "dotenv/config";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       config.env = config.env || {};
//       // you could extract only specific variables and rename them if necessary
//       config.env.FRONTEND_URL = process.env.FRONTEND_URL;
//       config.env.BACKEND_URL = process.env.BACKEND_URL;
//       console.log("Extended config.env with process.env");
//       return config;
//     },
//   },
// });


import { defineConfig } from "cypress";
import "dotenv/config";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        ...config.env,
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        TEST_USER_EMAIL: process.env.TEST_USER_EMAIL,
        TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD,
      };
      console.log("Extended config.env with process.env");
      return config;
    },
  },
});

