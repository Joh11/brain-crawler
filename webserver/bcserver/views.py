from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import permissions

from .models import Node
from .serializers import UserSerializer, NodeSerializer

class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

# class NodeViewSet(ReadOnlyModelViewSet):
#     queryset = Node.objects.all()
#     serializer_class = NodeSerializer
#     permission_classes = [permissions.IsAuthenticated]

@csrf_exempt
def node_list(request, user_pk):
    owner = get_object_or_404(User, pk=user_pk)
    if request.method == 'GET':
        nodes = Node.objects.all().filter(owner=owner)

        serializer = NodeSerializer(nodes, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def node_detail(request, user_pk, pk):
    node = get_object_or_404(Node, pk=pk)
        
    if request.method == 'GET':
        
        serializer = NodeSerializer(node, context={'request': request})
        return JsonResponse(serializer.data)
