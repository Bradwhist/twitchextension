@ECHO OFF
SETLOCAL

REM Exit with error level 0 if certificate creation is not required.
REM Exit with error level 1 if certificate creation is required but not possible.
REM Exit with error level 2 if certificate creation is required.
SET SSL=%~dp0..\ssl
SET HAS_ALL_FILES=NO
IF EXIST "%SSL%\cacert.crt" IF EXIST "%SSL%\cacert.key" (
	IF EXIST "%SSL%\selfsigned.crt" IF EXIST "%SSL%\selfsigned.key" (
		IF EXIST "%SSL%\server.crt" IF EXIST "%SSL%\server.key" SET HAS_ALL_FILES=YES
	)
)
IF "%HAS_ALL_FILES%" == "YES" (
	powershell -Command "& {Get-ChildItem -Path Cert:\LocalMachine\Root}" | FIND "Twitch Developer Rig CA" > NUL
	IF NOT ERRORLEVEL 1 EXIT /B
)
EXIT /B 2
