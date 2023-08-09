from django.contrib import admin

from chat.models import OpenRoom, MatchingRoom, OpenRoomMember, MatchingRoomMember


@admin.register(OpenRoom)
class OpenRoomAdmin(admin.ModelAdmin):
    pass

@admin.register(MatchingRoom)
class MatchingRoomAdmin(admin.ModelAdmin):
    pass

@admin.register(OpenRoomMember)
class OpenRoomMemberAdmin(admin.ModelAdmin):
    pass

@admin.register(MatchingRoomMember)
class MatchingRoomMemberAdmin(admin.ModelAdmin):
    pass
