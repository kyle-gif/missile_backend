#!/bin/bash

echo "Starting setup..."

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
