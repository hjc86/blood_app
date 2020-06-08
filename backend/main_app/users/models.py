from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    # all
    is_clinic = models.BooleanField(default=False)
    #pass
    # # donor
    # date_of_birth = models.DateField(null=True, blank=True)
    # postcode =  models.CharField(max_length=50, null=True, blank=True)

    # # clinic
    # geolocation = models.CharField(max_length=50,null=True, blank=True)
    # address= models.CharField(max_length=50,null=True, blank=True)
    # requirements = models.CharField(max_length=50,null=True, blank=True)
    # opening_times = models.CharField(max_length=50,null=True, blank=True)
    # name =models.CharField(max_length=50,null=True, blank=True)

    


class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    
    user =  models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50,null=True, blank=True)
    last_name = models.CharField(max_length=50,null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    postcode =  models.CharField(max_length=50, null=True, blank=True)

    # def __str__(self):
    #     return self.restaurant_name


class Clinic(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)  
    #user =  models.ForeignKey(User,on_delete=models.CASCADE)
    address = models.CharField(max_length=50,null=True, blank=True)
    name =models.CharField(max_length=50,null=True, blank=True)
    geolocation = models.CharField(max_length=50,null=True, blank=True)
    address= models.CharField(max_length=50,null=True, blank=True)
    requirements = models.CharField(max_length=50,null=True, blank=True)
    opening_times = models.CharField(max_length=50,null=True, blank=True)

    # def __str__(self):
    #     return self.user.get_full_name()

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile( sender, instance, created, **kwargs ):
    print("===>",instance)
    #user=User(username=instance)
    (is_clinic,)=User.objects.all().filter(username=instance).values_list('is_clinic').first()
    #user.objects

    #print(is_clinic)
    # print(user[0])
    # field_name = 'name'
    # obj = MyModel.objects.first()
    # field_object = MyModel._meta.get_field(field_name)
    # field_value = field_object.value_from_object(obj)

    if created and is_clinic==False:
        Donor.objects.create(user=instance)
    else:
        print("clinci")
        Clinic.objects.create(user=instance)