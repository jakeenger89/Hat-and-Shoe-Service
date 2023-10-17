from django.urls import path
from . import views

urlpatterns = [
    path('list_shoes/', views.list_shoes, name='list_shoes'),
]
