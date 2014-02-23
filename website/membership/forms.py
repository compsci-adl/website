from django import forms
from membership.models import Member

class MemberAddForm(forms.Form):
    first_name = forms.CharField()
    last_name = forms.CharField()
    student_id = forms.CharField()
    email = forms.EmailField()
    year = forms.IntegerField()
    member_no = forms.CharField(required=False)
    paid = forms.BooleanField(required=False)
    
    def clean_student_id(self):
        student_id = self.cleaned_data['student_id']
        if student_id[0].lower() == 'a':
            student_id = student_id[1:]
        if student_id != "0" and (len(student_id) != 7 or not student_id.isdigit()):
            raise forms.ValidationError("Value must be in form aXXXXXXX, XXXXXXX. Use 0 if not a student.")
        return int(student_id)

class MemberDeleteForm(forms.Form):
    confirm = forms.BooleanField()

