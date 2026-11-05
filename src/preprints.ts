export type PreprintSection = {
  id: string
  title: string
  body: string
}

export type Preprint = {
  id: string
  no: string
  title: string
  date: string
  lead: string
  pdf: string
  sections: PreprintSection[]
}

export const preprints: Preprint[] = [
  {
    id: 'meta-superposition',
    no: '01',
    title: 'Meta-Superposition: Holding Prediction in Superposition',
    date: 'November 4, 2026',
    lead: 'Hold several possible continuations at once. Commit to none of them until a single judge says yes. Only a checked result can raise trust.',
    pdf: '/preprints/meta-superposition.pdf',
    sections: [
      {
        id: 'hold',
        title: 'Hold, don’t commit early',
        body: 'A held proposal cannot change while it is held. It carries its own identity, its own expiry, and the strategy that proposed it. The weight on it is audited confidence from checked outcomes, not a guess the proposer made about itself.',
      },
      {
        id: 'collapse',
        title: 'Collapse is two steps',
        body: 'First the automaton admits, rejects, or asks for more constraint. Then, if the admitted proposal runs, someone other than the proposer checks the outcome. A proposal that is admitted but never runs moves nothing. A proposal that runs but is never checked moves nothing.',
      },
      {
        id: 'judge',
        title: 'One judge, not many',
        body: 'There is one automaton and one transition function. It validates, re-ranks by audited confidence, and decides the next prediction. It does not take a worker turn, command the brigade, or own a second memory store.',
      },
    ],
  },
  {
    id: 'hyperbolic-manifolds',
    no: '02',
    title: 'Hyperbolic Multi-Model Manifolds',
    date: 'November 4, 2026',
    lead: 'A map you can walk, a cache that knows where it lives, and an atom that earns its place. The mind is a curved map. Nothing enters unjudged.',
    pdf: '/preprints/hyperbolic-manifolds.pdf',
    sections: [
      {
        id: 'map',
        title: 'The mind is a curved map',
        body: 'Knowledge sits in basins on the map. The key-value cache sits inside that map, not beside it. Theory in this preprint stays labelled theory until it is measured.',
      },
      {
        id: 'cache',
        title: 'The cache is nested, not adjacent',
        body: 'The key-value cache is nested in the same curved map as the atoms. It is not a second store sitting next to the mind.',
      },
      {
        id: 'atom',
        title: 'An atom earns its place',
        body: 'Nothing enters the map unjudged. An atom keeps its place by being admitted, not by being nearby.',
      },
    ],
  },
  {
    id: 'brigade-agentics',
    no: '03',
    title: 'Assembling Brigade-Style Agentics',
    date: 'November 4, 2026',
    lead: 'A brigade is assembled lanes under one gate, one re-ranker, and one receipt ledger. It is not a crowd, and it is not a manager with workers.',
    pdf: '/preprints/brigade-agentics.pdf',
    sections: [
      {
        id: 'lanes',
        title: 'What a brigade is',
        body: 'A lane is a bounded sequence of invocations under one identity. The proposer families named in the preprint are Retrieval, Prefill, Mtp, and Drafter. Every lane passes the same gate, is ranked by the same confidence, and leaves the same kind of receipt.',
      },
      {
        id: 'swarm',
        title: 'A swarm is not a brigade',
        body: 'The November 4 swarm measurement is ten runtime minds, each seeded with its scope, each reasoning alone. That is evidence about seeded reasoning. This preprint does not cite it as evidence about a brigade.',
      },
      {
        id: 'spec',
        title: 'The October 27 specification is a proposal',
        body: 'The Attention Economics and Active Inference specification is mapped here as a proposal. Rows in that mapping are labelled verified, reported, proposed, or refuted. Proposed and refuted rows are not measured results.',
      },
    ],
  },
]

export function preprintById(id: string | null): Preprint {
  return preprints.find((paper) => paper.id === id) ?? preprints[0]
}
