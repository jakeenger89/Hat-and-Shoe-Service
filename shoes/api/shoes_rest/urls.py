from django.urls import path
from .views import api_list_shoes, api_shoe_detail

urlpatterns = [
    path('shoes/', api_list_shoes, name='list_shoes'),
    path('shoes/<int:pk>/', api_shoe_detail, name='shoe_details')
]
