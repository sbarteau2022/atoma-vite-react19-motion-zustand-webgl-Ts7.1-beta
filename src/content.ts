export const site = {
  name: 'Atoma Labs',
  product: 'Ares',
  tagline: 'One mind. Every engineering job.',
  lede: "Most AI forgets everything the moment you close the tab. Ares doesn't. We built a mind that lives apart from any single model. Teachers — different models, different strengths — pour what they know into one shared map, and then they can walk away. The map stays. It remembers, it compounds, and it gets sharper every time you use it.",
  kicker: "from Meta's SuperIntelligent Frameworks",
}

export const partners = [
  {
    id: 'meta-sil' as const,
    name: 'Meta Super Intelligence Labs',
    href: 'https://ai.meta.com/',
    caption: 'Hackathon',
  },
  {
    id: 'baseten' as const,
    name: 'Baseten',
    href: 'https://www.baseten.co/',
    caption: '1 of 2,000 sponsorships · 20,000 applicants',
  },
  {
    id: 'cerebral-valley' as const,
    name: 'Cerebral Valley',
    href: 'https://cerebralvalley.ai/',
    caption: 'Community',
  },
]

export const overview = [
  'When you start a job, Ares spins up a throwaway copy of that mind for that run alone. Nothing you test can poison the real one. A strict re-ranker watches every step, admits only what checks out, and writes a receipt for it. When the job is done, the throwaway is gone — but anything proven earns its place in the real mind.',
  "That's the whole trick: stop rebuilding intelligence from scratch every time, and start building on it instead.",
] as const

export const flowCards = [
  'Teach the map',
  'Spin a throwaway',
  'Re-rank every step',
  'Keep what proved',
] as const

export const layers = [
  {
    no: '01',
    title: 'The map',
    body: 'Ideas need room. A flat list crowds thoughts that are not related. Ares keeps them on a map: broad ideas near the middle, specific ones farther out.',
    bullets: [
      'This is the design. We have not re-tested the shape itself.',
      'You can look at the same map two ways. The shape, and the ball inside it.',
    ],
  },
  {
    no: '02',
    title: 'The cycle',
    body: 'A list of notes can branch. It cannot come back around. Thinking does. You take something in, then you act. You remember, then you imagine. That loop has a fast beat and a slow one, and they stay in step.',
    bullets: [
      '“Close on the loop” only helps choose what to look at next.',
      'It is not the model paying attention, and it is not a trick for word position.',
    ],
  },
  {
    no: '03',
    title: 'Memory',
    body: 'What a conversation remembers is not a junk drawer on the side. It lives in the same map. Things you use often stay near the middle. One-off details sit toward the edge.',
    bullets: [
      'We have checked this much: a saved memory can be read back exactly after a restart.',
      'We have not shown that unused memories fade on their own, or that answers got better. That part is still an idea.',
    ],
  },
  {
    no: '04',
    title: 'Twelve rooms',
    body: 'One guide sits in the middle. Twelve rooms sit around it. A job only opens the rooms it needs. Everything else is simply not there.',
    bullets: [
      'Opposite rooms do opposite jobs, so they do not trip over each other.',
      'Sense and action. Words and the body. Memory and imagination.',
    ],
  },
] as const

