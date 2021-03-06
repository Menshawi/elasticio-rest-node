var Resource = require("../resource.js");

module.exports = Resource.extend({
    path: 'tasks',

    start: Resource.method({
        method: Resource.POST,
        path: '/start/{id}'
    }),

    stop: Resource.method({
        method: Resource.POST,
        path: '/stop/{id}'
    }),

    create: Resource.method({
        method: Resource.POST,
        path: '/'
    })
});