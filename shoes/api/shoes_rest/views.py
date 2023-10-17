from hashlib import sha1
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Shoes

class ShoeEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
    ]

@require_http_methods(["GET"])
def list_shoes(request):
    shoes = Shoes.objects.all()
    return JsonResponse(
        {"shoes": shoes},
        encoder=ShoeEncoder
    )
