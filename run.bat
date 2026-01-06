@echo off

REM Check if an argument was passed
IF "%1"=="" (
    echo No argument provided.
    echo Usage:
    echo   run.bat dev     ^| starts npm run dev on server and client
    echo   run.bat build   ^| runs npm run build on server and client
    echo   run.bat install ^| runs npm install on server and client
    exit /b
)

SET COMMAND=%1

IF "%COMMAND%"=="dev" (
    echo Starting server and client in DEV mode...
    wt -w 0 new-tab -d .\apps\web cmd /k "npm run dev"
    wt -w 0 new-tab -d .\apps\api cmd /k "npm run dev"
    goto gitstatus
)

IF "%COMMAND%"=="build" (
    echo(
    echo Running BUILD on server and client...
    cd server
    echo Building server...
    npm run build

    cd ..\client
    echo(
    echo Building client...
    npm run build

    cd ..
    goto gitstatus
)

IF "%COMMAND%"=="install" (
    echo(
    echo Running INSTALL on server and client...
    cd server
    echo Installing server dependencies...
    npm install

    cd ..\client
    echo(
    echo Installing client dependencies...
    npm install

    cd ..
    goto gitstatus
)

:invalid
echo Invalid argument: %COMMAND%
echo Available: dev, build, install
exit /b


:gitstatus
echo Showing Git status...
cmd /k "git status"
