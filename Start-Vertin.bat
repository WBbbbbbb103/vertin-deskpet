@echo off
setlocal
cd /d "%~dp0"
if not exist "node_modules\electron\dist\electron.exe" (
  echo Electron runtime was not found.
  echo Please run this once from the project folder:
  echo   npm.cmd start
  pause
  exit /b 1
)
start "" "node_modules\electron\dist\electron.exe" . --no-sandbox
endlocal
