from django.urls import path
from .views import StudentView, maps, signup, assistant, schedules, ResultListView, check, voprosi
from django.conf import settings
from django.conf.urls.static import static
app_name = 'studentapp'

urlpatterns = [
    path('', StudentView.as_view(), name='index'),
    path('maps/', maps, name='maps'),
    path('signup/', signup, name='signup'),
    path('assistent/', assistant, name='assistent'),
    # path('account/', account, name='account'),
    path('schedules/', schedules, name='schedules'),
    path('questions/<int:subject_id>/', voprosi, name='questions'),
    path('check/', check, name='check'),
    path('scores/', ResultListView.as_view(), name='scores')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
