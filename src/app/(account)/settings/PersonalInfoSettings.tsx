import Button from '@/components/Button';
import { useUser } from '@clerk/nextjs';

interface PersonalInfoSettingsProps {
    register: any;
    handleSubmit: any;
}

export default function PersonalInfoSettings({
    register,
    handleSubmit,
}: PersonalInfoSettingsProps) {
    const { user } = useUser();

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <h2>Update Name</h2>
            <input
                type="text"
                placeholder="Name"
                defaultValue={user?.firstName}
                {...register('name')}
            />
            <h2>Update Age</h2>
            <h2>Update Gender</h2>
            <Button type="submit" colour="orange">
                Update personal info
            </Button>
        </form>
    );
}
