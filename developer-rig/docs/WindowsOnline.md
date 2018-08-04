# Windows Quick-start to Hello World with Developer Rig in Online Mode

Follow these steps to get Hello World (or your own extension) running in Online Mode in the Rig.  This guide assumes you have either cloned the Rig from [GitHub](/twitchdev/developer-rig) or downloaded the Zip file from [Twitch](https://dev.twitch.tv).

Run these two command files to install and configure the Developer Rig.  If the Developer Rig is already installed and configured, running these two command files will have no effect.

1.  `scripts\install.cmd`
2.  `scripts\configure.cmd`

You may invoke these two command files before invoking `scripts\run.cmd`.

The `scripts\install.cmd` command file installs the following prerequisites.  If you already have these prerequisites, running this command file will have no effect. You may install these yourself instead.

1.  [Node LTS](https://nodejs.org/en/download/).  **If you already have Node installed, it must be at least version 6.**
2.  [Yarn](https://yarnpkg.com/lang/en/docs/install).
3.  [Python 2](https://www.python.org/downloads/release/python-2715/).
4.  [Git for Windows](https://github.com/git-for-windows/git/releases/download/v2.17.1.windows.2/Git-2.17.1.2-64-bit.exe).  Its shell is used in subsequent steps.

The `scripts\configure.cmd` command file performs the following actions.  If the Developer Rig is already configured, running this command file will have no effect. You may perform these actions yourself instead.  Note that the `scripts\configure.cmd` command file invokes the `scripts\install.cmd` command file.  **If you already have your own front-end for your extension, you only need to perform the first step below.**

1.  Install run-time dependencies.
    1.  Open a command prompt.  It does not need to be elevated.
    2.  `cd path\to\developer-rig`
    3.  `yarn install`  
        This takes about half a minute.
2.  Clone and configure the "Hello World" extension from GitHub.
    1.  `cd path\to\developer-rig`
    2.  `yarn extension-init -d ..\my-extension`  
        This will clone the Hello World example from GitHub.  You may replace *..\my-extension* with a different directory name here and in subsequent steps.
    3.  `cd ..\my-extension`  
    4.  `npm install`  
3.  Add `127.0.0.1 localhost.rig.twitch.tv` to the HOSTS file.
    1.  Open an elevated command prompt.
    1.  `ECHO 127.0.0.1 localhost.rig.twitch.tv>> "%SystemRoot%\System32\drivers\etc\hosts`
4.  Create CA and Developer Rig and localhost SSL certificates.
    1.  `cd path\to\developer-rig`
    2.  `scripts\make-cert`  
    3.  Close the elevated command prompt and return to the non-elevated command prompt.

If you have not yet done so, create an extension manifest on your [Twitch Extensions Dashboard](https://dev.twitch.tv/dashboard/extensions) as described here.

1.  Visit https://dev.twitch.tv/dashboard/extensions.
2.  Click Create Extension.
3.  Provide all requested information about your new extension and click "Create Extension".  You may select as many types as are appropriate for your extension.  If you don't know, select "Panel".  You may change this later.
4.  Keep this browser session open since you'll need some of the data on it to create a configuration file later.

Note that, in the above steps, you didn't actually create an extension.  What you did was create Twitch's awareness of your extension (i.e., an internal manifest for your extension).  Your extension actually consists of all of the assets (e.g. HTML, JavaScript, images, etc.) that constitute the implementation of your extension.

If you already have an implementation, reference its front-end directory in step 1.i below and its back-end in step 2.iii below.  If you don't have a back-end, you may skip step 4 below.

Follow these steps to launch the Developer Rig in Online Mode.

1.  Host the front-end extension asset directory.
    1.  `yarn host -d ..\my-extension\public -p 8080`  
        *..\my-extension\public* is the public folder of the hello-world example extension created in the previous step.
        **NOTE:**  this command prompt command will not exit.
2.  Open a new command prompt and run these commands to host your Hello World back-end.
    1.  `cd path\to\my-extension`  
    2.  `powershell -Command "& Invoke-WebRequest -Uri \"https://api.twitch.tv/helix/users?login=`_your-twitch-user-name_`\" -Headers @{\"Client-ID\"=\"`_your-client-id_`\"}"`
        This will print your Twitch user ID for the next step.  
        Your client ID is available in the **Overview** tab of your extension.  Your Twitch user name is displayed in the top-right corner of twitch.tv when you are signed in.  The channel name must be alphabetic.  For instance, if your Twitch user name is `dallas`, use the channel name `RIGdallas`.
    3.  `node services\backend -s `_your-extension-secret_` -o `_your-twitch-user-id_` -c `_your-client-id_  
		The secret can be found in the `Secret Keys` section under the `Settings` tab in your extension on your [Twitch Extensions Dashboard](https://dev.twitch.tv/dashboard/extensions).
        **NOTE:**  this command prompt command will not exit.
3.  Open a new command prompt and run these commands to run the Developer Rig.
    1.  `cd path\to\developer-rig`
    2.  `echo {
			"clientID": "`_your client ID_`",
			"version": "0.0.1",
			"channel": "RIG`_your Twitch user name_`",
			"ownerName": "`_your Twitch user name_`"
        } > ..\config.json`  
		If you have multiple versions, substitute the latest version for `0.0.1` above.  You may use a real channel under your control instead of the Developer Rig channel above.
    3.  `yarn start -s '`_your extension secret_`' -c ..\config.json`  
        This will open your browser for the next step.  **NOTE:**  this command prompt command will not exit.
4.  Verify the Developer Rig is working.
    1.  Sign in with your Twitch credentials.
    2.  Click the `+` button. The "Add a new view" panel will appear.
    3.  Select the `Broadcaster` viewer type and click `Save`. The Broadcaster view will appear.
    4.  Click `Yes, I would`. Verify the color changes and there is output to match that request in the second command prompt.
    5.  Click the `+` button again. The "Add a new view" panel will appear again.
    6.  Select the `Logged-Out Viewer` viewer type and click `Save`. The Logged-Out Viewer view will appear.
    7.  Click `Yes, I would` in the new view. Verify the color changes in both views and there is output to match that request in the second command prompt.

When you are done using the Developer Rig, you may either close all opened command prompts or press `Ctrl-C` in all of them.

_The color updates only in the view in which I clicked the **Yes, I would** button._  
Verify your channel name is alphabetic.  It may not contain any other characters, such as hyphens, numbers, and underscores.

_I changed the **channel** in the configuration and now the color updates only in the view in which I clicked the **Yes, I would** button._  
This is a known issue.  Currently, once you create your extension and start using a channel, you may not change it to a different one.  If, after changing it back, you still experience this issue, clear the local storage for the [Developer Rig](https://localhost.rig.twitch.tv:3000/) in your browser.  This will necessitate recreating the views in the Developer Rig.

_I see **EBS request returned Too Many Requests (error)** messages in the Developer Rig console._  
Twitch uses rate limiting to prevent overloading our systems.  Your EBS and your extension will need to account for this and other HTTP errors.
