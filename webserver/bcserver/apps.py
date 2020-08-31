from django.apps import AppConfig
from django.db.backends.signals import connection_created
import logging

class BcserverConfig(AppConfig):
    name = 'bcserver'
