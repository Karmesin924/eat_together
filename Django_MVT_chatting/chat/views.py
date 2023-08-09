from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from chat.forms import RoomForm
from chat.models import OpenRoom, MatchingRoom


def index(request):
    open_room_qs = OpenRoom.objects.all()
    if request.user.is_authenticated:
        matching_room_qs = request.user.matching_room_set.all()
        if request.user.username=='admin':
            matching_room_qs = MatchingRoom.objects.all()
    else:
        matching_room_qs=None
    return render(request, "chat/index.html", {
        "open_room_list": open_room_qs,
        "matching_room_list": matching_room_qs,
    })


@login_required
def open_room_new(request):
    if request.method == "POST":
        form = RoomForm(request.POST)
        if form.is_valid():
            created_room = form.save(commit=False)
            created_room.owner = request.user
            created_room.save()
            return redirect("chat:room_chat", created_room.pk)
    else:
        form = RoomForm()

    return render(request, "chat/room_form.html", {
        "form": form,
    })


@login_required
def open_room_chat(request, room_pk):
    room = get_object_or_404(OpenRoom, pk=room_pk)
    return render(request, "chat/open_room_chat.html", {
        "room": room,
    })

@login_required
def matching_room_chat(request, room_pk):
    room = get_object_or_404(MatchingRoom, pk=room_pk)
    matching_room_set = request.user.matching_room_set.all()
    if room not in matching_room_set and request.user.username!='admin':
        messages.error(request, "접근할 수 없습니다.")
        return redirect("chat:index")
    return render(request, "chat/matching_room_chat.html", {
        "room": room,
    })


@login_required
def room_delete(request, room_pk):
    room = get_object_or_404(OpenRoom, pk=room_pk)

    if room.owner != request.user:
        messages.error(request, "채팅방 소유자가 아닙니다.")
        return redirect("chat:index")

    if request.method == "POST":
        room.delete()
        messages.success(request, "채팅방을 삭제했습니다.")
        return redirect("chat:index")

    return render(request, "chat/room_confirm_delete.html", {
        "room": room,
    })


class MatchingRoomNew(APIView):
    def post(self, request, format=None):
        data = request.data
        user_names = data.get('user_nicknames', [])

        for user_name in user_names:
            try:
                User.objects.get(username=user_name)
            except User.DoesNotExist:
                return Response({'message': '해당 닉네임의 유저가 존재하지 않습니다. : '+user_name}, status=404)

        room = MatchingRoom.objects.create(name=', '.join(user_names))
        for user_name in user_names:
            user = User.objects.get(username=user_name)
            print(user.username)
            room.register_user_in_room(user)

        return Response({'message': '매칭방 생성 완료'}, status=201)