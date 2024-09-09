import React, { useState, ChangeEvent, MouseEvent, FormEvent } from 'react';
import classNames from 'classnames';

interface QuizProps {
  onSubmit: (data: { clubName: string; clubPurpose: string; clubVibe: string }) => void;
}

const OldQuiz: React.FC<QuizProps> = ({ onSubmit }) => {
  const [step, setStep] = useState<number>(1);
  const [clubName, setClubName] = useState<string>('');
  const [clubPurpose, setClubPurpose] = useState<string>('');
  const [vibe, setVibe] = useState<string>('');
  const [flash, setFlash] = useState<boolean>(false);

  const handleSelect = (e: MouseEvent<HTMLDivElement>, section: 'clubPurpose' | 'vibe') => {
    const value = (e.target as HTMLElement).getAttribute('data-value') || '';
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vibe.trim()) {
      setFlash(true); // Trigger flash animation
      return;
    }
    setFlash(false); // Reset flash state
    onSubmit({ clubName, clubPurpose, clubVibe: vibe });
  };

  return (
    <div className="m-0 p-0 h-screen w-screen bg-gradient-to-r from-[#090B1A] to-[#4b0082] text-white">
      <div className="flex flex-col justify-top items-center h-screen">
        <header className="w-full text-center mb-12 pt-6">
          <h1 className="text-6xl font-sans font-semibold text-yellow-500 m-0">ENTOURAGE</h1>
          <h2 className="text-xl font-mono text-yellow-500 m-0">Custom Club Sites in 60 Seconds</h2>
        </header>
        <form onSubmit={handleSubmit} className="font-mono bg-gradient-to-r from-[#13131380] to-[#71717280] p-8 pb-0 rounded-lg shadow-lg max-w-2xl w-full text-left">
          {step === 1 && (
            <section className='flex flex-col'>
              <label htmlFor="club_name" className="block mb-4 text-yellow-500 text-2xl">What is Your Club Called?</label>
              <input
                type="text"
                id="club_name"
                name="club_name"
                value={clubName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setClubName(e.target.value)}
                required
                className={classNames(
                  'w-full p-4 mb-6 border-2 rounded bg-[#3c3f75] text-white text-2xl transition-all duration-300',
                  {
                    'border-gray-300': !flash || clubName.trim(),
                    'border-red-400 animate-pulse': flash && !clubName.trim(),
                  }
                )}
              />
              <div className='flex'>
                <button type="button" onClick={handleNext} className="w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded border-2 border-gray-500 hover:border-black hover:rounded-2xl transition-all text-2xl">
                  Next
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="mb-2 md:mb-2">
              <h2 className="md:text-2xl text-xl text-yellow-500 mb-4">You Want People to Know About Your:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:grid-cols-3">
                {['Memberships', 'Events', 'Trips', 'Parties', 'Culture', 'Executive Team'].map(option => (
                  <div
                    key={option}
                    data-value={option}
                    className={classNames(
                      'bg-[#2a2b5b] border-2 rounded-lg text-center cursor-pointer p-4 md:p-6 flex items-center justify-center min-h-[120px] text-xl md:text-2xl hover:scale-105 transition-all',
                      {
                        'border-gray-300': !flash || clubPurpose.includes(option),
                        'border-red-400 animate-pulse': flash && !clubPurpose.trim(),
                        'border-yellow-500 bg-[#3c3f75]': clubPurpose.includes(option),
                      }
                    )}
                    onClick={(e: MouseEvent<HTMLDivElement>) => handleSelect(e, 'clubPurpose')}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-12">
                <button type="button" onClick={handleBack} className="w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded border-2 border-gray-500 hover:border-black hover:rounded-2xl transition-all text-2xl mr-4">
                  Back
                </button>
                <button type="button" onClick={handleNext} className="w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded border-2 border-gray-500 hover:border-black hover:rounded-2xl transition-all text-2xl ml-4">
                  Next
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="mb-8">
              <h2 className="text-2xl font-mono text-yellow-500 mb-6">Tell Us About Your Club!</h2>
              <textarea 
                value={vibe}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setVibe(e.target.value)}
                className={classNames(
                  'w-full p-4 mb-6 border-2 rounded bg-[#3c3f75] text-white text-lg transition-all duration-300',
                  {
                    'border-gray-300': !flash || vibe.trim(),
                    'border-red-400 animate-pulse': flash && !vibe.trim(),
                  }
                )}
                placeholder="Enter information about your club, its location, vibe, etc." 
                rows={6} // Adjust number of rows as needed
              />
              <div className="flex justify-between mt-12">
                <button type="button" onClick={handleBack} className="w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded border-2 border-gray-500 hover:border-black hover:rounded-2xl transition-all text-2xl mr-4">
                  Back
                </button>
                <button type="submit" className="w-full py-6 mb-6 bg-yellow-500 text-gray-800 font-semibold rounded border-2 border-gray-500 hover:border-black hover:rounded-2xl transition-all text-2xl ml-4">
                  Generate Site
                </button>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
};

export default OldQuiz;