# Generated by Django 3.0.7 on 2020-06-13 20:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_donor_appointment_with'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='donor',
            name='appointment_with',
        ),
    ]
