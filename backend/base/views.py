from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

# from . products import products  # Static data

from .models import Product
from . serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

# Create your views here.

# JWT
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# from backend.base import serializers

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['email'] = self.user.email
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():  # key, value
            data[k] = v
    
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


 

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',

        '/api/products/upload/',

        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/api/products/<id>/',

        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
    ]
    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)   # If single product then set False.
    return Response(serializer.data)


@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)  # Single use that's why False
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)



## This is for Static Data    
# @api_view(['GET'])
# def getProduct(request, pk):
#     product = None
#     for i in  products:
#         if i['_id'] == pk:
#             product = i
#             break
#     return Response(product)