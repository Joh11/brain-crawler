from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions

from .models import Node
from .serializers import UserSerializer, NodeSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class NodeViewSet(viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
