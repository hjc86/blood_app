from django.shortcuts import render
from .serializers import UserSerializer, DonorSerializer, ClinicSerializer
from .models import User, Donor, Clinic
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class UserView(APIView):
    """
    Retrieve, update or delete a user instance.
    """

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

 
    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UsersView(APIView):
    """
    create a new User with empty profile
    """

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

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


class FollowView(APIView):
    """
    follow a donor, unfollow a donor,get list of donors you follow, get list of donors who follow you
    """


    # def get(self, request):
    #     user1= Donor.objects.get(user_id=1)
    #     user2=Donor.objects.get(user_id=2)
    #     user3=Donor.objects.get(user_id=3)

    #     user1.following.add(user3)
    #     #User1.following.all()
    #     print(user1.following.all())
    #     content = {'message': 'Hello, World!'}
    #     return Response(content)


    
    def get_object(self, pk):
        try:
            return Donor.objects.get(user_id=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        following = self.following.all()
        serializer = UserSerializer(following)
        return Response(serializer.data)

 
    # def put(self, request, pk, format=None):
    #     user = self.get_object(pk)
    #     serializer = UserSerializer(user, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk, format=None):
    #     user = self.get_object(pk)
    #     user.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)



    # donor_1=User.objects.all()
    # print(donor_1)


    # #User.objects.all().filter(username=instance).values_list('is_clinic').first()
    # donor_3=Donor.objects.get('user_id'==3).follows.add(donor_1)


  #  print(donor_1.follows.all())
#     >>> user_1 = User.objects.get(pk = 1) # <-- mark
# >>> user_2 = User.objects.get(pk = 2) # <-- john

# >>> user_1.get_profile().follows.add(user_2.get_profile())
# >>> user_1.get_profile().follows.all()
# [<UserProfile: john>]
# >>> user_2.get_profile().follows.all()
# [<UserProfile: mark>]