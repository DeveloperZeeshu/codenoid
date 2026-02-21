
type PropType = {
    children: React.ReactNode
}

export default function AuthLayout({ children }: PropType) {
    return (
        <main>
            {children}
        </main>
    )
}