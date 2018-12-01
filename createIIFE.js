const jiife = require('jiife');
const xl = 'node_modules/xtal-latx/';
jiife.processFiles([xl + 'define.js', xl + 'xtal-latx.js', 'node_modules/h2o-tf/h2o-tf.js', 'h2o-lilies.js'], 'dist/h2o-lilies.iife.js');




