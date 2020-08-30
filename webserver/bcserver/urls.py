from django.urls import include, path

from . import views

urlpatterns = [
    path(r'api-auth/', include('rest_framework.urls'))
]
