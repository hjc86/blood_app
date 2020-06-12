from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User

class AccountTest(APITestCase):
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