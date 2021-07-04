from django.shortcuts import render
from rest_framework import decorators

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status  # For custom message.

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def getProducts(request):
    # Search
    query = request.query_params.get('keyword')
    # print('query:', query) # String value: actual value
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)

    # Pagination
    page = request.query_params.get('page')
    paginator = Paginator(products, 5)  # Number of products we want to return
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1) # First page
    except EmptyPage:
        products = paginator.page(paginator.num_pages)  # Last page (When don't have products)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)   # If single product then set False.
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})



@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]   # gte - greater than or equal
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data) 



@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user = user,
        name = 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        category = 'Sample Category',
        description = ''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data  # Get the data
    product = Product.objects.get(_id=pk)  # Get the product

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)  # Get the product
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    
    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user 
    product = Product.objects.get(_id=pk)
    data = request.data

    #1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2 - No Rating or 0 
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    #3 - Create Review 
    else:
        review = Review.objects.create(
            user = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment'],
        )

        # How many reviews the product has
        reviews = product.review_set.all()
        product.numReviews = len(reviews)  # Total number of reviews

        # Total Rating
        total = 0  # Calculate all the reviews
        for i in reviews:  # Get the rating
            total += i.rating
        
        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')



