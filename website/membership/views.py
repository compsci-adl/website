from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.shortcuts import render
from membership.models import Member, MemberYear
from membership.forms import MemberAddForm, MemberDeleteForm
from django.contrib.auth.decorators import login_required
import time

@login_required
def member_list(request):
    return member_list_year(request, time.strftime("%Y"))

@login_required
def member_list_year(request, year):
    order = request.GET.get("order", "uid")
    if order in {'member_no', 'year', 'paid'}:
        member_list = MemberYear.objects.filter(year=year).order_by(order)
    elif order in {'id', 'student_id', 'first_name', 'last_name', 'email'}:
        member_list = MemberYear.objects.filter(year=year).order_by("member__" + order)
    else:
        member_list = MemberYear.objects.filter(year=year)
    template = loader.get_template('membership/member_list.html')
    context = RequestContext(request, {
        'member_list': member_list,
        'requested_year' : year
        })
    return HttpResponse(template.render(context))

@login_required
def member_add(request):
    return member_add_page(request, False)

@login_required
def member_kiosk(request):
    return member_add_page(request, True)

@login_required
def member_add_page(request, kiosk):
    message = None
    if kiosk:
        method = "kiosk"
    else:
        method = "add"
    cur_year = time.strftime("%Y")
    if request.method == "POST":
        form = MemberAddForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            student_id = form.cleaned_data['student_id']
            email = form.cleaned_data['email']
            year = form.cleaned_data['year']
            member_no = form.cleaned_data['member_no']
            paid = form.cleaned_data['paid']

            try:
                member = Member.objects.get(first_name=first_name, last_name=last_name, student_id=student_id, email=email)
            except Member.DoesNotExist, Member.MultipleObjectsDetected:
                member = Member(first_name=first_name, last_name=last_name, student_id=student_id, email=email)
                member.save()
            in_database = True
            try:
                memberyear = MemberYear.objects.get(member=member, year=cur_year)
            except MemberYear.DoesNotExist:
                in_database = False

            if not in_database:
                memberyear = MemberYear(member=member, year=cur_year, member_no=member_no, paid=paid)
                memberyear.save()
                if kiosk:
                    message = "Member Added"
                    form = MemberAddForm(initial={'year': cur_year} )
                else:
                    return HttpResponseRedirect('/membership/')
    else:
        form = MemberAddForm(initial={'year': cur_year} )
    
    return render(request, 'membership/add_form.html', {
        'form': form,
        'message': message,
        'method': method,
    })

@login_required
def member_update(request, requested_year, uid):
    try:
        member = Member.objects.get(id=uid)
        memberyear = MemberYear.objects.get(member=member, year=requested_year)
    except Member.DoesNotExist, MemberYear.DoesNotExist:
        return HttpResponseRedirect('/membership/')
    
    if request.method == "POST":
        form = MemberAddForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            student_id = form.cleaned_data['student_id']
            email = form.cleaned_data['email']
            year = form.cleaned_data['year']
            member_no = form.cleaned_data['member_no']
            paid = form.cleaned_data['paid']

            in_database = True
            try:
                member = Member.objects.get(id=uid)
            except Member.DoesNotExist:
                in_database = False

            if in_database:
                member.first_name = first_name
                member.last_name = last_name
                member.email = email
                member.student_id = student_id
                member.save()

                cur_year = time.strftime("%Y")
                try:
                    memberyear = MemberYear.objects.get(member=member, year=year)
                    memberyear.member_no = member_no
                    memberyear.paid = paid
                    memberyear.save()
                except MemberYear.DoesNotExist:
                    memberyear = MemberYear(member=member, year=year, member_no=member_no, paid=paid)
                    memberyear.save()
                return HttpResponseRedirect('/membership/%s' % (requested_year))
    else:
        form = MemberAddForm(initial={
            'first_name' : member.first_name,
            'last_name' : member.last_name,
            'student_id' : member.student_id,
            'email' : member.email,
            'year' : memberyear.year,
            'member_no' : memberyear.member_no,
            'paid' : memberyear.paid,
            })

    return render(request, 'membership/edit_form.html', {
        'form': form,
        'year': requested_year,
        'uid': uid,
        'member': member,
        'memberyear': memberyear,
    })

@login_required
def member_delete(request, requested_year, uid):
    try:
        member = Member.objects.get(id=uid)
        memberyear = MemberYear.objects.get(member=member, year=requested_year)
    except Member.DoesNotExist, MemberYear.DoesNotExist:
        return HttpResponseRedirect('/membership/')
    
    if request.method == "POST":
        form = MemberDeleteForm(request.POST)
        if form.is_valid():
            confirm = form.cleaned_data['confirm']
            if confirm:
                MemberYear.objects.filter(member=uid,year=requested_year).delete()
                if MemberYear.objects.filter(member=uid).count() == 0:
                    Member.objects.filter(id=uid).delete()
                return HttpResponseRedirect('/membership/')
    else:
        form = MemberDeleteForm()

    return render(request, 'membership/delete_form.html', {
        'form': form,
        'year': requested_year,
        'uid': uid,
        'member': member,
        'memberyear': memberyear,
    })
