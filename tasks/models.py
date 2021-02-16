from django.db import models

# Create your models here.

class Task(models.Model):
    PRIORITIES = (
        ('T','TODO'),
        ('D','Due Today'),
        ('I','In Progress'),
        ('C','Completed')
    )
    name = models.CharField(max_length=100)
    summary = models.CharField(max_length=300)
    priority = models.CharField(max_length=1, choices = PRIORITIES)