from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    is_clinic = models.BooleanField(default=False)

class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=50,null=True, blank=True)
    last_name = models.CharField(max_length=50,null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    postcode =  models.CharField(max_length=50, null=True, blank=True)
    following = models.ManyToManyField('self', related_name='followers', symmetrical=False)
    #follows = models.ManyToManyField("self", related_name = 'follows')
    #follows = models.ManyToManyField('self', related_name='follower', symmetrical=False)
    # def __str__(self):
    #     return self.restaurant_name


class Clinic(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)  
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
    (is_clinic,)=User.objects.all().filter(username=instance).values_list('is_clinic').first()
    if created and is_clinic==False:
        Donor.objects.create(user=instance)
    else:
        Clinic.objects.create(user=instance)

# class Follow(models.Model):
#       following = models.ForeignKey(User, related_name="who_follows", on_delete=models.CASCADE)
#       follower = models.ForeignKey(User, related_name="who_is_followed", on_delete=models.CASCADE)
#       follow_time = models.DateTimeField(auto_now=True)



# class Follow(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
#     first_name = models.CharField(max_length=50,null=True, blank=True)
#     last_name = models.CharField(max_length=50,null=True, blank=True)
#     date_of_birth = models.DateField(null=True, blank=True)
#     postcode =  models.CharField(max_length=50, null=True, blank=True)       


    

    # class UserProfile(models.Model):
    # user = models.ForeignKey(User, unique = True, related_name = 'user')
    # follows = models.ManyToManyField("self", related_name = 'follows')