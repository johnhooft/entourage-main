import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/../utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { userID }: { userID: string } = await request.json();

    if (!userID) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('site_configs')
      .delete()
      .eq('user_id', userID);

    if (error) throw error;

    return NextResponse.json({ message: 'Site config deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting site config:', error);
    return NextResponse.json({ error: 'Failed to delete site config' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
