from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK
from app.settings import mongoClient
from .serializers import SupplyReqSerializer
import json
from bson import json_util
from bson.objectid import ObjectId

# Create your views here.
class SupplyReqView(generics.GenericAPIView):
    serializer_class = SupplyReqSerializer
    def post(self, request, *args, **kwargs):
        serializer = SupplyReqSerializer(data=request.data)
        if serializer.is_valid():
            data = json.loads(json_util.dumps(list(mongoClient.scm.products.find({'_id': ObjectId(serializer.validated_data['product_id'])}))))
            return Response(data,status=HTTP_200_OK)
        return Response(status=HTTP_400_BAD_REQUEST)