from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Node

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class NodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Node
        fields = ['owner', 'title', 'links', 'path']
