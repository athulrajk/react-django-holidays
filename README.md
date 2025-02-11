# Holiday Tracker

A full-stack Django + React application that fetches and displays holiday data using the Calendarific API.

## Features
✅ Fetches holiday data based on country & year  
✅ Caching to reduce API calls  
✅ Search holidays by name  
✅ Responsive UI with Tailwind CSS  
✅ Backend: Django & DRF  
✅ Frontend: React  

## Setup Instructions

### 1️⃣ Backend (Django)
```sh
# Clone the repository
git clone 

# Create virtual environment & install dependencies
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt

# Create .env file and add your API key
echo "CALENDARIFIC_API_KEY=addZVpBUOYJQbZRwT4JLVgePxe6dwcqS"
 > .env

# Run Django server
python manage.py migrate
python manage.py runserver