export const geometry = {
  kicker: 'How the mind is shaped',
  title: 'Four pieces. One map.',
  scope:
    'This is only the shape of the mind. The checker, the program, the tests, and the screen sit outside it. They use the map. They are not the map.',
  legend:
    'Some of this we have tried. Some of it is the design we wrote down and have not re-run. A few lines are still ideas, not results.',
  pieces: [
    {
      no: '01',
      title: 'The map',
      role: 'Room for ideas to branch',
      status: 'The design',
      body: [
        'Think of a family tree of thoughts. Each level needs more room than the one above it. A flat page crowds branches that are not related. This map gives them space.',
        'Closer to the middle means a broader idea. Farther out means a more specific one. Distance means “how far apart in the tree,” not “these two lists of numbers happened to differ.”',
        'That picture is the design. A later memory test used the map. It did not prove the shape.',
      ],
    },
    {
      no: '02',
      title: 'The cycle',
      role: 'The loop a list cannot hold',
      status: 'The design',
      body: [
        'A tree of notes branches. It does not come back around. Thinking does: take something in, then act. Work it out, then invent. Remember, then imagine.',
        'The loop has two speeds. A fast one for the step you are on. A slow one for the shape of the work. They stay locked: two fast turns for each slow one.',
        'How close two ideas are on that loop only helps choose what to look at. It is not the model paying attention, and it is not a stand-in for how a language model tracks word position.',
      ],
    },
    {
      no: '03',
      title: 'Memory',
      role: 'The same map, from the inside',
      status: 'Tried, plus an idea',
      body: [
        'Short-term memory is not a box bolted on the side. It lives in the same map. The center of that view is the center of the map.',
        'Near the middle: broad ideas, and the habits of where to send a job. Toward the edge: particular words and details. A remembered passage already knows where it belongs. Nothing has to be translated.',
        'An idea we have not measured: how close something sits to the center is how often we expect to use it again. Often-used memories would stay near the middle. Rare ones would drift out and fall away, with nobody having to delete them. Do not treat that as a result.',
        'What we did try: we saved a memory, restarted, and read the same opening back exactly, including a check that a changed value gets caught. That shows the memory can be written and read. It does not show that unused memories fade, or that answers got better.',
      ],
    },
    {
      no: '04',
      title: 'Twelve rooms',
      role: 'One center, twelve around it',
      status: 'The design',
      body: [
        'One guide sits in the middle. Twelve rooms sit around it, each one touching the center, with no gaps. New ideas land on that ring. Letting the ring move as ideas come in is a possible upgrade. It is not built.',
        'The rooms come in pairs that face each other. Sense faces action. The body faces language. Memory faces imagination. Careful reasoning faces wide invention. What matters faces other people. A place faces the mind watching itself.',
        'A specialist in one room cannot see the opposite room. A job opens that room, the neighbors it is allowed to use, the part of the loop that fits, and how deep to go. Anything outside that is absent, not hidden.',
        'Another idea we have not checked: the rooms might be tangled neighborhoods rather than plain balls. The twelve-room layout still stands.',
      ],
    },
  ],
  fit: [
    'The map is the shape. Ideas get room to branch.',
    'The cycle is the loop on that map. Fast and slow, locked together. Closeness only helps pick an idea.',
    'Memory is the same map seen from inside. Farther out means more specific. In theory, it also means less likely to be used again.',
    'Twelve rooms are the neighborhoods. One guide in the middle, twelve around it, paired into opposites. A job opens only what it needs.',
  ],
  sources: [
    'The shape, the loop, the twelve rooms, and what a job is allowed to see come from our October write-up.',
    'The “memories fade toward the edge” picture is an idea from November. It is not a measurement.',
    'In November we did save a memory, restart, and read it back exactly. That test does not prove the fade idea.',
  ],
} as const

export const workflow = [
  { no: '01', title: 'Teach', body: 'Different models, different strengths, pour what they know into one shared map — then they can walk away.' },
  { no: '02', title: 'Isolate', body: 'A throwaway copy of the mind for that job alone. Nothing you test can poison the real one.' },
  { no: '03', title: 'Re-rank', body: 'A strict re-ranker watches every step, admits only what checks out, and writes a receipt.' },
  { no: '04', title: 'Keep', body: 'The throwaway is gone. Anything proven earns its place in the real mind.' },
] as const

export const capabilities = [
  { title: 'One mind, many teachers', body: 'The mind is not stuck inside one model. Different models teach it, then they can leave. The map stays.' },
  { title: 'A fresh copy for every job', body: 'Each job gets its own copy. You can test, break, and explore. A bad job cannot spoil the real mind.' },
  { title: 'Only what checks out stays', body: 'Every step is watched. If it does not check out, it does not get in. What passes is written down, so you can see why.' },
  { title: 'Build on it, don’t start over', body: 'When the job is done, the copy is gone. Anything that proved itself earns a place in the real mind. It gets sharper instead of resetting.' },
] as const

export const features = [
  {
    no: '001',
    title: 'The map stays',
    body: 'Different models, with different strengths, write into one shared map. Close the tab. The mind is still there, a little sharper than when you left.',
  },
  {
    no: '002',
    title: 'A copy, not the original',
    body: 'A job never touches the real mind directly. Ares makes a copy, does the work, and throws the copy away when you are done.',
  },
  {
    no: '003',
    title: 'Keep what proved itself',
    body: 'Only the steps that check out are kept, and each one is written down. Everything else leaves with the copy.',
  },
] as const

export const integrations = [
  {
    id: 'docs',
    label: 'Your notes',
    items: ['Project readmes', 'Design notes', 'Examples you trust', 'Work that already checked out'],
  },
  {
    id: 'comms',
    label: 'The job',
    items: ['The steps of a task', 'A written reason for each one', 'A trail of what happened', 'A practice run first'],
  },
  {
    id: 'ops',
    label: 'The rules',
    items: ['You approve the big changes', 'If it can’t be proved, it doesn’t run', 'A record you can check later', 'The checks we keep'],
  },
  {
    id: 'crm',
    label: 'Your computer',
    items: ['Runs on your machine', 'Your models, when they are available', 'Stays on this computer', 'Bring the tools you already use'],
  },
] as const

