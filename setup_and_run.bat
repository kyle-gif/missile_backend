@echo off
echo Starting setup...

REM Check if venv exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate venv
echo Activating virtual environment...
call venv\Scripts\activate

REM Install dependencies
echo Installing dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Run migrations
echo Running migrations...
python manage.py migrate

REM Start server
echo Starting server...
python manage.py runserver

pause
