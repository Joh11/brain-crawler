from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('nodes', views.NodeViewSet)

urlpatterns = [
    path('', include(router.urls)), 
    path('api-auth/', include('rest_framework.urls'))
]
