from .models import User , Donor, Clinic
from appointments.models import Appointment
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','is_clinic']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            is_clinic=validated_data['is_clinic'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        
        instance.username = validated_data.get('username', instance.username)
        instance.is_clinic = validated_data.get('is_clinic', instance.is_clinic)
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()

        return instance   

class DonorSerializer(serializers.ModelSerializer):
    
    #followee_id =serializers.CharField(read_only=True, source="user.id").values()
    followee_name = serializers.CharField(read_only=True, source="user.username")
    is_clinic = serializers.CharField(read_only=True, source="user.is_clinic")

    class Meta:
        model = Donor
        fields = ['user_id','first_name','last_name','date_of_birth','postcode','followee_name','is_clinic']
        
    def create(self, validated_data):

        donor = Donor(
            # username =  validated_data['username'],
            first_name = validated_data['first_name'],
            last_name=validated_data['last_name'],
            date_of_birth='2002-02-12',
            postcode = validated_data['postcode'],
        )

        donor.save()
        return donor


    def update(self, instance, validated_data):
        
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.postcode = validated_data.get('postcode', instance.postcode)
        
        instance.save()

        return instance   

class ClinicSerializer(serializers.ModelSerializer):
    is_clinic = serializers.CharField(read_only=True, source="user.is_clinic")

    class Meta:
        model = Clinic
        fields = ['user_id','name','geolocation','address','requirements','timeslots','is_clinic']

    def create(self, validated_data):

        clinic = Clinic(
            name=validated_data['name'],
            geolocation=validated_data['geolocation'],
            address=validated_data['address'],
            requirements = validated_data['requirements'],
            timeslots= validated_data['timeslots'],
        )

        clinic.save()
        return clinic


    def update(self, instance, validated_data):
    
        instance.name = validated_data.get('name', instance.name)
        instance.geolocation = validated_data.get('geolocation', instance.geolocation)
        instance.address = validated_data.get('address', instance.address)
        instance.requirements = validated_data.get('requirements', instance.requirements)
        instance.timeslots = validated_data.get('timeslots', instance.timeslots)

        instance.save()

        return instance       

class FollowSerializer(serializers.Serializer):
    follower = serializers.IntegerField()
    followee = serializers.IntegerField()
    followee_name = serializers.CharField(read_only=True, source="user.username")
    
    class Meta:
        fields=['follower','followee','followee_name']
    
    # def create   
    
    
class FollowersView(serializers.Serializer):
    followers = serializers.IntegerField()

    class Meta:
        fields=['followers']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        # data.update({'user': self.user.username})
        data.update({'id': self.user.id})#, 'is_clinic': self.user.is_clinic})
        # and everything else you want to send in the response
        return data

class FollowingSerializer(serializers.Serializer):
    followee = serializers.IntegerField()
    followee_name = serializers.CharField()
    
    class Meta:
        fields=['follower','followee_name']
    
    # def create   
    