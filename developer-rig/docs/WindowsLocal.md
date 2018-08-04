# Windows Quick-start to Hello World with Developer Rig in Local Mode

Follow these steps to get Hello World running in Local Mode in the Rig.  This guide assumes you have either cloned the Rig from [GitHub](/twitchdev/developer-rig) or downloaded the Zip file from [Twitch](https://dev.twitch.tv).

The `scripts\run.cmd` command file will first run command files to install and configure the Developer Rig before running it.  If the Developer Rig is already installed and configured, running these two command files will have no effect.

1.  `scripts\install.cmd`
2.  `scripts\configure.cmd`

You may invoke these two command files before invoking `scripts\run.cmd`.

The `scripts\install.cmd` command file installs the following prerequisites.  If you already have these prerequisites, running this command file will have no effect. You may install these yourself instead.

1.  [Node LTS](https://nodejs.org/en/download/).  **If you already have Node installed, it must be at least version 6.**
2.  [Yarn](https://yarnpkg.com/lang/en/docs/install).
3.  [Python 2](https://www.python.org/downloads/release/python-2715/).
4.  [Git for Windows](https://github.com/git-for-windows/git/releases/download/v2.17.1.windows.2/Git-2.17.1.2-64-bit.exe).  Its shell is used in subsequent steps.

The `scripts\configure.cmd` command file performs the following actions.  If the Developer Rig is already configured, running this command file will have no effect. You may perform these actions yourself instead.  Note that the `scripts\configure.cmd` command file invokes the `scripts\install.cmd` command file.

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

In addition to running the above command files, the `.\scripts\run.cmd` command file performs the following actions to launch the Developer Rig.

1.  Create a panel extension manifest file.
    1.  `cd path\to\developer-rig`
    2.  `yarn create-manifest -t panel -o ..\panel.json`
2.  Host the front-end extension asset directory.
    1.  `yarn host -d ..\my-extension\public -p 8080 -l`  
        *..\my-extension\public* is the public folder of the hello-world example extension created in the previous step.
        **NOTE:**  this command will not exit.
3.  Visit https://localhost.rig.twitch.tv:8080\panel.html.  You will see `Hello, World!` in the browser window.
4.  Open a new command prompt and run these commands to run your Hello World back-end.
    1.  `cd path\to\my-extension`  
    3.  `node services\backend -l ..\panel.json`  
        *..\panel.json* is the path to the file created in step 3.iv above.
        **NOTE:**  this command will not exit.
5.  Visit https://localhost:8081.  You will see some JSON describing a 404 response in the browser window.
6.  Open a new command prompt and run these commands to run the Developer Rig.
    1.  `cd path\to\developer-rig`
    2.  `yarn start -l ..\panel.json`  
        *..\panel.json* is the path to the file created in step 1.ii above
        **NOTE:**  this command will not exit.
7.  Verify the Developer Rig is working.
    1.  Sign in with your Twitch credentials.
    2.  Click the `+` button. The "Add a new view" panel will appear.
    3.  Select the `Broadcaster` viewer type and click `Save`. The Broadcaster view will appear.
    4.  Click `Yes, I would`. Verify the color changes and there is output to match that request in the second command prompt.
    5.  Click the `+` button again. The "Add a new view" panel will appear again.
    6.  Select the `Logged-Out Viewer` viewer type and click `Save`. The Logged-Out Viewer view will appear.
    7.  Click `Yes, I would` in the new view. Verify the color changes in both views and there is output to match that request in the second command prompt.

When you are done using the Developer Rig, you may either close all opened command prompts or press `Ctrl-C` in all of them.
