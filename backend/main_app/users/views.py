from django.shortcuts import render
from .serializers import UserSerializer, DonorSerializer, ClinicSerializer, FollowingSerializer
from .models import User, Donor, Clinic
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer 

class UsersChange(APIView):
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
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class UserCreate(APIView):
    """
    create a new User with empty profile
    """

    # def get(self, request, format=None):
    #     users = User.objects.all()
    #     serializer = UserSerializer(users, many=True)
    #     return Response(serializer.data)

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
    #permission_classes = (IsAuthenticated,)
    pass        

import json
class FollowCreate(APIView):
    """
    follow a donor, unfollow a donor,get list of donors you follow, get list of donors who follow you
    """
    
    def get_object(self, id):
        try:
            return Donor.objects.get(user_id=id)
        except User.DoesNotExist:
            raise Http404


    def get(self, request, id, format=None):
        following = self.get_object(id).following.all().values('user_id')
        print(following)
        serializer = FollowingSerializer(following, many=True)
        return Response(following)
    
    def delete(self, request, id, fromat=None):
        pass

    
    def post(self, request, format=None):
        


class FollowersView(APIView):
      
    def get_object(self, id):
        try:
            return Donor.objects.get(user_id=id)
        except User.DoesNotExist:
            raise Http404


    def get(self, request, id, format=None):
        followers = self.get_object(id).followers.all().values('user_id')
        print(followers)
        serializer = FollowingSerializer(followers, many=True)
        return Response(followers)

from .serializers import CustomTokenObtainPairSerializer



class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer