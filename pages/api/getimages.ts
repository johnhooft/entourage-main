import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface ClubInfo {
  club_name: string;
  club_vibe: string;
}

async function get_key_words(clubinfo: ClubInfo) {
  const { club_name, club_vibe } = clubinfo; 

  const modifiedUserPrompt = `Club Name: ${club_name}\nClub Vibe: ${club_vibe}\n\n${"Given the Club info: Club Name and Club Vibe, return 2-3 key words, in a comma seperated list, that would best describe an image that would be associated witht the club and be displayed on their website."}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: "You analyze text that describes a Club. Based on the club information, decide what types of photos would best be displayed on their Club Website, and return key words that describe that image." },
      { role: 'user', content: modifiedUserPrompt },
    ],
    stream: false,
  })

  return response.choices[0].message.content
}

async function get_images(keywords: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${keywords}&image_type=photo`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.hits && data.hits.length > 0) {
      return data.hits; // Return the pageURL of the first hit
    } else {
      console.log('No images found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests are allowed' });
    return;
  }

  try {
    const clubinfo = req.body; 
    const keywords = await get_key_words(clubinfo);

    if (keywords){ 
      const hits = await get_images(keywords);
      
      if (hits) {
        res.status(200).json({ message: hits });
      } else {
        res.status(404).json({ message: "No images found" });
      }
    } else {
      res.status(400).json({ message: "Could not generate keywords" });
    }
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}