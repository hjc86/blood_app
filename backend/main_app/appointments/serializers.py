from users.models import User ,Donor, Clinic
from appointments.models import Appointment
from rest_framework import serializers


class AppointmentSerializer(serializers.ModelSerializer):
    # donor= serializers.RelatedField(source='Donor', read_only=True)
    # clinic = serializers.RelatedField(source='Clinic', read_only=True)
    
    class Meta:
        model = Appointment
        fields = ['donor_id','clinic_id','appointment_time','attended']

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

    