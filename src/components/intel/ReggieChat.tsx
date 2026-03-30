'use client';

import { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'reggie';
  text: string;
}

const mockResponses: Record<string, string> = {
  'What does the latest ABAC ruling mean for my next campaign?':
    "Based on this week's Intel, the ABAC adjudication focused on implied health associations in lifestyle imagery — specifically outdoor settings paired with consumption messaging. For your next campaign, review any imagery that could be interpreted as suggesting alcohol enhances physical performance or healthy living. The safest approach: ensure your creative depicts social enjoyment without aspirational health framing. This aligns with ABAC Section 3(a) as noted in this week's briefing.",
  'Which changes this week affect my sector most?':
    "The most actionable item this week is the recent Ad Standards judgement on health claim substantiation. It reinforces that any comparative or performance claim needs documented evidence available before the ad runs — not after a complaint. The TGA update on infringement notices is also worth noting if you operate in supplements or health. Prioritise reviewing any efficacy or results claims in your current creative.",
  'Should I be worried about the TGA update?':
    "The TGA update in this week's Intel relates to infringement notices issued to health practitioners making therapeutic claims in advertising. If your brand makes any health or therapeutic claims — including implied ones through imagery or testimonials — this is worth paying attention to. The TGA has signalled increased enforcement activity. Run your next campaign through Checkedit before it goes live. Audit your own content for less than a coffee a day at Checkedit.ai.",
};

const chips = Object.keys(mockResponses);

export default function ReggieChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [usedChips, setUsedChips] = useState<Set<string>>(new Set());

  const handleChipClick = (chip: string) => {
    if (usedChips.has(chip)) return;
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', text: chip },
      { role: 'reggie', text: mockResponses[chip] },
    ];
    setMessages(newMessages);
    const next = new Set(Array.from(usedChips));
    next.add(chip);
    setUsedChips(next);
  };

  const allUsed = usedChips.size === chips.length;

  return (
    <div className="flex flex-col gap-4 border p-6 bg-brand-white border-grey-200 shadow-sm rounded-xl transition-all duration-500">
      <div className="flex flex-wrap items-center gap-2">
        <Sparkles className="w-5 h-5 text-brand-primary" />
        <h2 className="text-base font-medium text-brand-title-text">Ask Reggie</h2>
        <span className="inline-flex items-center justify-center rounded-md text-xs font-medium px-2.5 py-1 bg-brand-primary/10 text-brand-primary">
          Intel Mode
        </span>
      </div>

      <p className="text-sm text-brand-body-text">
        Reggie has read this week&apos;s Intel. Ask him anything about it.
      </p>

      <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-lg p-3 flex items-start gap-2">
        <Info className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
        <p className="text-xs text-brand-body-text">
          Reggie&apos;s answers are based on the content in this Intel briefing only. Always verify regulatory detail at the primary source.
        </p>
      </div>

      {/* Chat messages */}
      {messages.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {messages.map((msg, i) => (
            msg.role === 'user' ? (
              <div key={i} className="flex justify-end mb-3">
                <div className="bg-brand-primary text-white rounded-xl rounded-tr-sm px-4 py-2 text-sm max-w-xs">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-start mb-3">
                <div className="bg-grey-100 text-brand-title-text rounded-xl rounded-tl-sm px-4 py-2 text-sm max-w-sm">
                  <strong>Reggie:</strong> {msg.text}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Question chips */}
      {!allUsed && (
        <div className="flex flex-col gap-2">
          {chips.map((chip) => (
            !usedChips.has(chip) && (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="inline-flex items-center justify-center gap-2 whitespace-normal text-left rounded-md font-medium active:scale-95 border-2 px-4 py-2 border-brand-primary text-brand-primary hover:bg-grey-100 cursor-pointer transition-colors duration-200 text-sm"
              >
                {chip}
              </button>
            )
          ))}
        </div>
      )}

      {allUsed && (
        <p className="text-xs text-brand-body-text text-center mt-4">
          More questions? Full Reggie Intel conversations coming soon.
        </p>
      )}

      {/* Disabled input */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          disabled
          placeholder="Ask Reggie about this week's Intel..."
          className="flex-1 border border-grey-200 rounded-lg px-3 py-2 text-sm bg-grey-50 text-gray-400 cursor-not-allowed"
        />
        <button
          disabled
          className="inline-flex items-center justify-center rounded-md font-medium px-4 py-2 bg-grey-200 text-grey-400 h-10 cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
