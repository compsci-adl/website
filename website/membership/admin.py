from django.contrib import admin
from membership.models import Member, MemberYear

class MemberYearAdmin(admin.ModelAdmin):
    list_display = ['member_no', 'year', 'first_name', 'last_name', 'student_id', 'email' ]
    list_filter = ['year']
    search_fields = ['first_name', 'last_name', 'student_id', 'email']

class MemberYearInline(admin.TabularInline):
    model = MemberYear
    extra = 3

class MemberAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'student_id', 'email']
    search_fields = ['first_name', 'last_name', 'student_id', 'email']
    inlines = [MemberYearInline]

admin.site.register(Member, MemberAdmin)
admin.site.register(MemberYear, MemberYearAdmin)
