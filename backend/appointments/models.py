from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from users.models import User, Clinic, Donor


# Create your models here.


class Appointment(models.Model):
    donor = models.ForeignKey(Donor,on_delete=models.CASCADE)
    clinic = models.ForeignKey(Clinic,on_delete=models.CASCADE)
    appointment_time = models.DateTimeField(null=True)
    attended = models.BooleanField(default=False)