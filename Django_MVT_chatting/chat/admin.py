from django.contrib import admin

from chat.models import OpenRoom, MatchingRoom, OpenRoomMember


@admin.register(OpenRoom)
class RoomAdmin(admin.ModelAdmin):
    pass

@admin.register(MatchingRoom)
class RoomAdmin(admin.ModelAdmin):
    pass

@admin.register(OpenRoomMember)
class RoomMemberAdmin(admin.ModelAdmin):
    pass
