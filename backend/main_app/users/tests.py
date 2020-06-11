# from django.test import TestCase

# Create your tests here.
# from rest_framework.test import APIRequestFactory


# factory = APIRequestFactory()
# request = factory.post('/notes/', {'title': 'new idea'}, format='json')
# Using the standard RequestFactory API to create a form POST request

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User




####routes as written in final-project table


# urlpatterns = [
    
#     path('login/', users_views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
#     # path('logout/',users_views.LogoutView.as_view(),name='logout'),

#     path('user/', users_views.UserCreate.as_view(), name='user_create'),
#     path('user/<str:pk>', users_views.UsersChange.as_view(), name='user_change'),

#     path('appointment/',appointments_views.AppointmentCreate.as_view(), name='app_create'),
#     path('appointment/<str:pk>',appointments_views.AppointmentsChange.as_view(), name='app_change'),
#     path('user_appointments/<str:pk>', appointments_views.AppointmentList.as_view(), name='app_list'),
    
#     # path('available_apointments/', appointments_views.AppointemntsOpen.as_view(), name='app_list'),

#     path('follow/', users_views.FollowCreate.as_view(), name='follow_create'), 
#     path('follow/<str:id>/', users_views.FollowChange.as_view(), name='follow_Change'), 
#     path('follow/<str:id>/<str:id_followee>/', users_views.FollowDelete.as_view(), name='follow_Delete'), 
# ]


class AccountTests(APITestCase):
    def test_create_user_account(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('user_create')
        data = {'username': 'random123', 'password': "password123", "is_clinic": "false" }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)


    def test_delete_user_account(self):    
        url = reverse('user_create')
        data = {'username': 'random123', 'password': "password123", "is_clinic": "false" }
        self.client.post(url, data, format='json')
        url = reverse('user_change', kwargs={'pk':1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 0)