module.exports = (grunt) ->
  grunt.initConfig
    nodemon:
      dev:
        script: "app.js"
    watch:
      styles:
        files:["src/styles/*.css"]
        tasks: ["cssmin:dev"]
    concurrent:
      options:
        logConcurrentOutput: true
      server:
        tasks: ["concurrent:dev","nodemon", "watch"]
      dev:
        tasks: ["cssmin:dev"]
    cssmin:
      dev:
        files:
          "public/styles/404.css": ["src/styles/main.css","src/styles/404.css"],
          "public/styles/index.css": ["src/styles/main.css","src/styles/index.css"]


  require("load-grunt-tasks") grunt
  grunt.registerTask "server", ["concurrent:server"]