export const faqs = [
  {
    q: 'What is the shared mind?',
    a: 'A map that lives apart from any one model. Different models teach it, then they can leave. The map stays. It remembers, and it gets sharper every time you use it.',
  },
  {
    q: 'What happens when I start a job?',
    a: 'Ares makes a copy of the mind for that job alone. Nothing you try can spoil the real one. When the job is done, the copy is gone. Anything that checked out — and was written down — earns a place in the real mind.',
  },
  {
    q: 'Is this a Meta product?',
    a: 'No. Atoma Labs is an independent research lab. The work is built from ideas that came out of Meta’s superintelligence research. It runs on your computer, with your keys.',
  },
  {
    q: 'What do I still decide?',
    a: 'Everyday steps can run on their own. A big change — what the job is, which model is used, what it is allowed to see — waits for you. The system can suggest it. It cannot approve it.',
  },
  {
    q: 'Where does it run?',
    a: 'On your computer, not in someone else’s cloud. If that program is not running, this site says so. It will not pretend everything is fine.',
  },
  {
    q: 'Does it use every model I have installed?',
    a: 'No. Two older ways of running models are turned off. If a model is not actually available, the job stops. We do not fill in a fake answer.',
  },
] as const

export const principles = [
  {
    no: '01',
    title: 'One mind',
    body: 'The mind lives apart from any single model. Teachers pour in. They can walk away. The map stays.',
  },
  {
    no: '02',
    title: 'Throwaway runs',
    body: 'Every job gets an isolated copy. Nothing you test can poison the real mind.',
  },
  {
    no: '03',
    title: 'Re-rank, don’t hope',
    body: 'A strict re-ranker watches every step, admits only what checks out, and writes a receipt.',
  },
  {
    no: '04',
    title: 'Proven work stays',
    body: 'When the job is done the throwaway is gone. Anything proven earns its place. Intelligence compounds.',
  },
  {
    no: '05',
    title: 'Fail closed',
    body: 'No dispatch, memory write, model call, or erasure ships without a permit, an audit entry, and a Merkle anchor.',
  },
  {
    no: '06',
    title: 'Human oversight is a gate',
    body: 'Gate 12 is not a notification. Core-scope changes need a single-use human permit. The automaton does not self-approve.',
  },
  {
    no: '07',
    title: 'Evidence over theatre',
    body: 'Demo data stays labelled demo. Hardware runs before anything ships. Synthetic greens do not count.',
  },
] as const

export const changelog = [
  {
    date: '2026-11-04',
    version: '0.4.0',
    title: 'Mind-MCP-only executor, honest seats',
    items: [
      'Mission live identifies the executor as mind-mcp-only. Bound model calls fail closed.',
      'Native MTP refuses bound-output claims it cannot attest. Text binding is not a model-forward receipt.',
      'Glimmer HTTP seat no longer carries a placeholder model artifact.',
      'Live runner marks unsupported tool calls as packet failures. Declared=false is rejected before the wire.',
    ],
  },
  {
    date: '2026-11-03',
    version: '0.3.0',
    title: 'Scoped swarm handles',
    items: [
      'L0 issuer mints an ephemeral 256-bit handle bound to role, wells, map identity, prefix, and expiry.',
      'Worker mind.recall is rewritten to mind.recall_scoped. Caller-supplied wells are replaced.',
      'Exact K/V remains denied until a separate tensor entitlement is defined.',
    ],
  },
  {
    date: '2026-11-02',
    version: '0.2.0',
    title: 'Governance skeleton on :4810',
    items: [
      'Fail-closed startup: schema, 12 controls, verified audit chain from genesis to head.',
      'RFC 6962 Merkle vault with odd-node carry-forward.',
      'Qdrant session memory and HyperDX telemetry as separate stores. SurrealDB remains the authority.',
    ],
  },
] as const

export type Post = {
  slug: string
  category: 'Updates' | 'Engineering' | 'Operations'
  date: string
  title: string
  dek: string
  body: string[]
}

