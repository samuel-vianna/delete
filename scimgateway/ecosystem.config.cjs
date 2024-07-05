/**
  * Docker Integration
  * @see https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/
  */
 module.exports = {
   apps: [
     {
       name: "scim-gateway",
       exec_mode: "cluster",
       instances: 1,
       script: "./index.js",
       env_production: {
         NODE_ENV: "production",
       },
     },
   ],
 };