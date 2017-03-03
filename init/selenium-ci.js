var ci = require("cla/ci");

ci.createRole("Selenium");

ci.createClass("SeleniumServer", {
    form: '/plugin/cla-selenium-plugin/form/selenium-ci-form.js',
    icon: '/plugin/cla-selenium-plugin/icon/selenium.svg',
    roles: ["Selenium"],
    has: {
        server: {
            is: "rw",
            isa: "ArrayRef",
            required: true
        },
        path: {
            is: "rw",
            isa: "Str",
            required: true
        },
        port: {
            is: "rw",
            isa: "Int",
        },
        timeout: {
            is: "rw",
            isa: "Int",
        },
        frameBufferEnabled: {
            is: "rw",
            isa: "Bool",
        },
        frameBufferCommand: {
            is: "rw",
            isa: "Str",
        }
    }
});