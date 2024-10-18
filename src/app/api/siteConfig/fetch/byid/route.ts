import { NextRequest, NextResponse } from 'next/server'
import { SiteConfig } from "../../../../../../utils/types/layoutTypes";
import { createClient } from '@/../utils/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = createClient()
        const { userID }: {userID: string;} = await request.json()

        // Fetch both site_config and club_name
        const { data: clubSite, error: clubSiteError } = await supabase
            .from('site_configs')
            .select('site_config, club_name')
            .eq('user_id', userID)
            .single()

        if (clubSiteError && clubSiteError.code !== 'PGRST116') {
            // An error occurred during the query
            return NextResponse.json({ error: clubSiteError.message }, { status: 500 });
        }

        if (clubSite) {
            // Site config found, return both site_config and club_name
            return NextResponse.json({ 
                message: 'Site config found', 
                siteConfig: clubSite.site_config,
                clubName: clubSite.club_name 
            }, { status: 200 });
        }

        return NextResponse.json({ message: 'Site config not found' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
