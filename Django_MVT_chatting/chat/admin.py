from django.contrib import admin

from chat.models import OpenRoom, MatchingRoom, OpenRoomMember, MatchingRoomMember, OpenRoomMessage, MatchingRoomMessage


@admin.register(OpenRoom)
class OpenRoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'pk')

@admin.register(MatchingRoom)
class MatchingRoomAdmin(admin.ModelAdmin):
    list_display = ('name', )

@admin.register(OpenRoomMember)
class OpenRoomMemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'room')

@admin.register(MatchingRoomMember)
class MatchingRoomMemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'room')

@admin.register(OpenRoomMessage)
class OpenRoomMessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'room', 'content', 'timestamp')

@admin.register(MatchingRoomMessage)
class MatchingRoomMessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'room', 'content', 'timestamp')
