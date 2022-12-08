from django.shortcuts import render
from .models import Student, Subject_name, Questions, Choice, Result
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.views.generic import ListView
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
import random


# @login_required
# def student(request):
#     studenti = Student.objects.all()
#     return render(request, 'studentapp/index.html', {'students': studenti})
class StudentView(ListView):
    model = Student
    template_name = 'studentapp/index.html'


@login_required
def maps(request):
    return render(request, 'studentapp/maps.html')


@login_required
def assistant(request):
    subjects_info = Subject_name.objects.all()
    return render(request, 'studentapp/assistent.html', {'subject_name': subjects_info})


@login_required
def signup(request):
    context = {}
    form = UserCreationForm(request.POST)
    print(f'{form=}')
    if request.method == "POST":
        if form.is_valid():
            user = form.save()
            login(request, user)
            return render(request, 'studentapp/index.html')
    context['form'] = form
    return render(request, 'registration/login.html', context)


# @login_required
# def account(request):
#     return render(request, 'studentapp/account.html')


@login_required
def schedules(request):
    return render(request, 'studentapp/schedules.html')


class ResultListView(ListView):
    template_name = 'studentapp/account.html'

    def get_queryset(self):
        return Result.objects.filter(users=self.request.user)

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super(ResultListView, self).dispatch(request, *args, **kwargs)


@login_required
def voprosi(request, subject_id):
    predmet = Subject_name.objects.get(pk=subject_id)
    vse_voprosi = Questions.objects.filter(subject_name=predmet)
    return render(request, 'studentapp/questions.html', {'vse_voprosi': vse_voprosi})


@login_required
def check(request):
    user = request.user
    answer = []
    questions_numb = []
    for key, value in request.GET.items():
        questions_numb.append(key)
        answer.append(int(value))
    print(key, value)
    print(answer)
    print(questions_numb)
    questions_l = Questions.objects.filter(id__in=questions_numb)
    choices = Choice.objects.filter(id__in=answer)
    print('questions_l', questions_l)
    print('choices', choices)
    correct_answer = 0
    for ch in choices:
        if ch.correct:
            correct_answer += 1
    result = (correct_answer / len(answer) * 100)
    print(result)

    Result.objects.update_or_create(
        users=user, subject=questions_l[0].subject_name,
        defaults={
            'users': user,
            'subject': questions_l[0].subject_name,
            'result': result
        },
    )

    return render(request, 'studentapp/result.html',
                  {
                      'questions_l': questions_l,
                      'answer': answer,
                      'result': result
                  })
