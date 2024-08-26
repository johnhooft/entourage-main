// generateClubInfo.ts

import { clubPrompts } from '../utils/clubInfoPrompts'; // Adjust path if needed

export const promptMapping: { [key: string]: { userPrompt: string, systemContent: string } } = {
    'Memberships': clubPrompts.membership,
    'Events': clubPrompts.event,
    'Trips': clubPrompts.trip,
    'Executive Team': clubPrompts.executiveTeam,
    'Culture': clubPrompts.culture,
    'Parties': clubPrompts.party,
    'About Us': clubPrompts.about,
};

interface ClubData {
  clubName: string;
  clubPurpose: string; 
  clubVibe: string;
}

export async function genClubInfo(clubData: ClubData) {
    console.log(clubData);
    const clubPurposeArray = clubData.clubPurpose.split(',');
    clubPurposeArray.push('About Us'); 
    try {
        const responses = {};
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