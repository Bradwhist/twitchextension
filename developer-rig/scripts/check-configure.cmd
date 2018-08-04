@ECHO OFF
SETLOCAL

REM Exit with error level 0 if configuration is not required.
REM Exit with error level 1 if configuration is required but not possible.
REM Exit with error level 2 if configuration is required.
CALL "%~dp0check-install.cmd"
IF ERRORLEVEL 1 EXIT /B
CALL "%~dp0check-make-cert.cmd"
IF ERRORLEVEL 1 EXIT /B
SET LOCALHOST=localhost.rig.twitch.tv
SET HOSTS_FILE=%SystemRoot%\System32\drivers\etc\hosts
FIND "%LOCALHOST%" "%HOSTS_FILE%" > NUL
IF ERRORLEVEL 1 EXIT /B 2
powershell -Command "& {Get-ChildItem -Path Cert:\LocalMachine\Root}" | FIND "Twitch Developer Rig CA" > NUL
IF ERRORLEVEL 1 EXIT /B 2
