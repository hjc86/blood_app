"""main_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include, path
from django.contrib import admin
from rest_framework_simplejwt import views as jwt_views

from users import views as users_views
from appointments import views as appointments_views


####routes as written in final-project table


urlpatterns = [
    
    path('login/', users_views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # path('logout/',users_views.LogoutView.as_view(),name='logout'),

    path('user/', users_views.UserCreate.as_view(), name='user_create'),
    path('user/<str:pk>', users_views.UsersChange.as_view(), name='user_change'),

    path('appointment/',appointments_views.AppointmentCreate.as_view(), name='app_create'),
    path('appointment/<str:pk>',appointments_views.AppointmentsChange.as_view(), name='app_change'),
    path('user_appointments/<str:pk>', appointments_views.AppointmentList.as_view(), name='app_list'),
    
    # path('available_apointments/', appointments_views.AppointemntsOpen.as_view(), name='app_list'),

    path('follow/', users_views.FollowCreate.as_view(), name='follow_create'), 
    path('follow/<str:id>/', users_views.FollowChange.as_view(), name='follow_Change'), 
    path('follow/<str:id>/<str:id_followee>/', users_views.FollowDelete.as_view(), name='follow_Delete'), 
]

