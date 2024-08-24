import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests are allowed' });
    return;
  }

  const { club_name, club_purpose } = req.body;
  const debug = false;

  let clubName, clubPurposeArray;

  if (debug) {
    clubName = 'UBC Rippas';
    clubPurposeArray = ['Memberships', 'Trips', 'Culture'];
  } else {
    clubName = club_name;
    clubPurposeArray = club_purpose.split(',');
  }

  const prompts = {
    Memberships: "Write a short description for the club's memberships section highlighting the benefits of club membership. Clubs usually sell memberships that provide members with partnership deals, access to events and trips, and discounts on party tickets. 100 words maximum",
    Events: "Write a short description for the club's events section. Hype up the next event the club is hosting, and then talk about the various events that will be hosted throughout the school year. Clubs usually host events that get their members together, centered around what the club is all about. 100 words maximum",
    Trips: "Write a short description for the club's trips section, highlight the types of trips organized, destinations, and the experiences participants can expect. Clubs usually host trips based on what their club is centered around, taking their members off campus to destinations where they can recreate, learn, and grow closer. 100 words maximum",
    Parties: "Write a short description for the club's parties section, detail the major parties that the club hosts and what makes them awesome, maybe they have student DJs and great drink deals at venue partners. Clubs tend to throw parties at local venues in order to bring members together and have a great time. 100 words maximum",
    Culture: "Write a short description for the club's culture section. Include information about the club's past, notable achievements, and stories shared among members. Clubs will usually have an interesting founding story and history full of fun times. 150 words maximum",
    'Executive Team': "Write a short description for the club's executive team section. List each executive member and their role. Explain how to join the executive team. Clubs usually have 5 to 20 executive members and have elections each year to fill the positions. 100 words maximum",
    'About Us': "Write a brief introduction about the club, its purpose, and its vision. Explain what makes the club unique and important to the community. Hype up the club and make it sound like the best student experience ever. 50 words maximum",
  };

  const generatedContent = {};

  for (const purpose of clubPurposeArray) {
    if (prompts[purpose]) {
      const prompt = prompts[purpose];
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a master copywriter with intimate knowledge of student clubs and their activities. You talk like a 4th year university student who has been heavily involved with your club which you love and want others to experience.' },
          { role: 'user', content: prompt },
        ],
        stream: false,
      });
      generatedContent[purpose] = completion.choices[0].message.content;
    }
  }

  // Adding 'About Us' content generation
  const aboutUsCompletion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a master copywriter with intimate knowledge of student clubs and their activities. You talk like a 4th year university student who has been heavily involved with your club which you love and want others to experience.' },
      { role: 'user', content: prompts['About Us'] },
    ],
    stream: false,
  });
  generatedContent['About Us'] = aboutUsCompletion.choices[0].message.content;

  if (debug) {
    let output = `Club Name: ${clubName}\n\n`;
    for (const section in generatedContent) {
      output += `${section}:\n${generatedContent[section]}\n\n`;
    }
    res.status(200).send(output);
  } else {
    res.status(200).json({
      club_name: clubName,
      generated_content: generatedContent,
    });
  }
}
