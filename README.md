
# Selenium Plugin

The Selenium plugin is designed to be able to start/stop the Selenium Server from within Clarive. Selenium Server should be on a Unix-Linux machine.

## What is Selenium

Selenium is a test automation tool for handling browsers for testing web applications.

## Installing

To install the plugin, place the cla-selenium-plugin folder inside `CLARIVE_BASE/plugins`
directory in the Clarive instance.

## How to Use

Once the plugin is placed in its folder, you can start using it by going to your Clarive
instance.

After restarting your Clarive instance, you will have a new CI:

### SeleniumServer:

This CI is for saving your Selenium Server settings:

- **Server -** This is the Selenium hostname.
- **Path -** The path to the Selenium Server.
- **Port -** The Selenium Server port. The default is `4444`.
- **Session timeout -**  Specifies the timeout before the server automatically kills 
a session that has had no activity in the last X seconds. The default is `1800`.

#### X-Framebuffer
-  **Enabled -** This option should be checked if you want run Selenium tests with Xvfb (X virtual framebuffer).
-  **Command -** Command for running Xvfb. The default command is: `export DISPLAY=:10;Xvfb :10 -ac`

Example:


		Server: ci-server
		Path: /home/selenium/selenium-server.jar
		Port: 4444
		Session timeout: 1800
		Enabled: True
		Command: export DISPLAY=:10;Xvfb :10 -ac

## Palette Services:

### Start Selenium Server

This palette service will start the Selenium Server that you select from SeleniumServer CI.
Settings:

- **Selenium Server -** You only need to select the Selenium Server CI you want to start from Clarive.

### Stop Selenium Server

This palette service will stop the Selenium Server that you select from SeleniumServer CI.
Parameters:

- **Selenium Server -** You only need to select the Selenium Server CI you want to stop from Clarive.

It is recommended that you use the service in the step POST in the pipeline.

