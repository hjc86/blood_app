from django.shortcuts import render
from .serializers import UserSerializer, DonorSerializer, ClinicSerializer, FollowSerializer
from .models import User, Donor, Clinic
from appointments.models import Appointment
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer 
from rest_framework.parsers import JSONParser
import io
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class UsersChange(APIView):

    # permission_classes = (IsAuthenticated,)
    """
    Retrieve, update or delete a user instance.
    """
    
    # there is mixing of logic here it feels like bad design


    def get_object(self, pk, data):
        
        func_kwargs = {'data': data} if data else {}
        
        try:
            is_clinic = getattr(User.objects.get(pk=pk), 'is_clinic')
            if is_clinic:
                clinic = Clinic.objects.get(user_id=pk)
                serializer = ClinicSerializer(clinic, **func_kwargs)
            else:
                donor = Donor.objects.get(user_id=pk)     
                serializer = DonorSerializer(donor, **func_kwargs)

            return serializer

        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        serializer=self.get_object(pk,data=None)
        

        return Response(serializer.data)
  
    def put(self, request, pk, format=None):
        serializer = self.get_object(pk, request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user=User.objects.get(pk=pk)
        #user = self.get_object(pk,data=None)
        user.delete()
        deleted_msg=f"user {pk} deleted"
        return Response({"msg":deleted_msg}, status=status.HTTP_204_NO_CONTENT)


class UserCreate(APIView):
    """
    create a new User with empty profile
    """

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DonorView(APIView):
    """ create profile """
    def post(self, request, format=None):
        serializer = DonorSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClinicView(APIView):
    """ create profile """
    def post(self, request, format=None):
        serializer = ClinicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


class LoginView(APIView):
    pass  


class LogoutView(APIView):
    pass        



class FollowCreate(APIView):
    """
    create a new User with empty profile
    """


    def get_object(self, request):
        try:
            return Donor.objects.get(user_id=request)
        except Donor.DoesNotExist:
            raise Http404


    def post(self, request, format=None):
        # need to make sure ids are not equal otherwise you can follow yourself

        serializer = FollowSerializer(data=request.data)       
    
        if serializer.is_valid():
            print(serializer.data)

            
            # self.get_object.get(username=request.username)    

            following = self.get_object(serializer.data['follower']).following.add(serializer.data['followee'])
            
            
            
            #serializer.save()
            return Response({"msg": "success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, format=None):
    
    #     serializer = FollowSerializer(data=request.data)       
        
    #     if serializer.is_valid():
    #         print(serializer.data)
    #         following = self.get_object(serializer.data['follower']).following.remove(serializer.data['followee'])
    #         #serializer.save()
    #         return Response({"msg": "followee deleted"}, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     # return Response(status=status.HTTP_204_NO_CONTENT)


class FollowChange(APIView):
    """
    create a new User with empty profile
    """

    def get_object(self, request):
        try:
            return Donor.objects.get(user_id=request)
        except Donor.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        following = self.get_object(id).following.all().values_list('user_id')
        flat_list = [item for sublist in following for item in sublist]
      
        following= User.objects.in_bulk(flat_list)
 
        dict_variable = {key:getattr(value, 'username') for (key,value) in following.items()}
        print(dict_variable)

        return Response(dict_variable)

    # def delete(self, request, id, id_followee format=None):
        
    #     serializer = FollowSerializer(data=request.data)       
        
    #     if serializer.is_valid():
    #         print(serializer.data)
    #         following = self.get_object(id).following.remove(id_followee)#serializer.data['followee'])
    #         serializer.save()
    #         return Response({"msg": "sucess"}, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #    # return Response(status=status.HTTP_204_NO_CONTENT)




class FollowDelete(APIView):
    """
    create a new User with empty profile
    """



    def delete(self, request, id, id_followee, format=None):
        try:
            print(id)
            following = Donor.objects.get(user_id=id).following.remove(id_followee)#serializer.data['followee'])
            return Response({"msg": f"followee {id_followee} deleted"}, status=status.HTTP_204_NO_CONTENT)

        except: 
             return Response({"msg": "could not delete followee"}, status=status.HTTP_400_BAD_REQUEST)


     

    # def delete(self, request, , format=None):
    #     user=User.objects.get(pk=pk)
    #     #user = self.get_object(pk,data=None)
    #     user.delete()
    #     deleted_msg=f"user {pk} deleted"
    #     return Response({"msg":deleted_msg}, status=status.HTTP_204_NO_CONTENT)

class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer

class UserDetails(APIView):
    pass

    # def get_object(self, request):
    #     try:
    #         return Donor.objects.get(user_id=request)
    #     except Donor.DoesNotExist:
    #         raise Http404


    # def get(self, request, id, format=None):
    #     following = self.get_object(id).following.all().values_list('user_id')
        
        
        
    #     flat_list = [item for sublist in following for item in sublist]
      
    #     following= User.objects.in_bulk(flat_list)
 
    #     dict_variable = {key:getattr(value, 'username') for (key,value) in following.items()}
    #     print(dict_variable)

    #     return Response(dict_variable)


class SearchDonor(APIView):
  #  permission_classes = (IsAuthenticated,)
    def get_object(self, username):
        try:
            return User.objects.filter(username__startswith=username).values('id','username')#get(username=username).values_list('id','username')
        except User.DoesNotExist:
            raise Http404

    def get(self, request, username, format=None):
        donorList = self.get_object(username)
        
        return Response(donorList)


