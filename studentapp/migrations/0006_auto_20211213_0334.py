# Generated by Django 3.2.9 on 2021-12-13 03:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studentapp', '0005_rename_subjects_subject'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='student',
            options={'verbose_name': 'Student', 'verbose_name_plural': 'Students'},
        ),
        migrations.AlterModelOptions(
            name='subject',
            options={'verbose_name': 'Subject', 'verbose_name_plural': 'Subjects'},
        ),
    ]