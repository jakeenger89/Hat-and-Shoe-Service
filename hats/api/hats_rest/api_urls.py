from django.urls import path
from .views import api_hat_list, api_hat_detail


urlpatterns = [
    path("hats/", api_hat_list, name="api_hat_list"),
    path("hats/<int:pk>/", api_hat_detail, name="api_hat_detail"),
]
