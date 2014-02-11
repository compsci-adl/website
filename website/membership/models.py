from django.db import models
import datetime
from django.utils import timezone
import time

class Member(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    student_id = models.CharField(max_length=8)
    email = models.CharField(max_length=128)

    def __unicode__(self):
        return "%s %s, %s" % (self.first_name, self.last_name, self.student_id)

    def set_student_id(self, new_id):
        if type(new_id) is not str or len(new_id) < 7:
            return
        if new_id[0] == 'a' or new_id[0] == 'A':
            parsed_id = new_id[1:]
        else:
            parsed_id = new_id
        if not parsed_id.isdigit():
            return
        self.student_id = parsed_id

class MemberYear(models.Model):
    member = models.ForeignKey(Member)
    year = models.IntegerField(default=time.strftime("%Y"))
    member_no = models.CharField(max_length=8)

    def __unicode__(self):
        return "%s %d" % (self.member.__unicode__(), self.year)

    def first_name(self):
        return self.member.first_name

    def last_name(self):
        return self.member.last_name

    def student_id(self):
        return self.member.student_id

    def email(self):
        return self.member.email

    class Meta:
        unique_together = ('member','year')
