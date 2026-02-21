import React from 'react'

type PropType = {
    children: React.ReactNode
}

export default function AppLayout({ children }: PropType) {
    return (
        <div>
            {children}
        </div>
    )
}
