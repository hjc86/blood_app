from .models import User , Donor, Clinic
from rest_framework import serializers


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

class ClinicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clinic
        fields = ['user_id','name','geolocation','address','requirements','opening_times']

    def create(self, validated_data):
        # user = User.objects.get(pk=1)
        # print(user)
        clinic = Clinic(
            name=validated_data['name'],
            geolocation=validated_data['geolocation'],
            address=validated_data['is_clinic'],
            requirements = validated_data['requirements'],
            opening_times= validated_data['opening_times'],
        )

        # user.set_password(validated_data['password'])
        clinic.save()
        return clinic

class FollowSerializer(serializers.ModelSerializer):
    pass
