import { NextRequest, NextResponse } from 'next/server'
import { SiteConfig } from "../../../../../utils/types/layoutTypes";
import { createClient } from '@/../utils/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = createClient()
        const { subdomain, siteConfig }: {subdomain: string; siteConfig: SiteConfig;} = await request.json()
        // Check if a row with the same clubName already exists
        const { data: existingClubName, error: clubNameError } = await supabase
            .from('site_configs')
            .select()
            .eq('subdomain', subdomain)
            .single()

        if (clubNameError && clubNameError.code !== 'PGRST116') {
            // An error occurred during the clubName check
            return NextResponse.json({ error: clubNameError.message }, { status: 500 });
        }

        if (existingClubName) {
            // A config with this clubName already exists
            return NextResponse.json({ message: 'Subdomain already taken!' }, { status: 200 });
        }

        // Check if a row with the same user_id already exists
        const { data: existingUser, error: userError } = await supabase
            .from('site_configs')
            .select()
            .eq('user_id', siteConfig.userID)
            .single()

        if (userError && userError.code !== 'PGRST116') {
            // An error occurred during the user_id check
            return NextResponse.json({ error: userError.message }, { status: 500 });
        }

        if (existingUser) {
            // A config with this user_id already exists
            return NextResponse.json({ message: "Account Site Limit Reached!" }, { status: 200 });
        }

        // If no existing config for clubName and user_id, insert new record
        const { data, error } = await supabase
            .from('site_configs')
            .insert([{ user_id: siteConfig.userID, subdomain: subdomain, site_config: siteConfig }]);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Site config saved successfully!', data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}