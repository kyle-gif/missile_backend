import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User

def create_users():
    # Create Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'password123')
        print('Superuser "admin" created.')
    else:
        print('Superuser "admin" already exists.')

    # Create Test User
    if not User.objects.filter(username='testuser').exists():
        User.objects.create_user('testuser', 'testuser@example.com', 'password123')
        print('Test user "testuser" created.')
    else:
        print('Test user "testuser" already exists.')

if __name__ == '__main__':
    create_users()
