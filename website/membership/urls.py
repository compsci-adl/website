from django.conf.urls import patterns, url

from membership import views as member_views

urlpatterns = patterns('',
    url(r'^$', member_views.member_list, name="list"),
    url(r'^(?P<year>\d+)/$', member_views.member_list_year, name="list_year"),
    url(r'^add/$', member_views.member_add, name="add"),
    url(r'^kiosk/$', member_views.member_kiosk, name="kiosk"),
    url(r'^(?P<requested_year>\d+)/edit/(?P<uid>\d+)/$', member_views.member_update, name="update"),
    url(r'^(?P<requested_year>\d+)/delete/(?P<uid>\d+)/$', member_views.member_delete, name="delete"),
)
