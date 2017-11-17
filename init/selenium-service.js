var reg = require("cla/reg");
reg.register('service.selenium.start', {
    name: _('Start Selenium Server'),
    icon: '/plugin/cla-selenium-plugin/icon/selenium.svg',
    form: '/plugin/cla-selenium-plugin/form/selenium-server.js',
    rulebook: {
        moniker: 'selenium_start',
        description: _('Selenium start service'),
        required: [ 'server'],
        allow: ['server'],
        examples: [{
            selenium_start: {
                server: 'selenium_resource'
            }
        }]
    },
    handler: function(ctx, params) {
        var log = require('cla/log');
        var ci = require('cla/ci');

        var seleniumServer = params.server;
        var ciSelenium = ci.findOne({
            mid: seleniumServer + ''
        });

        var seleniumPath = ciSelenium.path;

        if (!ciSelenium.server) {
            log.error(_("CI Server not found"));
        }
        if (!seleniumPath) {
            log.error(_("Selenium Server not declared"));
        }

        var server = ci.load(ciSelenium.server);
        var remoteTemp = server.remoteTemp();
        var agent = server.connect();
        var fileSeleniumPid = remoteTemp + '/selenium-server-' + seleniumServer + '.pid';

        var command = buildCommand(ciSelenium);
        log.info(_("Starting Selenium Server ") + seleniumServer);
        log.debug(_("Command to start Selenium Server ") + seleniumServer, command);

        agent.execute(command);

        var pid = getPid(agent, fileSeleniumPid);
        if (pid) {
            log.info(_("Selenium Server is up and running"));
        } else {
            log.error(_("Error starting Selenium Server"));
        }

        function buildCommand(ciSelenium) {
            var seleniumPath = ciSelenium.path;
            var port = ciSelenium.port || 4444;
            var timeout = ciSelenium.timeout || 1800;
            var frameBufferEnabled = ciSelenium.frameBufferEnabled;
            var seleniumMid = ciSelenium.mid;
            var command = '';
            var fileSeleniumPid = remoteTemp + '/selenium-server-' + seleniumMid + '.pid';

            if (frameBufferEnabled) {
                var frameBufferCommand = ciSelenium.frameBufferCommand;
                var fileFrameBufferPid = remoteTemp + '/frameBuffer-' + seleniumMid + '.pid';
                command = frameBufferCommand + ' &echo $!>' + fileFrameBufferPid + '; ';
            }

            command = command + 'java -jar ' + seleniumPath + ' -port ' + port +
                ' -sessionTimeout ' + timeout +
                ' -log selenium.log > /dev/null 2>&1 > /dev/null &echo $!>' + fileSeleniumPid;

            return command;
        }

        function getPid(agent, file) {
            agent.execute('cat ' + file);
            var response = agent.tuple().ret;
            var pid = response.match(/\d+/);

            return pid;
        }
    }
});

reg.register('service.selenium.stop', {
    name: _('Stop Selenium Server'),
    icon: '/plugin/cla-selenium-plugin/icon/selenium.svg',
    form: '/plugin/cla-selenium-plugin/form/selenium-server.js',
    rulebook: {
        moniker: 'selenium_stop',
        description: _('Selenium stop service'),
        required: [ 'server'],
        allow: ['server'],
        examples: [{
            selenium_stop: {
                server: 'selenium_resource'
            }
        }]
    },
    handler: function(ctx, params) {
        var log = require('cla/log');
        var ci = require('cla/ci');

        var seleniumServer = params.server;
        var ciSelenium = ci.findOne({
            mid: seleniumServer + ''
        });
        if (!ciSelenium.server) {
            log.error(_("CI Server not found"));
        }
        var seleniumPath = ciSelenium.path;
        if (!seleniumPath) {
            log.error(_("Selenium Server not declared"));
        }

        var server = ci.load(ciSelenium.server);
        var agent = server.connect();
        var remoteTemp = server.remoteTemp();
        var fileSeleniumPid = remoteTemp + '/selenium-server-' + seleniumServer + '.pid';
        var fileFrameBufferPid = remoteTemp + '/frameBuffer-' + seleniumServer + '.pid';
        var files = [fileFrameBufferPid, fileSeleniumPid];
        var error;
        files.forEach(function(file) {
            var pid = killProcess(agent, file);
            if (!pid) {
                error = true;
            }
        });
        agent.execute('cat selenium.log');
        var logResponse = agent.tuple().ret;
        if (!error) {
            log.info(_("Selenium Server with mid ") + seleniumServer + _(" stopped successful"), logResponse);
        } else {
            log.warn(_("Selenium Server with mid ") + seleniumServer + _(" stopping failed"), logResponse);
        }

        function getPid(agent, file) {
            agent.execute('cat ' + file);
            var response = agent.tuple().ret;
            var rc = agent.tuple().rc;
            if (rc != 0) {
                log.debug(file + _(' not found'));
                return;
            }
            var pid = response.match(/\d+/);
            return pid;
        }

        function killProcess(agent, file) {
            var pid = getPid(agent, file);
            if (pid) {
                agent.execute('kill ' + pid + '; unlink ' + file);
                return pid;
            }
        }
    }
});