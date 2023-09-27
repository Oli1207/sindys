from django.urls import path
from base.views import produit_views as views


urlpatterns = [

    path('', views.getProduits, name='produits'),

   
    path('<int:pk>/', views.getProduit, name='produit'),

    path('<int:pk>/reviews/', views.createProductReview, name='create-review'),
]