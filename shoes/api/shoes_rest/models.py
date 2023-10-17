from django.db import models

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)


class Shoes(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )
