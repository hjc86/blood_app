from users.models import User ,Donor, Clinic
from appointments.models import Appointment
from rest_framework import serializers
import pytz

class AppointmentSerializer(serializers.ModelSerializer):
    # donor= serializers.RelatedField(source='Donor', read_only=True)
    # clinic = serializers.RelatedField(source='Clinic', read_only=True)
    
    class Meta:
        model = Appointment
        fields = ['donor_id','clinic_id','appointment_time','attended']

    # def utc_to_local(self,utc_dt):
    #     local_tz = pytz.timezone('Europe/London')
    #     local_dt = utc_dt.replace(tzinfo=pytz.utc).astimezone(local_tz)
    #     return local_tz.normalize(local_dt) # .normalize might be unnecessary
    
    
    def local_to_utc(self,utc_dt):
        local_tz = pytz.timezone('Europe/London')
        local_dt = utc_dt.replace(tzinfo=local_tz).astimezone(pytz.utc)
        return local_tz.normalize(local_dt) # .normalize might be unnecessary
    
    def create(self, validated_data):

        appointment = Appointment(
            donor_id=validated_data['donor_id'],
            clinic_id=validated_data['clinic_id'],
            appointment_time=validated_data['appointment_time'],
            attended=validated_data['attended']
        )
        appointment.save()
        return appointment

    def update(self, instance, validated_data):

        instance.donor_id = validated_data.get('donor_id', instance.donor_id)
        instance.clinic_id = validated_data.get('clinic_id', instance.clinic_id)
        instance.appointment_time = validated_data.get('appointment_time', instance.appointment_time)
        instance.save()

        return instance   

class AppointmentsSerializer(serializers.ModelSerializer):
    # donor= serializers.RelatedField(source='Donor', read_only=True)
    # clinic = serializers.RelatedField(source='Clinic', read_only=True)
    
    class Meta:
        model = Appointment
        fields = ['donor_id','clinic_id','appointment_time','attended']

    