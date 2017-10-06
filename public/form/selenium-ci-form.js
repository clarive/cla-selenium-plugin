(function(params) {

    var data = params.rec || {};
    var serverCombo = Cla.ui.ciCombo({
        name: 'server',
        role: 'Server',
        fieldLabel: _('Server'),
        value: data.server ? data.server[0] : '',
        allowBlank: false,
    });

    var pathTextField = Cla.ui.textField({
        name: 'path',
        fieldLabel: _('Path'),
        allowBlank: false
    });

    var portNumberField = Cla.ui.numberField({
        name: 'port',
        fieldLabel: _('Port'),
        maxValue: '99999',
        type: 'int',
        value: data.port || 4444,
    });

    var timeoutNumberField = Cla.ui.numberField({
        name: 'timeout',
        fieldLabel: _('Session timeout'),
        type: 'int',
        value: data.timeout || 1800,
    });

    var frameBufferCheckbox = Cla.ui.checkBox({
        fieldLabel: _('Enabled'),
        name: 'frameBufferEnabled',
        checked: data.frameBufferEnabled == 1 ? true : false
    });
    frameBufferCheckbox.on('check', function() {
        var checked = frameBufferCheckbox.checked;
        if (checked) {
            frameBufferCommandTextField.show();
        } else {
            frameBufferCommandTextField.hide();
        }
    });

    var frameBufferCommandTextField = Cla.ui.textField({
        fieldLabel: _('Command'),
        name: 'frameBufferCommand',
        value: data.frameBufferCommand || 'export DISPLAY=:10;Xvfb :10 -ac',
        anchor: '50%',
        hidden: frameBufferCheckbox.checked ? false : true
    });

    return [
        serverCombo,
        pathTextField,
        portNumberField,
        timeoutNumberField, {
            xtype: 'fieldset',
            title: _('X-FrameBuffer'),
            items: [
                frameBufferCheckbox,
                frameBufferCommandTextField,
            ]
        },
    ]
})