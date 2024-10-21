import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/../utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { userID, newSubdomain }: { userID: string; newSubdomain: string } = await request.json();

    if (!userID || !newSubdomain) {
      return NextResponse.json({ error: 'User ID and new subdomain are required' }, { status: 400 });
    }

    // Check if the new subdomain is already taken
    const { data: existingSubdomain, error: checkError } = await supabase
      .from('site_configs')
      .select('subdomain')
      .eq('subdomain', newSubdomain)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingSubdomain) {
      return NextResponse.json({ message: 'Subdomain already taken' }, { status: 409 });
    }

    // Fetch the current site_config
    const { data: currentConfig, error: fetchError } = await supabase
      .from('site_configs')
      .select('site_config')
      .eq('user_id', userID)
      .single();

    if (fetchError) throw fetchError;

    // Update the subdomain in the site_config
    const updatedConfig = { ...currentConfig.site_config, subdomain: newSubdomain };

    // Update both the subdomain column and the site_config
    const { error: updateError } = await supabase
      .from('site_configs')
      .update({ 
        subdomain: newSubdomain,
        site_config: updatedConfig
      })
      .eq('user_id', userID);

    if (updateError) throw updateError;

    return NextResponse.json({ message: 'Subdomain updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating subdomain:', error);
    return NextResponse.json({ error: 'Failed to update subdomain' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
