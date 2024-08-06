from flask import Flask, render_template, request
import openai

app = Flask(__name__)

# Set up OpenAI API key
openai.api_key = 'sk-proj-Y9d76MZ0IkfCeWmOncyXT3BlbkFJjRAdAm6pBGFBudrj0U9j'
client = openai

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    club_name = request.form['club_name']
    club_purpose = request.form['club_purpose'].split(',')

    prompts = {
        "Memberships": "Write a short description highlighting the benefits of club membership. Leave a blank line then make a bulleted list of 5 membership perks, line by line. Leave another blank line then write a short blurb on what makes the membership worthwhile. 150 words maximum",
        "Events": "Begin with a short promotion on the club's next event, introducing and marketing it. Leave a blank line then describe the type of events the club holds over the school year. 100 words maximum",
        "Trips": "Write a short description for the club's trips section, highlight the types of trips organized, destinations, and the experiences participants can expect. Organize it nicely so that it’s not just a blob of words. 100 words maximum",
        "Parties": "Write a short description for the club's parties section, detail the major parties that the club hosts and what makes them awesome, maybe they have student DJs and great drink deals at venue partners. Organize it nicely so that it’s not just a blob of words. 100 words maximum",
        "Culture": "Write a short description for the club's culture section. Include information about the club's past, notable achievements, and stories shared among members. Organize it nicely so that it’s not just a blob of words. 150 words maximum",
        "Executive Team": "Write a short description for the club's executive team section. List each executive member and their role. Explain how to join the executive team. Organize it nicely so that it’s not just a blob of words. 100 words maximum",
        "About Us": "Write a brief introduction about the club, its mission, and its vision. Explain what makes the club unique and important to the community. 150 words maximum"
    }

    generated_content = {}
    for purpose in club_purpose:
        if purpose in prompts:
            prompt = prompts[purpose]
            completion = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a master web developer with intimate knowledge of student clubs and their activities. You know what kind of copy looks great on a page and how to engage young people"},
                    {"role": "user", "content": prompt}
                ]
            )
            generated_content[purpose] = completion.choices[0].message

    # Adding 'About Us' content generation
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a master web developer with intimate knowledge of student clubs and their activities. You know what kind of copy looks great on a page and how to engage young people"},
            {"role": "user", "content": prompts['About Us']}
        ]
    )
    generated_content['About Us'] = completion.choices[0].message

    return render_template(
        'site.html',
        club_name=club_name,
        generated_content=generated_content
    )

if __name__ == '__main__':
    app.run(debug=True)
