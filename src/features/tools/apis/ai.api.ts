import apiClient from "@/axios/apiClient"

type PayloadType = {
    type: 'explain' | 'generate' | 'report'
    prompt: string
}

export const getAIResponse = async (
    payload: PayloadType
) => {
    const res = await apiClient.post('/ai', payload)
    return res.data
}
