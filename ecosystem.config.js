module.exports = {
  apps : [{
    name: "User Service",
    script: 'dist/index.js',
    exec_mode: 'cluster',
    instances: 2,
    watch: true,
  }]
};
