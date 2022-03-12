from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_200_OK
from .serializers import SupplyReqSerializer
from bson.objectid import ObjectId
from bson import json_util
import json
from .externals import mongoClient, model
from datetime import datetime, timedelta

# Create your views here.
class SupplyReqView(generics.GenericAPIView):
    serializer_class = SupplyReqSerializer
    def post(self, request, *args, **kwargs):
        serializer = SupplyReqSerializer(data=request.data)
        if serializer.is_valid():
            product = mongoClient.scm.products.find_one({'_id': ObjectId(serializer.validated_data['productId'])})
            orders = mongoClient.scm.orders.find({'productId': serializer.validated_data['productId'], 'date': {"$gt": datetime.today()-timedelta(7)}})
            stock = product['stock']
            prevOrderQuantity = 0
            for order in orders:
                if order.get('quantity'):
                    prevOrderQuantity = prevOrderQuantity + order['quantity']
            pred = model.predict([[prevOrderQuantity, stock]])
            data = {}
            if not stock:
                #"schedule supplies"
                data['schedule'] = True
                total = prevOrderQuantity + stock
                if total > 100:
                    data['quantity'] = prevOrderQuantity + stock
                else:
                    data['quantity'] = 100
            if pred > 50:
                #"schedule supplies"
                data['schedule'] = True
                data['quantity'] = pred
            else:
                #"dont schedule supplies"
                data['schedule'] = False
            return Response(data,status=HTTP_200_OK)
        return Response(status=HTTP_400_BAD_REQUEST)