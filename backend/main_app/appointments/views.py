from django.shortcuts import render
from appointments.serializers import AppointmentSerializer,AppointmentsSerializer
from appointments.models import Appointment

from users.serializers import UserSerializer, DonorSerializer, ClinicSerializer
from users.models import User
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class AppointmentsChange(APIView):
    """
    retrieve, update or cancel appoinment
    """

    #permission_classes = (IsAuthenticated,)
    
    def get_object(self, pk):
        try:
            return Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        appointment = self.get_object(pk)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        appointment = self.get_object(pk)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AppointmentCreate(APIView):
    """
    create a new User with empty profile
    """

    #permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        serializer = AppointmentSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def get(self, request, pk, format=None):
    #     appointment = self.get_object(pk)
    #     serializer = AppointmentSerializer(appointment)
    #     return Response(serializer.data)

    
class AppointmentList(APIView):
    # def get_object(self, pk):
    #     try:
    #         return Appointment.objects.get(pk=pk)
    #     except Appointment.DoesNotExist:
    #         raise Http404

    def get_object(self, pk, data):
        func_kwargs = {'data': data} if data else {}
        try:
            is_clinic = getattr(User.objects.get(pk=pk), 'is_clinic')
            print("****************",is_clinic)
            if is_clinic:
                clinic_apps = Appointment.objects.all().filter(clinic_id=pk)
                print("clinic_apps===========",clinic_apps)
                serializer = AppointmentsSerializer(clinic_apps, many=True, **func_kwargs)
            else:
                donor_apps = Appointment.objects.all().filter(donor_id=pk)
                print("donor_apps===========",donor_apps)
                serializer = AppointmentsSerializer(donor_apps, many=True, **func_kwargs)

            return serializer

        except User.DoesNotExist:
            raise Http404
    
    
    def get(self, request, pk, format=None):
        serializer = self.get_object(pk, data=None)
        ##serializer = AppointmentSerializer(appointments)
        print(serializer.data)
        return Response(serializer.data)


class AppointmentsOpen(APIview):
    def get(self, request, pk, format=None):
        #x.difference_update(y) 
        base = datetime.datetime.today()
        date_list = [base - datetime.timedelta(days=x) for x in range(numdays)]


        # send appointment slots for clinic

        # - create an object with slots for next 2 weeks base on what is sent
        # - find all slots in table for the clinic==> make it a set
        # - remove any slots from object ==> make it a set
        # - 
        # - send back to clinic




    
        pass