import React, { useState } from 'react';

/**
 * Araadhya Setia 11 - Life Rehearsal Room (UI Enhanced)
 * Single-file React component (Tailwind CSS recommended)
 *
 * Improvements in this version:
 * - Personalized header (Araadhya Setia 11)
 * - Clearer layout, cards, and visual hierarchy
 * - Mood/Tone dropdown for AI response style
 * - Scenario dropdown (editable) and script preview
 * - Action buttons, microcopy, and accessibility hints
 * - Mock AI analysis + recommendations shown with icons
 *
 * How to use:
 * 1. Drop this file into a React project with Tailwind configured.
 * 2. Import and render the component in App.jsx.
 */

const DEFAULT_SCENARIOS = [
  { id: 'apologize', title: 'Apologising to a friend', description: 'Practice saying sorry effectively and sincerely.', script: 'Hi [friend], I want to apologize for [situation]. I realize it was wrong and I hope we can move forward.' },
  { id: 'promotion', title: 'Asking for a promotion', description: 'Practice asking your manager for a raise or promotion.', script: 'Hello [manager], I would like to discuss my role and contribution. Based on my performance, I believe I am ready for a promotion.' },
  { id: 'rejection', title: 'Facing rejection', description: 'Practice responding to rejection with grace and confidence.', script: 'Thank you for the feedback. I understand your decision and will continue improving my skills.' },
];

function Icon({ name, className = 'w-5 h-5' }) {
  if (name === 'sparkle')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121M6.636 6.636L8.757 8.757M15.243 15.243l2.121 2.121"/></svg>
    );
  if (name === 'check')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
    );
  if (name === 'mood')
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zM8 14s1.5 2 4 2 4-2 4-2M9 10h.01M15 10h.01"/></svg>
    );
  return null;
}

function mockAIAnalysis(input) {
  const tones = ['Calm', 'Assertive', 'Friendly', 'Professional'];
  const tone = tones[Math.floor(Math.random() * tones.length)];
  const confidence = Math.floor(60 + Math.random() * 40);
  const clarity = Math.floor(60 + Math.random() * 40);
  const recommendations = [];
  if (input.length < 30) recommendations.push('Try adding a specific example or detail to strengthen your point.');
  if (input.toLowerCase().includes('sorry')) recommendations.push('You acknowledged the mistake — add how you will avoid it in future.');
  if (input.toLowerCase().includes('i believe') || input.toLowerCase().includes('i feel')) recommendations.push('Good ownership. Consider adding measurable achievements to support your request.');
  if (recommendations.length === 0) recommendations.push('Well structured — consider a short closing line that states your desired outcome.');
  return { tone, confidence, clarity, recommendations };
}

