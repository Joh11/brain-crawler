from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import permissions

from .models import Node
from .serializers import *

# Permission

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class NodeViewSet(ReadOnlyModelViewSet):
    queryset = Node.objects.none()
    serializer_class = ListNodeSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    serializers = {
        'list': ListNodeSerializer,
        'retrieve': DetailNodeSerializer
    }
    def get_serializer_class(self):
        return self.serializers[self.action]

    def get_queryset(self):
        # Just so that it does not crash when using an anonymous user
        # The IsAuthenticated perm should be used anyway
        if not self.request.user.is_authenticated:
            return Node.objects.none()
        return Node.objects.filter(owner=self.request.user).order_by('id')
