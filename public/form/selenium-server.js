(function(params) {

    var data = params.data || {};

    var serverCombo = Cla.ui.ciCombo({
        name: 'server',
        value: params.data.server || '',
        class: 'SeleniumServer',
        fieldLabel: _('Selenium Server'),
        allowBlank: false,
        with_vars: 1
    });

    return [
        serverCombo
    ]
})