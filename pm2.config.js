module.exports = {
  apps: [
    {
      name: 'express-rest-api',
      script: 'dist/app.js',
      watch: false,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        NODE_OPTIONS: process.env.NODE_OPTIONS
      },
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '512M',
      listen_timeout: 3000,
      kill_timeout: 6000,
      combine_logs: true
    }
  ]
}
