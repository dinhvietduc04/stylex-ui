import { redirect } from "next/navigation"
import { auth } from "@repo/auth-next"
import { ThemeSwitcher, semanticTokens } from '@repo/stylex-ui'

export default async function AuthLayout ({
    children,
} : { children: React.ReactNode

}) {
    const session = await auth();

    if(session) {
        redirect("/admin");
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: semanticTokens.bgCanvas }}>
            <div className="absolute right-4 top-4">
                <ThemeSwitcher showBrandSelector={false} />
            </div>
                {children}
        </div>
        
    );
}