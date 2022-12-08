from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    gr_Number = models.CharField(max_length=6, null=True)

    def __str__(self):
        return self.gr_Number

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


class Subject_name(models.Model):
    title = models.CharField(max_length=25, null=True)
    added = models.DateTimeField(max_length=8, null=True)
    to_group = models.ManyToManyField(Group)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Предмет'
        verbose_name_plural = 'Предметы'


class Student(models.Model):
    student_name = models.CharField(max_length=25)
    surname = models.CharField(max_length=25)
    number_group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True)

    # subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True)
    # users_auth = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.student_name

    class Meta:
        verbose_name = 'Студент'
        verbose_name_plural = 'Студенты'


class Questions(models.Model):
    subject_name = models.ForeignKey(Subject_name, on_delete=models.CASCADE)
    text = models.CharField(max_length=500)

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'


class Choice(models.Model):
    questions = models.ForeignKey(Questions, on_delete=models.CASCADE)
    answers = models.CharField(max_length=150)
    correct = models.BooleanField()

    def __str__(self):
        return self.answers

    class Meta:
        verbose_name = 'Вариант'
        verbose_name_plural = 'Варианты'


class Result(models.Model):
    subject = models.ForeignKey(Subject_name, on_delete=models.CASCADE)
    users = models.ForeignKey(User, on_delete=models.CASCADE)
    result = models.FloatField(default=0.0)

    class Meta:
        verbose_name = 'Результат'
        verbose_name_plural = 'Результаты'
