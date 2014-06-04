/*
 * grunt-redis-manifest
 * 
 *
 * Copyright (c) 2014 Chris Manson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('redis', 'Redis file uploader', function() {
        var done = this.async();
        
        var redis = require('redis');
        var path = require('path');
        var Q = require('q');

        var options = this.options({
            fullPath: false,
            prefix: ''
        });
        
        console.log(options);

        var client = redis.createClient(options.port, options.host, options.connectionOptions); 
        
        client.on("ready", function(){
            grunt.log.debug("Connected to redis");
        });

        client.on("error", function(err) {
            grunt.log.error("Redis Error " + err);
        });

        var promises = [];
        
        this.files.forEach(function(file) {
            
            file.src.filter(function(filepath) {
                
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }
                else {
                    return true;
                }
                
            }).forEach(function(filepath) {
                console.log(options);
                console.log(options.prefix);
                var key = (options.prefix) + (options.fullPath ? filepath : path.basename(filepath));
                
                promises.push(Q.ninvoke(client, "set", key, grunt.file.read(filepath)).then(function(){
                    grunt.log.debug("File uploaded " + key);
                    // CUSTOM:
                    // Store the deploy keys in a list, triming the list based on user option
                    if (options.manifestKey && !options.manifestSize) {
                      grunt.log.error("If you wish to use a manifest, please define a max manifestSize");
                    } else if (options.manifestSize && !options.manifestKey) {
                      grunt.log.error("You have defined a manifestSize, but no manifestKey");
                    } else if (options.manifestKey && options.manifestSize) {
                      client.lpush(options.manifestKey, options.currentDeployKey);
                      client.ltrim(options.manifestKey, 0, options.manifestSize);
                    }
                }));
            });
            
        });
        
        Q.all(promises).then(function(){
            grunt.log.info("All successful");
        }, function(err){
            grunt.log.error("Error uploading: " + err);
        }).finally(function(){
            client.quit();
            done();
        });
    });

};
