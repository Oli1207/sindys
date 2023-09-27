"""from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import *
from base.serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import status
import decimal
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_coupon(request):
    data = request.data
    coupon_code = data.get('coupon_code', None)

    # Vérifiez si le coupon existe
    coupon = get_object_or_404(Coupon, coupon_code=coupon_code)

    # Vérifiez si le coupon est encore valide et respecte les conditions
    if coupon:
        if not coupon.is_expired :
            # Appliquez le coupon à la commande (assurez-vous que vous avez une commande en cours pour l'utilisateur)
            order = Order.objects.get(user=request.user)
            order.coupon = coupon
            order.save()
            return Response({'message': 'Coupon applied successfully.'})

    return Response({'message': 'Invalid coupon or conditions not met.'}, status=400)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCoupons(request):
    coupons = Coupon.objects.all()
    serializer = CouponSerializer(coupons, many=True)
    return Response(serializer.data)"""