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
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

from django.contrib import admin
from django.urls import path
from django.urls import include, path
from django.contrib import admin
from rest_framework_simplejwt import views as jwt_views

from users import views as users_views
from appointments import views as appointments_views

urlpatterns = [
    #path('admin/', admin.site.urls),
    
    # path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'), # added by helder
    # path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), #added by helder

    path('register/', users_views.UsersView.as_view(), name='register'),
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='login'), #need to generate a token (token/), and send back to client in a response for storage on local, user is then directed to dashboard by client 

    #path('logout/',users_views.LogoutView.as_view(),name='logout'), # send user back to login page, destroy/nullify the token? dont know how we do this at the momment

    ####### all of these routes need to recieve a token from the client ##########################################

    path('users/<str:pk>/', users_views.UserView.as_view(), name='user'), # gives us username, password and is_clinic(shoudl not be changable) this ill be for acount managemnet modal for example
    #path('users/', users_views.UsersView.as_view(), name='users'), # get all users
    
    path('appointments/<str:user_id>/', appointments_views.AppointmentView.as_view(), name='appointment'),
    # we need to check if the user is a donor or a clinic
    # donor gets his/her appointmes
    # clinic gets all donors who have or will have appoinments

    # FollowView test
    path('follow/', users_views.FollowView.as_view(), name='follow'), 
    
    
    
    #path('follow/<str:pk>/', users_views.FollowView.as_view(), name='follow'), 
    # only relveant to donors
    # the person to be followed goes in the request. query params
    #the perosn doing the following comes from the body?


    
    # path('donors/',views.DonorView.as_view(), name='donors'),
    # path('clnics/',views.ClinicView.as_view(), name='clinics'),
    
    #########################################






]

    ####
"""
====>users


'register/' will ask from the client for a username and a password and whether a donor or clinic (frontend detemined)
'login/' will ask from the client for a username and a password (on backend we work out whether a donor or clinic)
'logout/' will stop the session

"""

##
""" 
=====>appointments

#function to create a list of appointment slots



we need to know time ranges of clinic
need to know todays date and day



# get list of availbe slots at a clinic for a donor
query the appoints for matching clinic_id
send back to client all the dates that are filled
then client marks all the dates as not available    

'appointment/'
make an appointment client selects a slot from a range of slots that is from the clinic profile
we check whether that slot is available by checking the appointsments table for a mathcing clinic_Id and a time slot
if it returns not found:
    then can make appointments
else:
    retunr 
"""


"""
=====>follow

want to follow another person
# recieve from client:
- username/tag of whom to follow (followee)
- my id (follower) 

rules: 
- cant follow self


# search for tag in donor profile
# return (followee) donor_id
# add (follower) donor_id, (followee) donor_id to table
"""

#   componentDidMount() {
#     if (this.state.logged_in) {
#       fetch('http://localhost:8000/core/current_user/', {
#         headers: {
#           Authorization: `JWT ${localStorage.getItem('token')}`
#         }
#       })
#         .then(res => res.json())
#         .then(json => {
#           this.setState({ username: json.username });
#         });
#     }
#   }


#   handle_login = (e, data) => {
#     e.preventDefault();
#     fetch('http://localhost:8000/token-auth/', {
#       method: 'POST',
#       headers: {
#         'Content-Type': 'application/json'
#       },
#       body: JSON.stringify(data)
#     })
#       .then(res => res.json())
#       .then(json => {
#         localStorage.setItem('token', json.token);
#         this.setState({
#           logged_in: true,
#           displayed_form: '',
#           username: json.user.username
#         });
#       });
#   };


#   handle_logout = () => {
#     localStorage.removeItem('token');
#     this.setState({ logged_in: false, username: '' });
#   };