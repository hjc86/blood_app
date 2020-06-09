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

# urlpatterns = [

#     path('register/', users_views.UsersView.as_view(), name='register'),
    
#     #need to generate a token (token/), and send back to client in a response for storage on local, user is then directed to dashboard by client 
#     path('login/', jwt_views.TokenObtainPairView.as_view(), name='login'),
    
#     # gives us username, password and is_clinic(shoudl not be changable) this ill be for acount managemnet modal for example
#     path('users/<str:pk>/', users_views.UserView.as_view(), name='user'), 
 
#     path('appointments/<str:user_id>/', appointments_views.AppointmentView.as_view(), name='appointment'),
   
#     path('following/<str:id>', users_views.FollowingView.as_view(), name='following'), 
    
#     path('followers/<str:id>', users_views.FollowersView.as_view(), name='followers'), 
# ]

# urlpatterns = [
#     # This one now has the custom view mapped with the custom serializer that includes the desired data
#     path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('token/verify/', TokenVerifyView.as_view(), name='token_verify')
# ]


####routes as written in final-project table


urlpatterns = [
    
    #need to generate a token (token/), and send back to client in a response for storage on local, user is then directed to dashboard by client 
    #path('login/', jwt_views.TokenObtainPairView.as_view(), name='login'), 
    
    path('login/', users_views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('token/verify/', TokenVerifyView.as_view(), name='token_verify')

    # send user back to login page, destroy/nullify the token? dont know how we do this at the momment
    path('logout/',users_views.LogoutView.as_view(),name='logout'),

    path('user/', users_views.UserCreate.as_view(), name='user_create'),
    path('user/<str:pk>', users_views.UsersChange.as_view(), name='user_change'),

    path('appointment/',appointments_views.AppointmentCreate.as_view(), name='app_create'),
    path('appointment/<str:pk>',appointments_views.AppointmentsChange.as_view(), name='app_create'),

    path('follow/', users_views.FollowCreate.as_view(), name='follow_create'), 
    path('follow/<str:id>', users_views.FollowChange.as_view(), name='follow_Change'), 

]

