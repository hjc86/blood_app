from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, Appointment

class AppointmentTest(APITestCase):

    def test_create_user_account(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('user_create')
        data = {'username': 'random123', 'password': "password123", "is_clinic": "false" }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
     

    def test_donor_make_an_appointment(self):
        """
        Ensure we can create a new appointment
        """

        url = reverse('user_create')
        data = {'username': 'donor', 'password': "donor123", "is_clinic": "false" }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
            
        url = reverse('user_create')
        data = {'username': 'clinic', 'password': "clinic123", "is_clinic": "true" }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)


        url = reverse('app_create')
        
        data ={
            "appointment_time":"2002-02-12 15:00",
            "donor_id": "1",
            "clinic_id": "2",
            "attended": "false",
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Appointment.objects.count(), 1)

    def test_donor_cancel_appointment(self):   

        # create donor
        url = reverse('user_create')
        data = {'username': 'donor', 'password': "donor123", "is_clinic": "false" }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
            
        # create clinic    
        url = reverse('user_create')
        data = {'username': 'clinic', 'password': "clinic123", "is_clinic": "true" }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)


        # create appointment
        url = reverse('app_create')
        data ={
            "appointment_time":"2002-02-12 15:00",
            "donor_id": "1",
            "clinic_id": "2",
            "attended": "false",
        }

        response = self.client.post(url, data, format='json')
                
    
        # delete appointment
        
        url = reverse('app_change', kwargs={'pk':1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Appointment.objects.count(), 0)