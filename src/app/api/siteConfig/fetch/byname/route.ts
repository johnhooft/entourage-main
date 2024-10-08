import { NextRequest, NextResponse } from 'next/server'
import { SiteConfig } from "../../../../../../utils/types/layoutTypes";
import { createClient } from '@/../utils/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = createClient()
        const { clubName }: {clubName: string;} = await request.json()

        // Check if a row with the same clubName already exists
        const { data: clubSite, error: clubSiteError } = await supabase
            .from('site_configs')
            .select('site_config')
            .eq('club_name', clubName)
            .single()

        if (clubSiteError && clubSiteError.code !== 'PGRST116') {
            // An error occurred during the clubName check
            return NextResponse.json({ error: clubSiteError.message }, { status: 500 });
        }

        if (clubSite) {
            // A config with this clubName already exists
            return NextResponse.json({ message: 'Site config found', clubSite }, { status: 200 });
        }

        return NextResponse.json({ message: 'Site config not found' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}