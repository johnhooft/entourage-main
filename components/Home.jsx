import React, { useState } from 'react';
import classNames from 'classnames';

export default function Home({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [clubName, setClubName] = useState('');
  const [clubPurpose, setClubPurpose] = useState('');
  const [vibe, setVibe] = useState('');
  const [flash, setFlash] = useState(false);

  const handleSelect = (e, section) => {
    const value = e.target.getAttribute('data-value');
    setFlash(false); // Reset flash state

    if (section === 'clubPurpose') {
      setClubPurpose(prev =>
        prev.includes(value)
          ? prev.replace(value, '').replace(/,,/g, ',').replace(/^,|,$/g, '')
          : prev ? `${prev},${value}` : value
      );
    } else if (section === 'vibe') {
      setVibe(prev =>
        prev.includes(value)
          ? prev.replace(value, '').replace(/,,/g, ',').replace(/^,|,$/g, '')
          : prev ? `${prev},${value}` : value
      );
    }
  };

  const handleNext = () => {
    if (step === 1 && !clubName.trim()) {
      setFlash(true); // Trigger flash animation
      return;
    }
    if (step === 2 && !clubPurpose.trim()) {
      setFlash(true); // Trigger flash animation
      return;
    }
    setFlash(false); // Reset flash state
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vibe.trim()) {
      setFlash(true); // Trigger flash animation
      return;
    }
    setFlash(false); // Reset flash state
    onSubmit({ clubName, clubPurpose, clubVibe: vibe });
  };

  return (
    <div className="m-0 p-0 font-sans h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#090B1A] to-[#4b0082] text-white">
      <header className="fixed top-0 w-full text-center mb-12 pt-12">
        <h1 className="text-6xl font-sans font-semibold text-yellow-500 m-0">ENTOURAGE</h1>
        <h2 className="text-xl font-mono text-yellow-500 m-0">Club Sites in 60 Seconds</h2>
      </header>

      <form onSubmit={handleSubmit} className="font-mono bg-gradient-to-r from-[#13131380] to-[#71717280] p-8 pb-0 mt-8 rounded-lg shadow-lg max-w-2xl w-full text-left">
        {step === 1 && (
          <section className='flex flex-col'>
            <label htmlFor="club_name" className="block mb-4 font-mono text-yellow-500 text-2xl">What is Your Club Called?</label>
            <input
              type="text"
              id="club_name"
              name="club_name"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              required
              className={classNames(
                'w-full p-4 mb-6 border rounded bg-[#3c3f75] text-white text-2xl transition-all duration-300',
                {
                  'border-gray-300': !flash || clubName.trim(),
                  'border-yellow-500 animate-pulse': flash && !clubName.trim(),
                }
              )}
            />
            <div className='flex'>
              <button type="button" onClick={handleNext} className=" w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded hover:bg-yellow-400 text-2xl">
              Next
            </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="mb-8">
            <h2 className="text-2xl font-mono text-yellow-500 mb-4">You Want People to Know About Your:</h2>
            <div className="grid grid-cols-3 gap-4">
              {['Memberships', 'Events', 'Trips', 'Parties', 'Culture', 'Executive Team'].map(option => (
                <div
                  key={option}
                  data-value={option}
                  className={classNames(
                    'bg-[#2a2b5b] border-2 rounded-lg text-center cursor-pointer transition-colors p-6 flex items-center justify-center min-h-[120px] text-2xl',
                    {
                      'border-gray-300': !flash || clubPurpose.includes(option),
                      'border-red-500 animate-pulse': flash && !clubPurpose.trim(),
                      'border-yellow-500 bg-[#3c3f75]': clubPurpose.includes(option),
                    }
                  )}
                  onClick={(e) => handleSelect(e, 'clubPurpose')}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-12">
              <button type="button" onClick={handleBack} className="w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded hover:bg-yellow-400 text-2xl mr-4">
                Back
              </button>
              <button type="button" onClick={handleNext} className="w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded hover:bg-yellow-400 text-2xl ml-4">
                Next
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="mb-8">
            <h2 className="text-2xl font-mono text-yellow-500 mb-6">What's your vibe?</h2>
            <div className="grid grid-cols-3 gap-4">
              {['Social', 'Athletic', 'Academic', 'Educational', 'Community', 'Competitive'].map(option => (
                <div
                  key={option}
                  data-value={option}
                  className={classNames(
                    'bg-[#2a2b5b] border-2 rounded-lg text-center cursor-pointer transition-colors p-6 flex items-center justify-center min-h-[120px] text-2xl',
                    {
                      'border-gray-300': !flash || vibe.includes(option),
                      'border-red-500 animate-pulse': flash && !vibe.trim(),
                      'border-yellow-500 bg-[#3c3f75]': vibe.includes(option),
                    }
                  )}
                  onClick={(e) => handleSelect(e, 'vibe')}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-12">
              <button type="button" onClick={handleBack} className="w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded hover:bg-yellow-400 text-2xl mr-4">
                Back
              </button>
              <button type="submit" className="w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded hover:bg-yellow-400 text-2xl ml-4">
                Generate Site
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
}
