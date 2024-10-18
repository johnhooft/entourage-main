import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/../utils/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { siteConfig } = await request.json()

  const updatedConfig = JSON.parse(JSON.stringify(siteConfig))

  // Function to update image URLs in the config
  const updateImageUrls = async (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string' && obj[key].includes('/temp/')) {
        console.log(obj[key])
        const oldPath = obj[key].split('/images/')[1]
        const newPath = oldPath.replace('temp/', 'images/')
        console.log(newPath)
        // Move the file
        const { data, error } = await supabase.storage
          .from('images')
          .move(oldPath, newPath)

        if (error) {
          console.error('Error moving file:', error)
        } else {
          obj[key] = `https://qrengcbkopwqcuirwapp.supabase.co/storage/v1/object/public/images/${newPath}`
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        await updateImageUrls(obj[key])
      }
    }
  }

  await updateImageUrls(updatedConfig)

  return NextResponse.json({ updatedConfig })
}
