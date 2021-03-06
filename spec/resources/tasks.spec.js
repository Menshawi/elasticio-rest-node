describe('/tasks', function () {
    var client = require("../../lib/client")("root", "secret");
    var tasks = client.tasks;
    var nock = require('nock');

    describe('/start/{id}', function () {

        it('should send request successfully', function (done) {

            var response = {
                "id": "5602c23e6459bd0500000001",
                "status": "active"
            };

            nock('https://api.elastic.io')
                .post('/v1/tasks/start/5602c23e6459bd0500000001')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            tasks
                .start("5602c23e6459bd0500000001")
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('/stop/{id}', function () {

        it('should send request successfully', function (done) {

            var response = {
                "id": "5602c23e6459bd0500000001",
                "status": "inactive"
            };

            nock('https://api.elastic.io')
                .post('/v1/tasks/stop/5602c23e6459bd0500000001')
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            tasks
                .stop("5602c23e6459bd0500000001")
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });

    describe('/create', function () {

        it('should send request successfully', function (done) {

            var input = {
                "name" : "WebHook to Mailchimp",
                "nodes" : [
                    {
                        "action" : "elasticio/webhook:receive",
                        "config": {
                            "payload": "email,first,last"
                        }
                    },
                    {
                        "action" : "elasticio/mapper:map",
                        "config": {
                            "mapper" : {
                                "lastName" : "{{last}}",
                                "firstName" : "{{first}}",
                                "salutation" : "{{salutation}}",
                                "email_type" : "html",
                                "email" : "{{email}}"
                            },
                            "lookupTables": {
                                "salutation": "lookup-table-id-to-be-used-for-salutation"
                            }
                        }
                    },
                    {
                        "action" : "elsaticio/mailchimp:subscribe",
                        "config": {
                            "listId" : "8779dd762e",
                            "_account" : "54536902230d250700000016"
                        }
                    }
                ]
            };

            var response = {
                "id": "5602c23e6459bd0500000001",
                "status": "inactive"
            };

            nock('https://api.elastic.io')
                .post('/v1/tasks/', input)
                .basicAuth({
                    user: 'root',
                    pass: 'secret'
                })
                .reply(200, response);

            var result;

            tasks
                .create(input)
                .then(function (body) {
                    result = body;
                })
                .finally(function () {
                    expect(result).toEqual(response);

                    done();
                });

        });
    });
});
