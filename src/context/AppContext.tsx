'use client';

import { createContext, useContext, useState } from "react";

interface AppContextProp {
    children: React.ReactNode
}

interface AppContextType {
    open: boolean
}

export const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({ children }: AppContextProp) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <AppContext.Provider
            value={{
                open
            }}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext = () => {
    const context = useContext(AppContext)
    if(!context)
        throw new Error('App Context Error.')

    return context
}