import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import {
    AGE_BRACKETS,
    DEGREES,
    GENDERS,
    STUDENT_STATUSES,
    STUDENT_TYPES,
} from '@/constants/student-info';
import { fetcher } from '@/lib/fetcher';
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import type { z } from 'zod';
import { infoSchema } from '../../schemas';
import type { SettingTabProps } from '../Settings';

export default function PersonalInfoSettings({
    settingData: { personalInfo: info },
}: SettingTabProps) {
    const form = useForm<z.infer<typeof infoSchema>>({
        defaultValues: info as z.infer<typeof infoSchema>,
        resolver: zodResolver(infoSchema),
    });
    const studentStatus = form.watch('studentStatus');

    const [result, setResult] = useState<null | 'success' | 'error'>(null);
    useEffect(() => {
        if (form.formState.isDirty) {
            setResult(null);
        }
    }, [form.formState.isDirty]);

    const { user } = useUser();
    const updateInfo = useSWRMutation('member', fetcher.put.mutate, {
        onSuccess: () => {
            form.reset(form.getValues());
            setResult('success');
        },
        onError: () => {
            form.reset(info as z.infer<typeof infoSchema>);
            setResult('error');
        },
    });

    return (
        <form
            onSubmit={form.handleSubmit(async (data) => {
                await user?.update({ firstName: data.firstName, lastName: data.lastName });
                await updateInfo.trigger(data);
            })}
            className="flex flex-col gap-4"
        >
            <h2 className="text-2xl font-bold">Change Personal Info</h2>
            <div className="mb-2 border-b-2 border-black" />
            <ControlledField label="First Name" name="firstName" control={form.control} />
            <ControlledField label="Last Name" name="lastName" control={form.control} />
            <ControlledField
                label="Age"
                name="ageBracket"
                control={form.control}
                type="select"
                options={AGE_BRACKETS}
            />
            <ControlledField
                label="Gender"
                name="gender"
                control={form.control}
                type="select"
                options={GENDERS}
            />
            {(studentStatus === 'At The University of Adelaide' ||
                studentStatus === 'At another university') && (
                <>
                    <ControlledField
                        label="Degree"
                        name="degree"
                        control={form.control}
                        type="select"
                        options={DEGREES}
                    />
                    <ControlledField
                        label="Student Type"
                        name="studentType"
                        control={form.control}
                        type="select"
                        options={STUDENT_TYPES}
                    />
                </>
            )}
            <ControlledField
                label="Student Status"
                name="studentStatus"
                control={form.control}
                type="select"
                options={STUDENT_STATUSES}
            />
            {studentStatus === 'At The University of Adelaide' && (
                <ControlledField label="Student ID" name="studentId" control={form.control} />
            )}
            <Button
                type="submit"
                colour="orange"
                loading={updateInfo.isMutating}
                disabled={!form.formState.isDirty}
            >
                Update personal info
            </Button>
            {result === 'success' && (
                <div className="font-bold text-green-700">
                    Successfully updated your personal information!
                </div>
            )}
            {result === 'error' && <div className="font-bold text-red-500">Update Error.</div>}
        </form>
    );
}
