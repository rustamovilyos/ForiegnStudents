from django.contrib import admin
from studentapp.models import Student, Subject_name, Group, Questions, Choice, Result


class GroupFields(admin.ModelAdmin):
    list_display = ('id', 'gr_Number')
    list_filter = ('gr_Number',)
    search_fields = ('id', 'gr_Number')


class SubjectFields(admin.ModelAdmin):
    list_display = ('id', 'title', 'added')
    list_filter = ('added',)
    search_fields = ('id', 'title', 'added')


class StudentFields(admin.ModelAdmin):
    list_display = ('id', 'student_name', 'surname', 'number_group')
    list_filter = ('number_group',)
    search_fields = ('student_name', 'surname', 'number_group')


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'subject_name', 'text')
    search_fields = ('subject_name', 'text')


class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'questions', 'answers', 'correct')
    list_filter = ('correct',)
    search_fields = ('questions', 'answers')


class ResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'subject', 'users', 'result')
    list_filter = ('result',)
    search_fields = ('subject', 'users', 'result')


admin.site.register(Student, StudentFields)
admin.site.register(Subject_name, SubjectFields)
admin.site.register(Group, GroupFields)
admin.site.register(Questions, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
admin.site.register(Result, ResultAdmin)
