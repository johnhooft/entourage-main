import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests are allowed' });
    return;
  }

  // Disable buffering for streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const { club_name, club_vibe, user_prompt, system_content } = req.body; 
  //console.log(club_name, club_vibe, user_prompt, system_content);

  const modifiedSystemContent = `${system_content}

  In this case, the club is called: ${club_name}, and is described as: ${club_vibe}`;
  
  //console.log(modifiedSystemContent);
  //console.log(user_prompt);

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: modifiedSystemContent },
      { role: 'user', content: user_prompt },
    ],
    stream: false,
  })

  //console.log(response.choices[0].message.content);
  return res.status(200).json({ message: response.choices[0].message.content });
}