export default function AraadhyaSetia11UI() {
  const [scenarios, setScenarios] = useState(DEFAULT_SCENARIOS);
  const [selectedScenarioId, setSelectedScenarioId] = useState(DEFAULT_SCENARIOS[0].id);
  const [inputText, setInputText] = useState('');
  const [chat, setChat] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [newScenarioTitle, setNewScenarioTitle] = useState('');
  const [newScenarioDesc, setNewScenarioDesc] = useState('');
  const [newScenarioScript, setNewScenarioScript] = useState('');
  const [aiMood, setAiMood] = useState('Calm');

  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = { from: 'user', text: inputText };
    setChat(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const aiResponse = { from: 'ai', text: `${aiMood} response: (simulated) — I hear you. Could you clarify what outcome you want?` };
      setChat(prev => [...prev, aiResponse]);
      const analysis = mockAIAnalysis(inputText);
      setFeedback(analysis);
    }, 600);
  };

  const handleAddScenario = () => {
    if (!newScenarioTitle.trim()) return;
    const newScenario = {
      id: `${newScenarioTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      title: newScenarioTitle,
      description: newScenarioDesc,
      script: newScenarioScript || '',
    };
    setScenarios(prev => [...prev, newScenario]);
    setSelectedScenarioId(newScenario.id);
    setNewScenarioTitle('');
    setNewScenarioDesc('');
    setNewScenarioScript('');
    setChat([]);
    setFeedback(null);
  };

  const handleUseScript = () => {
    if (selectedScenario && selectedScenario.script) setInputText(selectedScenario.script);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <header className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-semibold">AS</div>
          <div>
            <h1 className="text-2xl font-bold">Araadhya Setia 11</h1>
            <p className="text-sm text-gray-600">Life Rehearsal Room — practise conversations with AI feedback</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">AI Mood</div>
          <select value={aiMood} onChange={(e) => setAiMood(e.target.value)} className="p-2 border rounded">
            <option>Calm</option>
            <option>Assertive</option>
            <option>Friendly</option>
            <option>Professional</option>
          </select>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="col-span-1 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Scenario</h2>
            <p className="text-xs text-gray-500 mt-1">Choose or add a scenario you want to rehearse.</p>

            <label className="block mt-3 text-xs text-gray-600">Select scenario</label>
            <select 
              className="w-full mt-1 p-2 border rounded-md" 
              value={selectedScenarioId}
              onChange={(e) => { setSelectedScenarioId(e.target.value); setChat([]); setFeedback(null); }}
            >
              {scenarios.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>

            <div className="mt-4 border-t pt-4">
              <h3 className="font-medium">Add custom scenario</h3>
              <input value={newScenarioTitle} onChange={(e)=>setNewScenarioTitle(e.target.value)} placeholder="Title" className="w-full mt-2 p-2 border rounded" />
              <input value={newScenarioDesc} onChange={(e)=>setNewScenarioDesc(e.target.value)} placeholder="Short description" className="w-full mt-2 p-2 border rounded" />
              <textarea value={newScenarioScript} onChange={(e)=>setNewScenarioScript(e.target.value)} placeholder="Suggested script (optional)" className="w-full mt-2 p-2 border rounded h-20" />
              <button onClick={handleAddScenario} className="mt-3 w-full bg-indigo-600 text-white p-2 rounded">Add scenario</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-medium">Quick tips</h4>
            <ul className="mt-2 text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2"><Icon name="check" className="w-4 h-4 text-green-600"/> Keep it short and specific.</li>
              <li className="flex items-start gap-2"><Icon name="check" className="w-4 h-4 text-green-600"/> Use an "I" statement to own your feelings.</li>
              <li className="flex items-start gap-2"><Icon name="check" className="w-4 h-4 text-green-600"/> End with a clear ask or next step.</li>
            </ul>
          </div>
        </aside>

        <section className="col-span-2 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col h-[540px]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{selectedScenario.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedScenario.description}</p>
              </div>
              <div className="text-sm text-gray-500">Scenario ID: <span className="font-mono text-xs">{selectedScenario.id}</span></div>
            </div>

            {selectedScenario.script && (
              <div className="mt-4 p-3 rounded-md bg-indigo-50 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Suggested script</h4>
                    <p className="text-sm text-indigo-800 mt-1">{selectedScenario.script}</p>
                  </div>
                  <button onClick={handleUseScript} className="text-sm px-3 py-1 border rounded bg-white">Use script</button>
                </div>
              </div>
            )}

            <div className="flex-1 mt-4 overflow-auto">
              <div className="space-y-3">
                {chat.length === 0 ? (
                  <div className="text-gray-400">No rehearsal yet — type your message in the box below and press Send.</div>
                ) : (
                  chat.map((m, i) => (
                    <div key={i} className={`max-w-[80%] ${m.from==='user'? 'self-end text-white bg-indigo-600 rounded-l-lg rounded-tr-lg':'self-start bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg'} p-3`}>{m.text}</div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <input value={inputText} onChange={(e)=>setInputText(e.target.value)} placeholder="Type your message..." className="flex-1 p-3 border rounded-md" onKeyDown={(e)=>{ if(e.key==='Enter') handleSend(); }} />
              <button onClick={handleSend} className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
            </div>

            {feedback && (
              <div className="mt-4 border rounded p-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">AI Feedback</h4>
                  <div className="text-sm text-gray-500">Confidence <strong>{feedback.confidence}%</strong></div>
                </div>

                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded border">
                    <div className="text-xs text-gray-500">Tone</div>
                    <div className="font-medium mt-1">{feedback.tone}</div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <div className="text-xs text-gray-500">Clarity</div>
                    <div className="font-medium mt-1">{feedback.clarity}%</div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <div className="text-xs text-gray-500">Recommendations</div>
                    <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                      {feedback.recommendations.map((r, idx) => <li key={idx}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">Practice Checklist</h4>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
              <div className="p-3 border rounded flex items-start gap-2"><Icon name="check" className="w-5 h-5 text-green-600"/><div>
                Keep sentences short
              </div></div>
              <div className="p-3 border rounded flex items-start gap-2"><Icon name="check" className="w-5 h-5 text-green-600"/><div>
                Own your feelings using "I"
              </div></div>
              <div className="p-3 border rounded flex items-start gap-2"><Icon name="check" className="w-5 h-5 text-green-600"/><div>
                State the desired next step
              </div></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto mt-6 text-sm text-gray-500">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
          <div>© Araadhya Setia — Life Rehearsal Room</div>
          <div className="flex gap-4">
            <a className="underline">Privacy</a>
            <a className="underline">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
