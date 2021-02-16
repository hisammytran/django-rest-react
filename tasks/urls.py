from django.urls import path
from . import views

urlpatterns = [
    # path('api/task/', views.TaskListCreate.as_view() ),
    path('api/', views.apiOverview, name='api-overview'),
    path('api/task-list/', views.taskList, name='Task List'),
    path('api/task-detail/<str:pk>/', views.taskDetail, name='Task Detail'),
    path('api/task-create/', views.taskCreate, name='Create Task'),
    path('api/task-update/<str:pk>/', views.taskUpdate, name='Update Task'),
    path('api/task-delete/<str:pk>/', views.taskDelete, name='Delete Task'),
    
]