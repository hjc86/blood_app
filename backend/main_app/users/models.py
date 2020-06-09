from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    is_clinic = models.BooleanField(default=False)

class Donor(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=50,null=True, blank=True)
    last_name = models.CharField(max_length=50,null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    postcode =  models.CharField(max_length=50, null=True, blank=True)
    following = models.ManyToManyField('self', related_name='followers', symmetrical=False)


class Clinic(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)  
    address = models.CharField(max_length=50,null=True, blank=True)
    name =models.CharField(max_length=50,null=True, blank=True)
    geolocation = models.CharField(max_length=50,null=True, blank=True)
    address= models.CharField(max_length=50,null=True, blank=True)
    requirements = models.CharField(max_length=50,null=True, blank=True)
    opening_times = models.CharField(max_length=50,null=True, blank=True)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile( sender, instance, created, **kwargs ):
    print("===>",instance)
    (is_clinic,)=User.objects.all().filter(username=instance).values_list('is_clinic').first()
    if created and is_clinic==False:
        Donor.objects.create(user=instance)
    else:
        Clinic.objects.create(user=instance)
