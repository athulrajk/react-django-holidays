from django.db import models

class Holiday(models.Model):
    country = models.CharField(max_length=2)
    year = models.IntegerField()
    name = models.CharField(max_length=255)
    date = models.DateField()
    description = models.TextField(blank=True, null=True)
    type = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} ({self.date}) - {self.country}"
