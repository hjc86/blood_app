from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from .models import User, Donor

# factory = APIRequestFactory()
# request = factory.post('/notes/', {'title': 'new idea'}, format='json')


class AccountTest(APITestCase):
    def test_create_user_account(self):
        """
        Ensure we can create a new user acount
        """
        url = reverse('user_create')
        data = {'username': 'random123', 'password': "password123", "is_clinic": "false" }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)


    def test_delete_user_account(self):    
        """
        Ensure we can delete a new user acount
        """
        url = reverse('user_create')
        data = {'username': 'random123', 'password': "password123", "is_clinic": "false" }
        self.client.post(url, data, format='json')
        url = reverse('user_change', kwargs={'pk':1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 0)


    def test_follow_a_donor_profile(self):    
        """
        Ensure we can follow a donor
        """
        url = reverse('user_create')
        data = {'username': 'donor_1', 'password': "password1", "is_clinic": "false" }
        donor_1= self.client.post(url, data, format='json')
        
        url = reverse('user_create')
        data = {'username': 'donor_2', 'password': "password2", "is_clinic": "false" }  
        donor_2 = self.client.post(url, data, format='json')


        data ={
            "follower":1,
            "followee":2
        }

        url = reverse('follow_create')
        response=self.client.post(url, data, format='json')
       
        print("===> ",response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Donor.objects.get(user_id=1).following.count() , 1)    
        self.assertEqual(response.data["msg"], "success")     
    
    def test_unfollow_a_donor_profile(self):    
        """
        Ensure we can unfollow
        """

        url = reverse('user_create')
        data = {'username': 'donor_1', 'password': "password1", "is_clinic": "false" }
        donor_1= self.client.post(url, data, format='json')
        
        url = reverse('user_create')
        data = {'username': 'donor_2', 'password': "password2", "is_clinic": "false" }  
        donor_2 = self.client.post(url, data, format='json')

        data={
       
        "follower":1,
        "followee":2
        }

 
        url = reverse('follow_Delete', kwargs={'id':1,'id_followee':2})
       
        self.client.delete(url, format='json')
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Donor.objects.get(user_id=1).following.count(),0)  
        self.assertEqual(response.data["msg"], "followee 2 deleted")