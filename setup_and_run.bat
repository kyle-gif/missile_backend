@echo off
echo Starting setup...

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file...
    (
        echo SECRET_KEY=django-insecure-dummy-key-change-me
        echo DEBUG=True
        echo ALLOWED_HOSTS=*
        echo OPENAI_API_KEY=""
    ) > .env
)

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
