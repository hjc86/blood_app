from .models import User , Donor, Clinic
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
    class Meta:
        model = Donor
        fields = ['user_id','first_name','last_name','date_of_birth','postcode']

    def create(self, validated_data):

        donor = Donor(
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
        instance.save()

        return instance   

class ClinicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clinic
        fields = ['user_id','name','geolocation','address','requirements','opening_times']

    def create(self, validated_data):

        clinic = Clinic(
            name=validated_data['name'],
            geolocation=validated_data['geolocation'],
            address=validated_data['is_clinic'],
            requirements = validated_data['requirements'],
            opening_times= validated_data['opening_times'],
        )

       
        clinic.save()
        return clinic

class FollowingSerializer(serializers.Serializer):
    following = serializers.IntegerField()

    class Meta:
       fields=['following']


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
        data.update({'id': self.user.id})
        # and everything else you want to send in the response
        return data