module.exports = {
  apps : [{
    name: "spoken-web",
    script: './src/index.js',
    watch: '.',
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
};
