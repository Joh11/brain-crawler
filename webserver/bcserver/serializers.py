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
            
class NodeHyperlink(serializers.HyperlinkedRelatedField):
    view_name = 'node-detail'
    # queryset = Node.objects.all()

    def get_url(self, obj, view_name, request, format):
        url_kwargs = {
            'user_pk': obj.owner.pk,
            'pk': obj.pk
        }

        return reverse(view_name, kwargs=url_kwargs, request=request, format=format)

    def get_object(self, view_name, view_args, view_kwargs):
        lookup_kwargs = {
            'owner__pk': view_kwargs['user_pk'],
            'pk': view_kwargs['pk']
        }

        return self.get_queryset().get(**lookup_kwargs)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    nodes = NodeHyperlink('node-detail', many=True, read_only=True)
    class Meta:
        model = User
        fields = ['url', 'username', 'nodes']

class DetailNodeSerializer(serializers.HyperlinkedModelSerializer):
    url = NodeHyperlink('node-detail', read_only=True, source='*')
    links = NodeHyperlink('node-detail', many=True, read_only=True)
    content = FileContentField(read_only=True, source='path')
    class Meta:
        model = Node
        fields = ['url', 'owner', 'title', 'links', 'content']

class ListNodeSerializer(serializers.HyperlinkedModelSerializer):
    url = NodeHyperlink('node-detail', read_only=True, source='*')
    links = NodeHyperlink('node-detail', many=True, read_only=True)
    class Meta:
        model = Node
        fields = ['url', 'owner', 'title', 'links']
