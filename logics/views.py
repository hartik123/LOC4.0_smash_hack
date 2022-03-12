from django.shortcuts import render
from rest_framework import generics
from app.settings import mongoClient

# Create your views here.
class Schedule(generics.GenericAPIView):
    def get(self, request):
        return
    def post(self, request):
        return