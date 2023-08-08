from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hash the password using pbkdf2_sha256 algorithm
        hashed_password = make_password(validated_data['password'])
        validated_data['password'] = hashed_password

        user = User(**validated_data)
        user.save()
        return user