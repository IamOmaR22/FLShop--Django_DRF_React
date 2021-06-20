from django.apps import AppConfig
from django.db.models import base


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    def ready(self):
        import base.signals   # Must register app like this in settings.py 'base.apps.BaseConfig',
