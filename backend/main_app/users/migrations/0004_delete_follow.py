# Generated by Django 3.0.7 on 2020-06-08 11:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_donor_following'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Follow',
        ),
    ]
