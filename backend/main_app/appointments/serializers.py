from users.models import User ,Donor, Clinic
from appointments.models import Appointment
from rest_framework import serializers


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['donor_id','clinic_id', 'appointment_time','attended']

    def create(self, validated_data):


        appointment = Appointment(
            donor_id=validated_data['donor_id'],
            clinic_id=validated_data['clinic_id'],
        )
        appointment.save()
        return appointment

    def update(self, instance, validated_data):

        instance.donor_id = validated_data.get('donor_id', instance.username)
        instance.clinic_id = validated_data.get('clinic_id', instance.is_clinic)
        instance.save()

        return instance   