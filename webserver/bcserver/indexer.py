"""File used to index the files in the settings.NODES_PATH to the
database. """

import os
import glob

from django.conf import settings
from django.contrib.auth.models import User
from django.db.models import Q

from .parser import extract_simple
from .models import Node

def file_iter(root_path, extensions):
    """Iterate through every file in the given root_path directory,
    recursively. Only list files with the given extensions (not
    activated by default)
    """
    ret = []
    for ext in extensions: 
        files = glob.glob(root_path + '/*.' + ext)
        ret += [(f, ext) for f in files]
    return ret

def ls_dirs(path):
    return next(os.walk(path))[1]
                
def index_files():
    paths = []
    for d in ls_dirs(settings.NODES_PATH):
        try: # TODO use another way to store it per user more securely
            user = User.objects.get(username=d)
            print('Doing it for user {} {}'.format(user,
                                                   os.path.join(settings.NODES_PATH, d), user))
            paths.append(index_files_for_user(os.path.join(settings.NODES_PATH, d), user))
        except User.DoesNotExist:
            pass
    # step 2 : delete old entries
    # TODO do it !
    # q = Node.objects.filter(~Q(path__in=paths))
    # print('{} to delete'.format(len(q)))
    # print(q.delete())
    # print('paths = {}'.format([x.path for x in q]))

def index_files_for_user(directory, user):
    paths = []
    # step 1 : add entries
    for path, ext in file_iter(directory, ['org']):
        title, links = extract_simple(path)
        links = [os.path.join(directory, link) for link in links]
        print('Entry "{}" ({})'.format(title, links))
        try:      # check if the file is in the database
            node = Node.objects.get(path=path)
            # if so, update in place
            node.title = title
            node.links.set(Node.objects.filter(path__in=links))
            node.save()
        except Node.DoesNotExist: # else, create a new object
            print('path = {}'.format(path))
            node = Node.objects.create(owner=user, title=title, path=path)
            node.save()
            node.links.set(Node.objects.filter(path__in=links))
        paths.append(path)

    return paths
