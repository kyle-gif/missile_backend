#!/bin/bash

echo "Starting setup..."

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat <<EOT >> .env
SECRET_KEY=django-insecure-dummy-key-change-me
DEBUG=True
ALLOWED_HOSTS=*
OPENAI_API_KEY="sk-proj-bUhh0eedfPIHyrEj9d6QT3BlbkFJYaqiiofo18TyA0NkopRX"
EOT
fi

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Run migrations
echo "Running migrations..."
python3 manage.py migrate

# Start server
echo "Starting server..."
python3 manage.py runserver
