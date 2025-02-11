import requests
from django.core.cache import cache
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Holiday
from .serializers import HolidaySerializer

# Pagination
class HolidayPagination(PageNumberPagination):
    page_size = 10

@api_view(['GET'])
def get_holidays(request):
    country = request.GET.get('country', 'US')
    year = request.GET.get('year', '2024')

    cache_key = f"holidays_{country}_{year}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)

    # Check if holidays exist in database
    holidays = Holiday.objects.filter(country=country, year=year)
    if holidays.exists():
        serializer = HolidaySerializer(holidays, many=True)
        cache.set(cache_key, serializer.data, timeout=86400)
        return Response(serializer.data)

    # Fetch from Calendarific API
    api_url = f"https://calendarific.com/api/v2/holidays?api_key={settings.CALENDARIFIC_API_KEY}&country={country}&year={year}"
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json().get("response", {}).get("holidays", [])
        holiday_list = []

        for item in data:
            holiday_obj, created = Holiday.objects.get_or_create(
                country=country,
                year=year,
                name=item["name"],
                date=item["date"]["iso"],
                defaults={"description": item.get("description", ""), "type": ", ".join(item.get("type", []))}
            )
            holiday_list.append({
                "name": holiday_obj.name,
                "date": holiday_obj.date,
                "description": holiday_obj.description,
                "type": holiday_obj.type,
                "country": holiday_obj.country,
                "year": holiday_obj.year
            })

        cache.set(cache_key, holiday_list, timeout=86400)
        return Response(holiday_list)

    return Response({"error": "Failed to fetch data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def search_holiday(request):
    name = request.GET.get('name', '')

    if not name:
        return Response({"error": "Holiday name is required"}, status=status.HTTP_400_BAD_REQUEST)

    cache_key = f"search_{name.lower()}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)

    holidays = Holiday.objects.filter(name__icontains=name)
    serializer = HolidaySerializer(holidays, many=True)

    cache.set(cache_key, serializer.data, timeout=86400)
    return Response(serializer.data)
