@ECHO OFF
SETLOCAL

REM Collect command line parameters.
:loop
IF "%~1" == "" GOTO end
IF "%~1" == "-m" (
	CALL :collect MANIFEST_FILE "%~2" "manifest file"
) ELSE IF "%~1" == "-f" (
	CALL :collect FRONTEND_DIRECTORY "%~2" "front-end directory"
) ELSE IF "%~1" == "-b" (
	CALL :collect BACKEND_FILE "%~2" "back-end file"
) ELSE (
	GOTO usage
)
IF ERRORLEVEL 1 EXIT /B
SHIFT /1
SHIFT /1
GOTO loop
:end

REM Check if configuration is required.
CALL "%~dp0check-configure.cmd"
IF ERRORLEVEL 2 (
	CALL "%~dp0configure.cmd"
	IF NOT ERRORLEVEL 1 (
		net file > NUL 2> NUL
		IF ERRORLEVEL 1 (
			ECHO When configuration completes,
			PAUSE
			COPY NUL NUL > NUL
		)
	)
) ELSE IF ERRORLEVEL 1 (
	EXIT /B
)
IF NOT ERRORLEVEL 1 CALL :path_and_check
IF ERRORLEVEL 1 (
	ECHO Configuration did not complete properly.  You will need to correct the
	ECHO problems and re-run this script.
	EXIT /B
)

REM Provide defaults in case of no arguments.
SET PARENT=%~dp0..\..
IF "%MANIFEST_FILE%" == "" IF "%FRONTEND_DIRECTORY%" == "" IF "%BACKEND_FILE%" == "" (
	SET MANIFEST_FILE=%PARENT%\panel.json
	SET FRONTEND_DIRECTORY=%PARENT%\my-extension
	SET BACKEND_FILE=%PARENT%\my-extension\services\backend.js
)
CD /D "%~dp0.."

REM For the "hello world" extension, ensure service of the correct directory.
IF EXIST "%FRONTEND_DIRECTORY%\public" SET FRONTEND_DIRECTORY=%FRONTEND_DIRECTORY%\public

REM If necessary, create a panel extension manifest file.
IF "%MANIFEST_FILE%" == "" SET MANIFEST_FILE=%PARENT%\panel.json
IF NOT "%MANIFEST_FILE%" == "" FOR %%I IN ("%MANIFEST_FILE%") DO SET MANIFEST_FILE=%%~fI
IF EXIST "%MANIFEST_FILE%" (
	ECHO Using extension manifest in "%MANIFEST_FILE%".
) ELSE (
	ECHO Creating and using panel extension manifest in "%MANIFEST_FILE%".
	CALL yarn create-manifest -t panel -o "%MANIFEST_FILE%"
	IF ERRORLEVEL 1 (
		ECHO Cannot create manifest file in "%MANIFEST_FILE%".
		PAUSE
		EXIT /B
	)
)

REM Start new command prompts for the different aspects of running the Developer Rig.
SET NWINDOWS=1
SET S=
IF NOT "%FRONTEND_DIRECTORY%" == "" FOR %%I IN ("%FRONTEND_DIRECTORY%") DO SET FRONTEND_DIRECTORY=%%~fI
IF "%FRONTEND_DIRECTORY%" == "" (
	ECHO Extension front-end hosting is not being provided by the Developer Rig.
) ELSE (
	ECHO Hosting extension front-end in "%FRONTEND_DIRECTORY%".
	SET /A NWINDOWS+=1
	SET S=s
	START "%FRONTEND_DIRECTORY%" CMD /C CALL "%~dp0new.cmd" CALL yarn host -d "%FRONTEND_DIRECTORY%" -p 8080 -l
)
IF NOT "%BACKEND_FILE%" == "" FOR %%I IN ("%BACKEND_FILE%") DO SET BACKEND_FILE=%%~fI
IF "%BACKEND_FILE%" == "" (
	ECHO Extension back-end service hosting is not being provided by the Developer Rig.
) ELSE (
	ECHO Hosting extension back-end service in "%BACKEND_FILE%".
	SET /A NWINDOWS+=1
	SET S=s
	START "%BACKEND_FILE%" CMD /C CALL "%~dp0new.cmd" node "%BACKEND_FILE%" -l "%MANIFEST_FILE%"
)
START "%MANIFEST_FILE%" CMD /C CALL "%~dp0new.cmd" CALL yarn start -l "%MANIFEST_FILE%"
ECHO Opened %NWINDOWS% other command prompt%S% to run the Developer Rig.
EXIT /B

:usage
ECHO.
ECHO usage: %0 [-m manifest-file] [-f front-end-directory] [-b back-end-file]
ECHO.
ECHO Specify no command line arguments to use defaults for all of them.
EXIT /B

:collect
IF EXIST "%~2" (
	SET %1=%~f2
) ELSE (
	ECHO Cannot open %~3 "%~2".
	"%~dp0false" 2> NUL
)

REM If the configure script installed the prerequisites, these are their paths.
:path_and_check
PATH %PATH%;%SystemDrive%\Python27;%ProgramFiles%\nodejs;%ProgramFiles(x86)%\Yarn\bin;%ProgramFiles%\Git\cmd
CALL "%~dp0check-configure.cmd"
