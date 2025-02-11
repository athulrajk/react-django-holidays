from django.urls import path
from .views import get_holidays, search_holiday

urlpatterns = [
    path('holidays/', get_holidays, name='get_holidays'),
    path('holidays/search/', search_holiday, name='search_holiday'),
]
