const config  = require('config');
const views     = __dirname + './../public/views/';

exports.page_show = function(req, res) {
    /*detect the namespace and endpoint*/
    namespace = req.params[0]
    if (!config.has('endpoints.' + namespace)){
        res.statusCode = 404;
        res.send('Not found');
    }
    else {
        endPointKey = 'endpoints.' + namespace + '.endpointQuery'
        graphKey = 'endpoints.' + namespace + '.graph'
        baseKey = 'endpoints.' + namespace + '.base'
        queryEndpoint = config.get(endPointKey)
        baseURI = config.get(baseKey)
        var graph;
        if (config.has(graphKey)){ 
            graph = true;
        }
        else {
            graph = false;
        }
    
        serverKey  = 'server.url'
        serverURL = config.get(serverKey)
        
        res.render(views+'describe.pug', {
            'queryEndpoint': queryEndpoint,
            'serverURL': serverURL,
            'graph': graph,
            'base': baseURI
        });        
    }
};