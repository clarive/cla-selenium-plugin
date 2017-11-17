# Selenium Plugin

<img src="https://cdn.rawgit.com/clarive/cla-selenium-plugin/master/public/icon/selenium.svg?sanitize=true" alt="Selenium Plugin" title="Selenium Plugin" width="120" height="120">

The Selenium plugin is designed to be able to start/stop the Selenium Server from within Clarive. Selenium Server should be on a Unix machine.

## What is Selenium

Selenium is a test automation tool for handling browsers for testing web applications.

## Installing

To install the plugin, place the `cla-selenium-plugin` folder inside `$CLARIVE_BASE/plugins`
directory in the Clarive instance.

### SeleniumServer Resource

To configurate the Selenium Server Resource open:

In **Clarive SE**: Resources -> ClariveSE.

In **Clarive EE**: Resources -> Selenium.

This Resource is for saving your Selenium Server settings:

- **Server -** This is the Selenium hostname.
- **Path -** Full path to Selenium Server jar file.
- **Port -** The Selenium Server port. The default is `4444`.
- **Session timeout -**  Specifies the timeout before the server automatically kills 
a session that has had no activity in the last X seconds. The default is `1800`.

**X-Framebuffer** options:

-  **Enabled -** This option should be checked if you want run Selenium tests with Xvfb (X virtual framebuffer).
-  **Command -** Command for running Xvfb. The default command is: `export DISPLAY=:10;Xvfb :10 -ac`

Example:

		Server: Resource-server
		Path: /home/selenium/selenium-server.jar
		Port: 4444
		Session timeout: 1800
		Enabled: True
		Command: export DISPLAY=:10;Xvfb :10 -ac

### Start Selenium Server

This service will start the Selenium Server that you select from SeleniumServer Resource.

The various parameters are:

- **Selenium Server (variable name: server)** - You only need to select the Selenium Server Resource you want to start from Clarive.

### Stop Selenium Server

This service will stop the Selenium Server that you select from SeleniumServer Resource.

The various parameters are:

- **Selenium Server (server)** - You only need to select the Selenium Server Resource you want to stop from Clarive.

It is recommended that you use the service in the step POST in your deployment.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Start/Stop example:

```yaml
    Selenium Server: Selenium server
``` 

Or using vars:

```yaml
    Selenium Server: ${selenium-server}
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Start example:

```yaml
do:
   - selenium_start:
       server: 'selenium_resource'          # Required. Use the mid set to the resource you created 
``` 

Stop example:

```yaml
do:
   - selenium_stop:
       server: 'selenium_resource'     # Required. Use the mid set to the resource you created
```

##### Outputs

###### Success

The service will return the response from the console output.

###### Possible configuration failures

**Task failed**

You will get the error from the console output.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "selenium_stop": "server"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Server` not available for op "selenium_start"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
