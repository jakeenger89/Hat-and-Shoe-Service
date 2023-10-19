from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Shoes, BinVO
import json


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href",
        "closet_name",
        "bin_number",
        "bin_size",
        "id",
        ]


class ShoeEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "id",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }

    def get_extra_data(self, o):
        return {"bin": o.bin.closet_name}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "id",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET","POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            bin_vo_id = content["bin"]
            bin = BinVO.objects.get(id=bin_vo_id)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        shoes = Shoes.objects.create(**content)
        return JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False,
        )



@require_http_methods(["GET", "DELETE"])
def api_shoe_detail(request, pk):
    if request.method == "GET":
        shoe = Shoes.objects.get(id=pk)
        return JsonResponse(
            {"shoe": shoe},
            encoder=ShoeDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Shoes.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count>0})

    else:
        return JsonResponse({"message": "Unsupported HTTP method"}, status=405)
