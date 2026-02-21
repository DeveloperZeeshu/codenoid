import { AuthInitializer } from "@/components/AuthInitializer"
import { AppProvider } from "@/context/AppContext"
import store from "@/store/store"
import { Provider } from "react-redux"

type PropType = {
    children: React.ReactNode
}

export default function Providers({ children }: PropType) {
    return (
        <Provider store={store}>
            <AppProvider>
                <AuthInitializer />
                {children}
            </AppProvider>
        </Provider>
    )
}