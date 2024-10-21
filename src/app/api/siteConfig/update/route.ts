import { NextRequest, NextResponse } from 'next/server'
import { SiteConfig } from "../../../../../utils/types/layoutTypes";
import { createClient } from '@/../utils/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = createClient()
        const { subdomain, siteConfig }: {subdomain: string; siteConfig: SiteConfig;} = await request.json()
        //console.log(subdomain, siteConfig)
        // Update the existing record
        const { data, error } = await supabase
            .from('site_configs')
            .update({ site_config: siteConfig })
            .eq('subdomain', subdomain);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Site config updated successfully!', data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}