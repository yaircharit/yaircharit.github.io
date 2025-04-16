// JSON quest data with 'details' & 'nextQuests'
const questData = [
  {
    id: 'quest-0',
    title: "The Tower and the Elf",
    category: "Personal Quest",
    summary: "Awakened in a ring of runes at the foot of an ivory tower in Emberfall.",
    reward: "Clues to your origin",
    details: `
      <strong>Origin:</strong><br>
      You awoke alone in glowing runes beside a familiar stranger. An elven wizard in blue-silver robes split you apart and vanished.<br>
      <strong>Progress:</strong><br>
      Haven’t found the tower ruins yet.<br>
    `,
    subQuests: [
      {
        title: "Investigate Emberfall’s tower",
        completed: false,
        details: `
          <strong>Description:</strong> Explore the ruins of the ivory tower you recall.<br>
          <strong>Session Clues:</strong> Ask villagers, follow rune residue north of the mountain pass.
        `
      },
      {
        title: "Learn identity of blue-silver elf",
        completed: false,
        relatedQuests: ["Library Research"],
        details: `
          <strong>Description:</strong> Discover who the wizard was.<br>
          <strong>Session Clues:</strong> Check archives at The Sylpharium; look for eyewitnesses at Brisban’s Inn.
        `
      },
      {
        title: "Discover who the other person was",
        completed: false,
        details: `
          <strong>Description:</strong> Find the companion you were with.<br>
          <strong>Session Clues:</strong> Investigate rumors of two figures in arcane portals.
        `
      }
    ]
  },
  {
    id: 'quest-1',
    title: "The Emberwoven Shroud",
    category: "Main Quest",
    summary: "A cloaked agent offered 300 gp to retrieve the fabled Shroud from Emberfall.",
    reward: "300 gp; audience with employer",
    details: `
      <strong>Origin:</strong><br>
      Session 6 at The Bloody Blade: a gold-lined stranger recruited you and paid 300 gp upfront.<br>
      <strong>Progress:</strong><br>
      Stocked supplies and researched Emberfall’s hazards.
    `,
    subQuests: [
      {
        title: "Stock Up for Emberfall",
        completed: true,
        details: `
          <strong>Session 6 Purchases:</strong><br>
          Ring of Absorb Elements, Feywild Shard, Bag of Holding, potions, alchemist’s fire.
        `
      },
      {
        title: "Research Emberfall",
        completed: false,
        details: `
          <strong>Session 6 Library:</strong><br>
          Read *History & Geography of the Elemental Cities* and torn *Testimonies* pages.
        `
      },
      {
        title: "Find the Emberwoven Shroud",
        completed: false,
        details: `
          <strong>Session 6</strong><br>
          Search the Emberfall for the Emberwoven Shroud.
        `
      },
      {
        title: "Retrieve the Emberwoven Shroud",
        completed: false,
        details: `
          <strong>Session 6</strong><br>
          Retrieve the EWS to your mysterious employer in New Kingsville (?)
        `
      }
    ]
  },
  {
    id: 'quest-2',
    title: "The Memory Keeper",
    category: "Main Quest",
    summary: "Delivered the Kha’zul brothers safely to New Kingsville; they granted you free lodging.",
    reward: "Free rooms; Draksha’s gratitude",
    details: `
      <strong>Origin:</strong><br>
      Began Session 1 after aiding Garak at Brisban’s Inn.<br>
      <strong>Progress:</strong><br>
      Protected them across mountain pass; arrived safely.
    `,
    subQuests: [
      {
        title: "Protect Garak and Draksha",
        completed: true,
        details: `
          <strong>Completed:</strong> Fended off highwaymen ambush.
        `
      },
      {
        title: "Deliver them to New Kingsvale safely",
        completed: true,
        details: `
          <strong>Completed:</strong> Escorted by the Vale’s Guard to New Kingsville
        `
      },
      {
        title: "Investigate",
        completed: false,
        details: `
          Find out more about the dragonbornes who attacked their tribe.<br>
		  What did they want? <br>
		  what they were looking for in Dreksha's memmories?<br>
		  What is the meaning of the vision we all saw?
        `
      }
    ]
  },
  {
    id: 'quest-3',
    title: "The Lights of Emberfall",
    category: "Side Quest",
    summary: "Investigate strange flickers in Emberfall’s ruins with a borrowed trinket.",
    reward: "Unknown magical insight",
    details: `
      <strong>Origin:</strong><br>
      Session 2: heard rumors at Frida & Funny’s.<br>
      <strong>Progress:</strong><br>
      Paid deposit and obtained trinket in Session 6.
    `,
    subQuests: [
      {
        title: "Pay 10 gp for trinket",
        completed: true,
        details: `
          <strong>Session 6:</strong> Paid 10 gp deposit; trinket pulses near hidden glyphs.
        `
      },
      {
        title: "Explore ruins",
        completed: false,
        details: `
          Search for the source of these mystirous lights.
        `
      }
    ]
  },
  {
    id: 'quest-4',
    title: "Library Research",
    category: "Faction Quest",
    summary: "Recover missing lore about magic, elves, and the Feywild.",
    reward: "Knowledge; clues to Shadowfell",
    details: `
      <strong>Origin:</strong><br>
      Session 6: Tazir found three key texts in the city library.<br>
      <strong>Progress:</strong><br>
      Identified books by Thornheart, Stormeye, and an anonymous historian.
    `,
    relatedQuests: ["The Tower and the Elf"],
    subQuests: [
      {
        title: "Review key tomes",
        completed: false,
        details: `
          <strong>Books:</strong><br>
          • Kaelen Thornheart on elves & Feywild<br>
          • Kendra Stormeye’s Sylpharium project<br>
          • History of magic & the gods
        `
      },
      {
        title: "Investigate torn pages",
        completed: false,
        details: `
          <strong>Clue:</strong> *Testimonies* pages missing author’s name; ask librarians.
        `
      }
    ]
  }
];