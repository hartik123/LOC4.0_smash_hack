from rest_framework import serializers

class SupplyReqSerializer(serializers.Serializer):
    product_id = serializers.CharField()