from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.reverse import reverse

from .models import Node

class FileContentField(serializers.Field):
    """Takes a FilePathField from Django, and returns its content."""

    def to_representation(self, value):
        # read the file
        # TODO some safety here
        with open(value, 'r') as f:
            return f.read()

    def to_internal_value(self, value):
        raise serializers.ValidationError('The FileContentField cannot be edited')
            
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'nodes']

class DetailNodeSerializer(serializers.HyperlinkedModelSerializer):
    content = FileContentField(read_only=True, source='path')
    class Meta:
        model = Node
        fields = ['url', 'owner', 'title', 'links', 'content']

class ListNodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Node
        fields = ['url', 'owner', 'title', 'links']
