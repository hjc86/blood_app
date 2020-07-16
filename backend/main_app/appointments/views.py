from django.shortcuts import render
from appointments.serializers import AppointmentSerializer,AppointmentsSerializer
from appointments.models import Appointment
import itertools
from users.serializers import UserSerializer, DonorSerializer, ClinicSerializer
from users.models import User, Clinic
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from datetime import datetime, timedelta, date
import calendar

import pytz

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
        appointment = self.get_object(pk)
        serializer = AppointmentSerializer(appointment, data=request.data)
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
    
class AppointmentList(APIView):

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

class AppointmentsOpen(APIView):

    def get_daily_slots(self, start, end, slot, date):
        # combine start time to respective day
        dt = datetime.combine(date, datetime.strptime(start,"%H:%M").time())
        slots = [dt]
        # increment current time by slot till the end time
        while (dt.time() < datetime.strptime(end,"%H:%M").time()):
            dt = dt + timedelta(minutes=slot)
            slots.append(dt)
        return slots


    def create_available_slots(self, opening_times,start_date, number_of_days ):
        
        clinic_timeslots = opening_times['clinic__timeslots']
        #print(clinic_timeslots)
        
        slots=[]
        for i in range(number_of_days):
            #get the calender day
            date_required = datetime.now().date() + timedelta(days=i)
            #find day in timeslots
            weekday = calendar.day_name[date_required.weekday()]
            try:
                #print(weekday,": ",clinic_timeslots[weekday])
               
                for r in clinic_timeslots[weekday]:
                    print(r[0],r[1])
                    daily_slots=self.get_daily_slots(start=r[0], end=r[1], slot=60, date=date_required)
                    slots = slots + daily_slots
            
            except:
                continue#print(weekday,": ","not open or not set")
        
        return slots      

    def create_slots(self, opening_times,start_date, number_of_days ):
        
        clinic_timeslots = opening_times['clinic__timeslots']
 
        def flatten(container):
            for i in container:
                if isinstance(i, (list,tuple)):
                    for j in flatten(i):
                        yield j
                else:
                    yield i    

        # print(list(clinic_timeslots.values()))
        flat_list = sorted(list(flatten(clinic_timeslots.values())))
        print(flat_list)

        slots=[]
        for i in range(number_of_days):
            #get the calender day
            date_required = datetime.now().date() + timedelta(days=i)
            #find day in timeslots
            weekday = calendar.day_name[date_required.weekday()]
            try:
                day=clinic_timeslots[weekday]
                #daily_slots = self.get_daily_slots(start=day[0][0], end=day[-1][1], slot=60, date=date_required)
                daily_slots = self.get_daily_slots(start=flat_list[0], end=flat_list[-1], slot=60, date=date_required)
                slots = slots + daily_slots
               # print("===>",slots)
    
            except:
                continue#print(weekday,": ","not open or not set")
   
        return slots, flat_list[0]   


    def utc_to_local(self,utc_dt):
        #local_tz = pytz.timezone('Europe/London')
        local_tz=tzinfo=pytz.utc
        local_dt = utc_dt.replace(tzinfo=None)#replace(tzinfo=pytz.utc)#.astimezone(local_tz)
        return utc_dt.replace(tzinfo=None)#local_tz.normalize(local_dt) # .normalize might be unnecessary

    def get_object(self, pk, donor_id, data):
        func_kwargs = {'data': data} if data else {}
        try:
            is_clinic = getattr(User.objects.get(pk=pk), 'is_clinic')
            
            if is_clinic:

                # find if a donor who is accesing the appointments page already has an appointment
                # if so set the slot in the array to be sent with the isSelected: true

                try:
                    
                    
                    donor_appointment = Appointment.objects.all().filter(donor_id=donor_id,clinic_id=pk).values_list('appointment_time','id')#,flat=True)

                    print("xxxxxxxxxxxxxxxxx:", donor_appointment)
                    #donor_appointment = self.utc_to_local(donor_appointment[0]) #.replace(tzinfo=timezone('Europe/London'))
                    donor_appointment, app_id = donor_appointment[0]
                    print(donor_appointment,app_id)
                except:
                    app_id = False
                    donor_appointment = 'null'
                
                print("donor appointment=======================>:", donor_appointment)
                #print("a: ",donor_appointment.tzinfo," b: ", donor_appointment.utcoffset())   
                # print(self.utc_to_local(donor_appointment))

                opening_times = User.objects.select_related('clinic').values('clinic__timeslots').get(id=pk)
                
                days=4

                theoretical_slots, min_hour = self.create_slots(opening_times, datetime.now().date(), days)
                #print(theoretical_slots)
               
                possible_slots = self.create_available_slots(opening_times, datetime.now().date(),days)
              

                booked_slots = Appointment.objects.all().filter(clinic_id=pk).values_list("appointment_time", flat=True)
                
            
                closed_slots = list(set(theoretical_slots) - set(possible_slots))
               
                # closed_slots_flag = [(closed_slot.replace(tzinfo=None), True) for closed_slot in closed_slots]
                # booked_slots_flag = [(booked_slot.replace(tzinfo=None), True) for booked_slot in booked_slots]

                closed_slots_flag = [(self.utc_to_local(closed_slot), True) for closed_slot in closed_slots]
                booked_slots_flag = [(self.utc_to_local(booked_slot), True) for booked_slot in booked_slots]


                available_slots_pre = set([self.utc_to_local(dt) for dt in list(possible_slots)]) - set([self.utc_to_local(dt) for dt in list(booked_slots)])
                available_slots = available_slots_pre - set([self.utc_to_local(dt) for dt in closed_slots])   

                available_slots_sorted = sorted(list(available_slots))
         

                available_slots_flag =  [(available_slot, False) for available_slot in available_slots_sorted]
                

                all_slots=booked_slots_flag + available_slots_flag + closed_slots_flag
                # for s in all_slots:
                #     print(s)
                all_slots_sorted = sorted(all_slots, key=lambda x:x[0])    
                
                #print(all_slots_sorted)

                # find way to automatically get todays date with the time of the first appointent slot for the day in the clinic timetable
                future_appointments = [app for app in all_slots_sorted if app[0] > datetime(2020,7,15,9,0)]
              
       
                
                days = {}
           
                for day in future_appointments:
                    #print(day)
                    days.setdefault(day[0].toordinal(),[]).append(day)
       
                
                slots_by_day_pre =[days.get(day, ['null']) for day in range(min(days), max(days)+1)]
                #for day in slots_by_day_pre:
                   # print("******",day)

                slots_by_day= sorted(slots_by_day_pre, key=lambda x:x[0])  
              

                slots_by_day_1=[]
                for day in slots_by_day:
                    if day!=['null']:
                        slots_by_day_1.append([{"id":date[0], "number":i, "isReserved":day[i-1][1]} for i,date in enumerate(day,1)])
                    
                    else:
                        slots_by_day_1.append([])


                slots_by_day_2=[]
            
                for day in slots_by_day_1:
            
                    slots_by_day_2.append([{'id':slot['id'], 'number':slot['number'], 'isSelected':True } if (slot['id']==donor_appointment) else slot for slot in day])


                for day in slots_by_day_2:
                    for slot in day:
                        print(slot)
                    print("=============================")
                    
                #serializer = slots_by_day_2
                time_split=min_hour.split(':')
                print(time_split)
                min_time=datetime.now().replace(hour=int(time_split[0]), minute=int(time_split[1]), second=0,microsecond=0)#- timedelta(days=1)

                serializer = {'appointments':slots_by_day_2, 'min_time': min_time, 'app_id': app_id}

            else:
                donor_apps = Appointment.objects.all().filter(donor_id=pk)
                serializer = AppointmentsSerializer(donor_apps, many=True, **func_kwargs)
        
            return serializer

        except User.DoesNotExist:
            raise Http404
    

    
    def get(self, request, pk, donor_id, format=None):
        serializer = self.get_object(pk, donor_id, data=None)
        #serializer = [date_time.strftime("%Y-%d-%mT%H:%M:00Z") for date_time in serializer]
        ##serializer = AppointmentSerializer(appointments)
        #print(serializer.data)
        #return Response(serializer)
        return Response(serializer)
