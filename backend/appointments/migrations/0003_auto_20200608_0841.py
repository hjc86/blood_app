# Generated by Django 3.0.6 on 2020-06-08 07:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0002_auto_20200608_0833'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='client_id',
            new_name='clinic',
        ),
        migrations.RenameField(
            model_name='appointment',
            old_name='donor_id',
            new_name='donor',
        ),
    ]
