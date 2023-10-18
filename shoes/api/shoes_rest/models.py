from django.db import models
from django.urls import reverse

class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField(blank=True, null=True)
    bin_size = models.PositiveSmallIntegerField(blank=True, null=True)

    def get_api_url(self):
        return reverse("api_bin", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.closet_name} - {self.bin_number}/{self.bin_size}"

    class Meta:
        ordering = ("closet_name", "bin_number", "bin_size")

class Shoes(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)

    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.color} {self.model_name}"

    def get_api_url(self):
        return reverse("api_shoe_detail", kwargs={"pk": self.pk})
