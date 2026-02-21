import conf from '@/conf/conf';
import { SYSTEM_PROMPTS } from '@/lib/ai/prompts';
import { promptSchema } from '@/validations/prompt/prompt.schema';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

const google = createGoogleGenerativeAI({
    apiKey: conf.geminiApiKey
})

const model_name = 'gemini-2.5-flash-lite'

export const runtime = 'edge'

export const POST = async (req: NextRequest) => {
    try {
        const untrustedData = await req.json();
        const parsedData = promptSchema.safeParse(untrustedData)

        if (!parsedData.success) {
            const error = z.treeifyError(parsedData.error)

            return NextResponse.json({
                ok: false,
                message: 'Validation failed.',
                errors: error
            }, { status: 400 })
        }

        const { prompt, type } = parsedData.data

        const systemMessage = SYSTEM_PROMPTS[type as keyof typeof SYSTEM_PROMPTS];
        if (!systemMessage) {
            return NextResponse.json({
                ok: false,
                message: 'Invalid tool type'
            }, { status: 400 });
        }

        const result = streamText({
            model: google(model_name),
            maxOutputTokens: 1500,
            maxRetries: 2,
            system: systemMessage,
            prompt: prompt,
            temperature: 0.1
        });

        return result.toTextStreamResponse();

    } catch (error: any) {
        // console.error("[AI_ROUTE_ERROR]:", error.message);

        return NextResponse.json({
            ok: false,
            message: 'The AI service is currently unavailable. Please try again shortly.'
        }, { status: 500 });
    }
};