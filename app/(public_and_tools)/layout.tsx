import PublicFooter from "@/components/layout/PublicFooter/PublicFooter";
import PublicHeader from "@/components/layout/PublicHeader/PublicHeader";

type PropType = {
    children: React.ReactNode
}

export default function PublicLayout({ children }: PropType) {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-6 pt-6 pb-12">
                {children}
            </main>
            <PublicFooter />
        </div>
    )
}