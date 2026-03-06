@echo off
title Residencial Diamont — Cabo Roig
cd /d "C:\Users\juanc\Desktop\cabo-roig"
echo.
echo  ===================================
echo   RESIDENCIAL DIAMONT - CABO ROIG
echo   Plataforma de ventas exclusiva
echo   INMOBANCA
echo  ===================================
echo.
echo  Iniciando servidor en puerto 3005...
echo  Abriendo navegador...
echo.
start http://localhost:3005
npm run dev
