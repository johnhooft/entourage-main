import { createClient } from '@/../utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = createClient()
        const { email, password } = await request.json()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 400 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error in handler:', error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}