export const posts: Post[] = [
  {
    slug: 'one-mind-every-job',
    category: 'Engineering',
    date: '2026-11-04',
    title: 'One mind. Every engineering job.',
    dek: 'Stop rebuilding intelligence from scratch every time. Start building on it instead.',
    body: [
      "Most AI forgets everything the moment you close the tab. Ares doesn't. We built a mind that lives apart from any single model. Teachers — different models, different strengths — pour what they know into one shared map, and then they can walk away. The map stays. It remembers, it compounds, and it gets sharper every time you use it.",
      'When you start a job, Ares spins up a throwaway copy of that mind for that run alone. Nothing you test can poison the real one. A strict re-ranker watches every step, admits only what checks out, and writes a receipt for it. When the job is done, the throwaway is gone — but anything proven earns its place in the real mind.',
      "That's the whole trick: stop rebuilding intelligence from scratch every time, and start building on it instead.",
    ],
  },
  {
    slug: 'active-inference-bound-by-heat',
    category: 'Engineering',
    date: '2026-11-04',
    title: 'Active inference, bound by thermodynamic dissipation',
    dek: 'A mind that cannot price its own burn is not superintelligent. It is a furnace.',
    body: [
      'Most stacks optimize for fluency. They spend tokens until the answer looks like language. Active inference is the opposite: hold a generative model, predict the next observation, act to reduce surprise, and refuse a step whose free energy cannot be priced.',
      'In Ares the bound is explicit. F = complexity − accuracy + β · dissipation. Recall versus recompute is an argmin inside that functional — not a vibe, not a max-context slider. A valid cached conclusion that still gets recomputed is receipted wasteful. Right answer, overpriced bound.',
      'Landauer\'s limit (k_B T ln 2 per bit) is the physical floor we respect. It is not a dashboard of measured GPU joules, and we will not pretend it is. The honesty is the same as Gate 12: the automaton may propose a cheaper descent; it may not spend heat the bound did not admit, and it may not self-approve a core-scope change.',
    ],
  },
  {
    slug: 'why-retrieval-alone-fails',
    category: 'Engineering',
    date: '2026-11-04',
    title: 'Why retrieval alone fails, and what a judged map changes',
    dek: 'A vector hit is not a verdict. Atoma treats recall as evidence that still has to pass a gate.',
    body: [
      'Most stacks stop at retrieval. They embed a corpus, return nearest neighbors, and call the job done. That is a search feature, not a mind.',
      'Ares keeps three stores on separate jobs: SurrealDB for permits and the audit chain, Qdrant for RAG with provenance, HyperDX for telemetry. A BM25 hit from research_library_v1 is labelled as lexical. A Qwen rank-0 vector hit is labelled as dual-rank RRF. Neither is allowed to pose as the other.',
      'The map is the difference. Recalled atoms carry source, silo, and a content hash. A packet that cannot produce a receipt does not update confidence. That is slower than a chatbot. It is also the only way a long engineering run stays honest.',
    ],
  },
  {
    slug: 'gate-12-human-oversight',
    category: 'Operations',
    date: '2026-11-03',
    title: 'Gate 12: human oversight as a gate, not a notification',
    dek: 'The system can propose a core-scope change. It cannot approve one.',
    body: [
      'Approval theatre is easy: toast a banner, log a line, keep moving. Gate 12 is the opposite. Core-scope changes — thread/run definition, model swap, silo view, policy expansion, control registry — require a single-use human permit bound to the audit chain.',
      'The client cannot forge the sequence-to-scope binding. The scope is read from the issuance entry. A permit used once is spent. A missing permit is a forbidden dispatch, not a warning.',
      'This is how Atoma keeps speed without giving the automaton the keys. Sensitive work waits. Routine work runs. The distinction is policy, not vibe.',
    ],
  },
  {
    slug: 'from-prompt-to-mechanism',
    category: 'Engineering',
    date: '2026-11-02',
    title: 'From prompt to mechanism: building automation you can audit',
    dek: 'If the only proof is a generated paragraph, you do not have a run. You have a story.',
    body: [
      'Ares missions are packets with judges. Exit codes, golden hashes, contains/not-contains checks — coders never self-approve. A geometry dry-run issues no run. A live mission without an admitted map.* output escalates fail-closed, on purpose.',
      'The audit chain is SHA-256 over sequence, approved bit, epistemic mark, previous digest, and action. Rejections are entries too. Tamper one stored action and the process refuses to boot.',
      'That is the mechanism. Prompts still happen, behind a seat that can attest what it did. Placeholder logits and hashed MCP text are not receipts. We deleted those paths rather than dress them up.',
    ],
  },
  {
    slug: 'context-loss-in-long-runs',
    category: 'Updates',
    date: '2026-10-30',
    title: 'The hidden cost of context loss in long engineering runs',
    dek: 'Tab-switching is the visible tax. The invisible one is a mind that forgets which atom it already judged.',
    body: [
      'Long runs die from context loss, not from slow tokens. Agents rebuild the same mental model every hop: which source, which permit, which failed packet. The working set evaporates, and the next step hallucinates a continuation.',
      'Session memory in Ares is append-only. Summaries and memories tail into the next session start. Retrieval quality is not certified yet — the TPPE collection is a positional state plus lexical vector, not a neural embedding — and the UI will not pretend otherwise.',
      'The rule is stable prefix, volatile tail. Keep identity and tool schemas warm. Put timestamps and hole roots last. Continuity is a cache-physics problem as much as a product one.',
    ],
  },
]

export function postBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}
