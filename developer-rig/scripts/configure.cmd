@ECHO OFF
SETLOCAL

REM Check for configuration.
CALL "%~dp0check-configure.cmd"
IF NOT ERRORLEVEL 2 EXIT /B
net file > NUL 2> NUL
IF ERRORLEVEL 1 (
	ECHO Configuration will continue in an elevated command prompt.
	cscript //nologo "%~dp0elevate.vbs" "%~f0 %~1"
	EXIT /B
) ELSE IF "%~1" == "" (
	SET PAUSE=PAUSE
) ELSE (
	SET PAUSE=
)

REM Run the installation script first.
CALL "%~dp0install.cmd" -
IF ERRORLEVEL 1 GOTO done

REM Install run-time dependencies.
CD /D "%~dp0.."
PATH %PATH%;%SystemDrive%\Python27;%ProgramFiles%\nodejs;%ProgramFiles(x86)%\Yarn\bin;%ProgramFiles%\Git\cmd
IF NOT EXIST node_modules (
	CMD /C yarn install
	IF ERRORLEVEL 1 (
		ECHO Cannot install Developer Rig run-time dependencies.
		GOTO done
	)
)

REM Clone from GitHub and configure the "Hello World" extension.
SET MY=..\my-extension
SET WANTS_NPM_INSTALL=NO
IF EXIST %MY%\.git (
	PUSHD %MY%
	git remote update
	IF NOT ERRORLEVEL 1 (
		git status -uno | FIND "up to date" > NUL
		IF ERRORLEVEL 1 (
			SET WANTS_NPM_INSTALL=YES
			git pull --ff-only
		) ELSE IF NOT EXIST node_modules (
			SET WANTS_NPM_INSTALL=YES
		)
	)
	IF ERRORLEVEL 1 (
		ECHO This is not a valid "Hello World" extension directory.  Please move or remove it before running this script again.
		GOTO done
	)
	POPD
) ELSE IF EXIST %MY% (
	ECHO There is already a file called "%MY%".  Please move or remove it before running this script again.
	GOTO done
) ELSE (
	CMD /C yarn extension-init -d %MY%
	IF ERRORLEVEL 1 (
		ECHO Cannot initialize %MY%
		GOTO done
	)
)
PUSHD %MY%
IF "%WANTS_NPM_INSTALL%" == "YES" (
	CMD /C npm install
	IF ERRORLEVEL 1 (
		ECHO Cannot install "Hello World" extension run-time dependencies.
		GOTO done
	)
)
POPD

REM Add localhost.rig.twitch.tv to /etc/hosts.
SET LOCALHOST=localhost.rig.twitch.tv
SET HOSTS_FILE=%SystemRoot%\System32\drivers\etc\hosts
FIND "%LOCALHOST%" "%HOSTS_FILE%" > NUL
IF ERRORLEVEL 1 ECHO 127.0.0.1 %LOCALHOST%>> "%HOSTS_FILE%"
FIND "%LOCALHOST%" "%HOSTS_FILE%" > NUL
IF ERRORLEVEL 1 (
	ECHO Cannot update "%HOSTS_FILE%".
	ECHO Add "127.0.0.1 %LOCALHOST%" to "%HOSTS_FILE%" manually.
	GOTO done
)

REM Create CA and Developer Rig and localhost SSL certificates.
CALL "%~dp0make-cert.cmd" -

:done
IF ERRORLEVEL 1 %PAUSE% TYPE NUL
