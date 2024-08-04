import { checkUserExists } from "@/server/check-user-exists";
import { currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Join from "./Join";

export const metadata: Metadata = {
    title: "Join",
};

export default async function JoinPage() {
    const user = await currentUser();
    if (user) {
        const userExists = await checkUserExists(user.id);
        if (userExists) {
            redirect("/settings");
        }
    }
    return <Join />;
}
