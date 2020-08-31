from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/<int:user_pk>/nodes/', views.node_list, name='node-list'),
    path('users/<int:user_pk>/nodes/<int:pk>/', views.node_detail, name='node-detail'),
    path('api-auth/', include('rest_framework.urls'))
]
