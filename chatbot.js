
document.addEventListener('DOMContentLoaded', () => {
  // --- helper: normalize text to match how we create keys ---
  function normalizeText(s) {
    if (!s) return s;
    // lowercase, remove non-alphanumeric (keep spaces), trim, collapse spaces
    return s.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')    // remove punctuation
            .replace(/\s+/g, ' ')
            .trim();
  }

  // --- generate a large set (~500) of friendly responses programmatically ---
  const bulk = {};
  const categories = [
    { seeds: ['hello', 'hi', 'hey', 'yo', 'howdy'], response: 'Hello! How can I help you?' },
    { seeds: ['how are you', 'how r u', 'how are u', 'how have you been'], response: "I'm doing great — thanks for asking! What can I help with?" },
    { seeds: ['flip a coin', 'flip coin', 'coin flip'], response: function(){ return Math.random() < 0.5 ? 'Sure! You got heads' : 'Sure! You got tails'; } },
    { seeds: ['roll a dice', 'roll a die', 'roll dice', 'dice roll'], response: function(){ return `Sure! You got ${Math.floor(Math.random()*6)+1}`; } },
    { seeds: ['what is the date today', 'date today', 'today date'], response: function(){ const now=new Date(); return now.toDateString(); } },
    { seeds: ['time now', 'what time is it', 'current time'], response: function(){ return new Date().toLocaleTimeString(); } },
    { seeds: ['tell me a joke', 'joke', 'make me laugh'], response: 'Why did the developer go broke? Because he used up all his cache.' },
    { seeds: ['thanks', 'thank you', 'thx', 'ty'], response: 'No problem! Let me know if you need anything else.' },
    { seeds: ['help', 'i need help', 'can you help'], response: 'Sure — tell me what you need help with.' },
    { seeds: ['who are you', 'what are you', 'your name'], response: 'I am a simple demo chatbot. Ask me to flip a coin, roll a dice, or ask something else!' }
  ];

  // Create many paraphrases by adding polite words, punctuation variants, and numbered variations
  let idx = 0;
  const politeSuffixes = ['', ' please', ' pls', ' please?', ' ?'];
  const prefixes = ['', 'hey ', 'hi ', 'hello '];

  // First fill from the category templates & expansions
  for (let cat of categories) {
    for (let seed of cat.seeds) {
      for (let p of prefixes) {
        for (let s of politeSuffixes) {
          if (idx >= 450) break; // keep some room for generic Qs
          const rawKey = (p + seed + s).trim();
          const key = normalizeText(rawKey);
          // avoid duplicates
          if (!bulk[key]) {
            bulk[key] = cat.response;
            idx++;
          }
        }
        if (idx >= 450) break;
      }
      if (idx >= 450) break;
    }
    if (idx >= 450) break;
  }

  // Fill remaining with generic Q variations and numbered prompts until ~500
  while (idx < 500) {
    const questionTypes = [
      'how to learn javascript',
      'best way to learn react',
      'what is html',
      'what is css',
      'explain closures',
      'what is git',
      'how to push to github',
      'how to make api',
      'what is nodejs',
      'what is express'
    ];
    const base = questionTypes[idx % questionTypes.length];
    const rawKey = `${base} ${Math.floor(idx/ questionTypes.length)+1}`; // make them unique
    const key = normalizeText(rawKey);
    if (!bulk[key]) {
      bulk[key] = `Quick tip about "${base}": google for beginner tutorials and practice small projects. (auto-response #${idx+1})`;
      idx++;
    } else {
      idx++;
    }
  }

  // Now add to Chatbot. We MUST add normalized keys to match our wrapper normalizeText above.
  const normalizedBulk = {};
  for (const k in bulk) {
    normalizedBulk[k] = bulk[k];
  }
  // Merge to Chatbot
  Chatbot.addResponses(normalizedBulk);

  // --- Wrap Chatbot.getResponse and getResponseAsync so incoming messages are normalized ---
  // Keep original references
  const _origGetResponse = Chatbot.getResponse;
  Chatbot.getResponse = function(message) {
    // Normalize before calling original
    const normalizedMessage = normalizeText(message);
    // Call original with normalized string (preserve `this`)
    return _origGetResponse.call(this, normalizedMessage);
  };

  const _origGetResponseAsync = Chatbot.getResponseAsync;
  Chatbot.getResponseAsync = function(message) {
    const normalizedMessage = normalizeText(message);
    return _origGetResponseAsync.call(this, normalizedMessage);
  };

  // --- Usage examples ---
  // 1) synchronous
  const sample1 = Chatbot.getResponse('Hello please!');
  console.log('sync sample:', sample1);

  // 2) async
  Chatbot.getResponseAsync('Flip a coin please?').then(res => console.log('async sample:', res));

  // Optional: expose a simple test function to console for experimentation
  window._testChat = (msg) => {
    console.log('input:', msg);
    console.log('response sync:', Chatbot.getResponse(msg));
    Chatbot.getResponseAsync(msg).then(r => console.log('response async:', r));
  };

  console.log('Added', Object.keys(normalizedBulk).length, 'custom responses to Chatbot.');
});

