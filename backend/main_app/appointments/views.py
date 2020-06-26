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
#from pytz import timezone
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


# get todays date
# find the day in the opentimes object
# terate through each day for 14 days
# flattend the structre so we ahve a ste of dates
# get the slots in the format we want
# find all the slots in the appointemnst table that are after todays date
# find the set difference between the opening times and the 

# retur this to frontend as range of date that can be picked

# def get_daily_slots(start, end, slot, date):
#     # combine start time to respective day
#     dt = datetime.combine(date, datetime.strptime(start,"%H:%M").time())
#     slots = [dt]
#     # increment current time by slot till the end time
#     while (dt.time() < datetime.strptime(end,"%H:%M").time()):
#         dt = dt + timedelta(minutes=slot)
#         slots.append(dt)
#     return slots


# # Some Dummy values 
# start_time = '9:00'
# end_time = '15:00'
# slot_time = 60
# number_of_days = 2
# start_date = datetime.now().date()



# for i in range(number_of_days):
#     #get the calender day
#     date_required = datetime.now().date() + timedelta(days=i)
    
#     #find day in timeslots
#     # for each time range in that day creat time slots:
#         # append together or list of list

#     # end


#     date_required = datetime.now().date() + timedelta(days=i)
#     daily_slots=get_daily_slots(start=start_time, end=end_time, slot=slot_time, date=date_required)
#     print([date_time.strftime("%m/%d/%Y, %H:%M") for date_time in daily_slots])
#     #print([calendar.day_name[date_time.weekday()] for date_time in daily_slots ])



class AppointmentsOpen(APIView):
   
    #weekday = calendar.day_name[todays_date.weekday()]
    #todays_date = datetime.now().date()
            
    #print(weekday)

   
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
   
        return slots   
        

        
        #  "2002-02-12T19:00:00Z",
        # date_required = datetime.now().date() + timedelta(days=i)
        # daily_slots=get_daily_slots(start=start_time, end=end_time, slot=slot_time, date=date_required)
        # print([date_time.strftime("%m/%d/%Y, %H:%M") for date_time in daily_slots])
        # #print([calendar.day_name[date_time.weekday()] for date_time in daily_slots ])
    def utc_to_local(self,utc_dt):
        local_tz = pytz.timezone('Europe/London')
        local_dt = utc_dt.replace(tzinfo=pytz.utc).astimezone(local_tz)
        return local_tz.normalize(local_dt) # .normalize might be unnecessary

    def get_object(self, pk, donor_id, data):
        func_kwargs = {'data': data} if data else {}
        try:
            is_clinic = getattr(User.objects.get(pk=pk), 'is_clinic')
            
            if is_clinic:

                # find if a donor who is accesing the appointments page already has an appointment
                # if so set the slot in the array to be sent with the isSelected: true

                try:
                    donor_appointment = Appointment.objects.all().filter(donor_id=donor_id).values_list('appointment_time',flat=True)
                    #print(donor_appointment)
                    donor_appointment = self.utc_to_local(donor_appointment[0]) #.replace(tzinfo=timezone('Europe/London'))
                  
                   # print(donor_appointment)
                except:
                    donor_appointment = 'null'
                
                print("donor appointment=======================>:", donor_appointment)
                #print("a: ",donor_appointment.tzinfo," b: ", donor_appointment.utcoffset())   
                # print(self.utc_to_local(donor_appointment))

                opening_times = User.objects.select_related('clinic').values('clinic__timeslots').get(id=pk)
                
                days=4

                theoretical_slots = self.create_slots(opening_times, datetime.now().date(), days)
              
               
                possible_slots = self.create_available_slots(opening_times, datetime.now().date(),days)
              

                booked_slots = Appointment.objects.all().filter(clinic_id=pk).values_list("appointment_time", flat=True)
                
            
                closed_slots = list(set(theoretical_slots) - set(possible_slots))
                closed_slots_flag = [(closed_slot.replace(tzinfo=None), True) for closed_slot in closed_slots]
                booked_slots_flag = [(booked_slot.replace(tzinfo=None), True) for booked_slot in booked_slots]

            
                available_slots_pre = set(possible_slots) - set([dt.replace(tzinfo=None) for dt in list(booked_slots)])
                available_slots = available_slots_pre - set([dt.replace(tzinfo=None) for dt in closed_slots])   

                available_slots_sorted = sorted(list(available_slots))
         

                available_slots_flag =  [(available_slot, False) for available_slot in available_slots_sorted]
                

                all_slots=booked_slots_flag + available_slots_flag + closed_slots_flag
                all_slots_sorted = sorted(all_slots, key=lambda x:x[0])    
                
                #print(all_slots_sorted)

                future_appointments = [app for app in all_slots_sorted if app[0]> datetime.now() - timedelta(days=1)]
                #future_appointments = [app for app in all_slots_sorted if app[0]>=datetime.now()] 
                
                days = {}
           
                for day in future_appointments:
                    print(day)
                    days.setdefault(day[0].toordinal(),[]).append(day)
       
                
                slots_by_day_pre =[days.get(day, ['null']) for day in range(min(days), max(days)+1)]
                #for day in slots_by_day_pre:
                   # print("******",day)

                slots_by_day= sorted(slots_by_day_pre, key=lambda x:x[0])  
              

                slots_by_day_1=[]
                for day in slots_by_day:
                    if day!=['null']:
                        # slots_by_day_1.append([{"id":date[0], "number":i, "isReserved":day[i-1][1]} for i,date in enumerate(day,1)])
                        slots_by_day_1.append([{"id":date[0], "number":i, "isReserved":day[i-1][1]} for i,date in enumerate(day,1)])
                    
                    else:
                        slots_by_day_1.append([])


                slots_by_day_2=[]
                isSelected= dict({'isSelected': True})
                for day in slots_by_day_1:
                    #print(day[0]['id'])
                    #slots_by_day_2.append([(slot.update(isSelected=True)) if (slot['id']==donor_appointment) else slot for slot in day])
                    slots_by_day_2.append([{'id':slot['id'],'number':slot['number'], 'isSelected':True } if (slot['id']==donor_appointment) else slot for slot in day])

                    #{'id':slot['id'], 'number':slot['number'], 'isReserved':slot['isReserved'],   
                #slots_by_day_1 = [for slot in {, "isSelected": True}]
                for day in slots_by_day_2:
                    print("=============================")
                    print(day)

                serializer = slots_by_day_2#available_slots #clinic_apps #AppointmentsSerializer(clinic_apps, many=True, **func_kwargs)

 

            else:
                donor_apps = Appointment.objects.all().filter(donor_id=pk)
                #print("donor_apps===========",donor_apps)
                #open_apps =[]
                serializer = AppointmentsSerializer(donor_apps, many=True, **func_kwargs)
            #print(open_apps)    
            return serializer

        except User.DoesNotExist:
            raise Http404
    

    
    def get(self, request, pk, donor_id, format=None):
        serializer = self.get_object(pk, donor_id, data=None)
        #serializer = [date_time.strftime("%Y-%d-%mT%H:%M:00Z") for date_time in serializer]
        ##serializer = AppointmentSerializer(appointments)
        #print(serializer.data)
        return Response(serializer)

