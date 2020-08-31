from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet)
router.register('nodes', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)), 
    path('api-auth/', include('rest_framework.urls'))
]
