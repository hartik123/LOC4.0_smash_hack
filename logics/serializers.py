from rest_framework import serializers

class SupplyReqSerializer(serializers.Serializer):
    productId = serializers.CharField()