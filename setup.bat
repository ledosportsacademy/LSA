@echo off
echo ===================================================
echo Ledo Sports Academy Management System Setup
echo ===================================================
echo.

echo Installing dependencies...
npm install

echo.
echo Creating necessary directories...
if not exist "backend\models" mkdir backend\models
if not exist "backend\controllers" mkdir backend\controllers
if not exist "backend\routes" mkdir backend\routes

echo.
echo Setup completed successfully!
echo.
echo To start the application in development mode, run: npm run dev
echo To seed the database with sample data, run: npm run seed
echo.
echo ===================================================
echo.

pause