import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/../utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { userID }: { userID: string } = await request.json();

    if (!userID) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch the site config data
    const { data: siteConfig, error: fetchError } = await supabase
      .from('site_configs')
      .select('*')
      .eq('user_id', userID)
      .single();

    if (fetchError) throw fetchError;

    // Function to delete images from the storage bucket
    const deleteImages = async (obj: any) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && 
            obj[key].startsWith('https://qrengcbkopwqcuirwapp.supabase.co/storage/v1/object/public/images/') &&
            !obj[key].includes('placeholder-logo.png')) 
        {
            console.log(obj[key])
            const imagePath = obj[key].split('/images/')[1];
            const { error: deleteError } = await supabase.storage
                .from('images')
                .remove([imagePath]);

          if (deleteError) {
            console.error('Error deleting image:', deleteError);
          }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          await deleteImages(obj[key]);
        }
      }
    };

    // Delete associated images
    await deleteImages(siteConfig);

    // Delete the site config
    const { error: deleteError } = await supabase
      .from('site_configs')
      .delete()
      .eq('user_id', userID);

    if (deleteError) throw deleteError;

    return NextResponse.json({ message: 'Site config and associated images deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting site config:', error);
    return NextResponse.json({ error: 'Failed to delete site config' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
