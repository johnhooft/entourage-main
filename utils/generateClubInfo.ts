// generateClubInfo.ts

import { clubPrompts } from './clubInfoPrompts'; // Adjust path if needed

export const promptMapping: { [key: string]: { userPrompt: string, systemContent: string } } = {
    'Memberships': clubPrompts.membership,
    'Events': clubPrompts.event,
    'Trips': clubPrompts.trip,
    'Executive Team': clubPrompts.executiveTeam,
    'Culture': clubPrompts.culture,
    'Parties': clubPrompts.party,
    'About Us': clubPrompts.about,
};

interface ClubInfoResponses {
    [key: string]: string;
}

interface ClubData {
  clubName: string;
  clubPurpose: string; 
  clubVibe: string;
}

async function genClubText(clubData: ClubData) {
  console.log(clubData);
  const clubPurposeArray = clubData.clubPurpose.split(',');
  clubPurposeArray.push('About Us'); 
  try {
      const responses: ClubInfoResponses = {};
      for (const purpose of clubPurposeArray) {
          //console.log(purpose);
          const prompt = promptMapping[purpose];
          if (prompt) {
            // Make API call to /api/generate/[param] 
            const response = await fetch(`/api/generate/${purpose}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                club_name: clubData.clubName,
                club_vibe: clubData.clubVibe,
                user_prompt: prompt.userPrompt,
                system_content: prompt.systemContent,
              }),
            });
            if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`);
            }
            const generatedText = await response.json(); 
            responses[purpose] = generatedText['message'];
          }
        }
      console.log(responses);
      return responses;
  } catch (error) {
      console.error("Error generating club info:", error);
      throw error;
  }
}

async function genClubImages(clubData: ClubData) {
  const response = await fetch(`/api/getimages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      club_name: clubData.clubName,
      club_vibe: clubData.clubVibe,
    }),
  });

  return response.json();
}

export async function genClubInfo(clubData: ClubData) {
  const clubCopy = await genClubText(clubData);
  const clubImages = await genClubImages(clubData);
  return { clubCopy, clubImages };
}