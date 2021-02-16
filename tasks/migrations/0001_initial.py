# Generated by Django 3.1.4 on 2020-12-08 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('summary', models.CharField(max_length=300)),
                ('priority', models.CharField(choices=[('T', 'TODO'), ('D', 'Due Today'), ('I', 'In Progress'), ('C', 'Completed')], max_length=1)),
            ],
        ),
    ]