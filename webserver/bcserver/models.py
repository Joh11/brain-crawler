from django.db import models
from django.contrib.auth.models import User

class Node(models.Model):
    """A node is an atomic fragment of knowledge. It is just indexed from
the files that actually store it. A node belongs to a certain user. It
can point to other nodes belonging to the same user. It has a title
and a path to the given file. The title can be generated from the
content of the file.

    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='nodes')
    title = models.CharField(max_length=200)
    # TODO prevent self reference
    links = models.ManyToManyField('self', symmetrical=False,
                                   related_name='backlinks', blank=True)
    path = models.FilePathField(path='/home/johan/org-roam/') # TODO add a root directory

    def __str__(self):
        return self.title
