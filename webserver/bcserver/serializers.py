from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.reverse import reverse

from .models import Node

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username']

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
        
class NodeSerializer(serializers.HyperlinkedModelSerializer):
    url = NodeHyperlink('node-detail', read_only=True, source='*')
    links = NodeHyperlink('node-detail', many=True, read_only=True)
    class Meta:
        model = Node
        fields = ['url', 'owner', 'title', 'links', 'path']
