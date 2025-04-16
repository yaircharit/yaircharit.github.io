const questData = [
  {
    id: 'quest-0',
    title: "The Memory Keeper's Fate",
    category: "Main Quest",
    summary: "Stopped a dragonborn ritual and rescued Draksha, but the mystery deepens.",
    reward: "Draksha’s gratitude; vision clues; encrypted scroll",
    details: `
      <strong>Origin (Session 1):</strong><br>
      Garak Kha'zul pleaded for help at Brisban’s Inn.  
      You uncovered a draconic ritual and stopped it in time.<br>
      <strong>Progress:</strong><br>
      Ritual thwarted, vision received, encrypted scroll recovered.
    `,
    subQuests: [
      {
        title: "Aid Garak Kha'zul",
        completed: true,
        details: "Healed him and accepted his offer of 50 gp to stop the dragonborn."
      },
      {
        title: "Cross the mountain path",
        completed: true,
        details: "Spoke with wildlife for guidance and reached the shrine."
      },
      {
        title: "Infiltrate the dragonborn cave",
        completed: true,
        details: "Fought guards, disrupted the ritual, and freed Draksha."
      },
      {
        title: "Decode the three-part vision",
        completed: false,
        details: "Interpret the meaning of the dragon, flaming sword, and tiger warrior."
      },
      {
        title: "Decode the encrypted draconic scroll",
        completed: false,
        details: "One scroll remains written in encrypted draconic. It may relate to the memory ritual."
      }
    ]
  },
  {
    id: 'quest-1',
    title: "New Beginnings",
    category: "Side Quest",
    summary: "Returned to Creston to gather knowledge, send letters, and prepare for the road to Grimhold.",
    reward: "Maps, horses, insight",
    details: `
      <strong>Origin (Session 2):</strong><br>
      You returned to town, asked questions about the ritual and vision, and read about King Adelbern.<br>
      <strong>Progress:</strong><br>
      Equipped and informed.
    `,
    subQuests: [
      {
        title: "Talk to Garak about the vision",
        completed: true,
        details: "He couldn’t identify the visions but confirmed Draksha's state of mind."
      },
      {
        title: "Buy the history book from Brisban",
        completed: true,
        details: "Learned of King Adelbern and his flaming sword."
      },
      {
        title: "Send letters and get map",
        completed: true,
        details: "Letters sent to Aleron and Zorathar. Phili gave you a map of the region."
      },
      {
        title: "Get horses from Brando",
        completed: true,
        details: "Charm magic helped you buy horses cheap."
      }
    ]
  },
  {
    id: 'quest-2',
    title: "Parnell's Gang and the Smuggling Ring",
    category: "Main Quest",
    summary: "Investigated bounties in Grimhold and uncovered the operations of Parnell's Gang.",
    reward: "150 gp (Rusty); Guard’s trust",
    details: `
      <strong>Origin (Sessions 2–5):</strong><br>
      You followed bounties to Lady Luck’s Lair and discovered a smuggling route under the city.<br>
      <strong>Progress:</strong><br>
      Freed Thorn, defeated Parnell, uncovered a safehouse and an ally in the Vale's Guard.
    `,
    subQuests: [
      {
        title: "Track Thorn Reddale in Lady Luck’s Lair",
        completed: true,
        details: "Used his sock scent to follow his trail into a secret entrance."
      },
      {
        title: "Infiltrate Parnell’s hideout",
        completed: true,
        details: "Disguises, charm, and clever timing helped you get past guards."
      },
      {
        title: "Defeat Parnell’s Gang",
        completed: true,
        details: "Killed Parnell and his men, secured a logbook and important letters."
      },
      {
        title: "Gain Draven Blackthorn’s support",
        completed: true,
        details: "Gave him proof of the smuggling ring; he sent backup and granted access."
      },
      {
        title: "Investigate safehouse deed",
        completed: true,
        details: "Discovered Tavon Greystone's family house was their fallback point."
      }, 
      {
        title: "Fang's Keep Map",
        completed: false,
        details: "The map shows several secret breaches to Fangs Keep, the city of humanoid-animals."
      },
      {
        title: "Discover T.D.’s identity",
        completed: false,
        details: "Who is T.D.? What are his plans? What does he want with the smuggling ring?"
      }
    ]
  },
  {
    id: 'quest-3',
    title: "The Lights of Emberfall",
    category: "Side Quest",
    summary: "Follow magical flickers deep in Emberfall’s ruins using a borrowed trinket.",
    reward: "Unknown magical reaction; trinket lore",
    details: `
      <strong>Origin (Session 2 & 6):</strong><br>
      Frida & Funny’s gave a magical trinket for 10 gp to track hidden arcana.<br>
      <strong>Progress:</strong><br>
      Trinket obtained; ruins await.
    `,
    subQuests: [
      {
        title: "Pay deposit for trinket",
        completed: true,
        details: "Paid 10 gp for the trinket. It pulses in presence of arcane auras."
      },
      {
        title: "Explore Emberfall’s ruins",
        completed: false,
        details: "Follow light anomalies and hidden glyphs in Emberfall."
      }
    ]
  },
  {
    id: 'quest-4',
    title: "Library Research",
    category: "Faction Quest",
    summary: "Research torn manuscripts and trace elven magic",
    reward: "Insight into fey and ancient rituals",
    details: `
      <strong>Origin (Session 6):</strong><br>
      Found tomes by Kaelen Thornheart, Kendra Stormeye, and one with missing Emberfall pages.<br>
      <strong>Progress:</strong><br>
      Still analyzing contents; torn pages suspicious.
    `,
    relatedQuests: ["The Tower and the Elf"],
    subQuests: [
      {
        title: "Study Thornheart’s research",
        completed: false,
        details: "Elves origins & the Feywild."
      },
      {
        title: "Review Stormeye’s Sylpharium thesis",
        completed: false,
        details: "Dismissed for lacking evidence, her work hinted at fey-splicing—maybe relevant to Elio?"
      },
      {
        title: "Investigate torn pages from 'Testimonies'",
        completed: false,
        details: "Pages were cleanly removed. Ask the librarian who accessed them last."
      }
    ]
  },
  {
    id: 'quest-5',
    title: "The Tower and the Elf",
    category: "Personal Quest",
    summary: "Elio remembers a strange tower and a familiar figure… but not why it matters.",
    reward: "Answers from the past",
    details: `
      <strong>Origin:</strong><br>
      In a small crooked tower there was a flash of arcane light shot to the skies. 
      Elio awoke next to a crazed wizard and a strangely familiar figure smiling eerily at him.  
      The wizard started chanting in a strange language.
      Before Elio could react, he was pulled out of the tower, flying at impossible speeds. 
      He eventually landed in the middle of a forest, without any memory of who he was or how he got there.
      Feeling distressed and lost he started experiencing flashes of memory, and slowly learned to control his arcane powers.
      Yearning for answers, he set out to find the tower and the wizard, hoping to uncover the truth behind his past.<br>
      <strong>Progress:</strong><br>
      Flashes of memory tie Elio to Emberfall’s ruins, to the wizard, and to the mysterious figure.
    `,
    subQuests: [
      {
        title: "Follow visions of the tower",
        completed: false,
        details: "Elio feels drawn to Emberfall—its tower may be the key."
      },
      {
        title: "Find the familiar figure",
        completed: false,
        details: "Someone stood across from him at the ritual. Elio can't shake the feeling he knew them."
      },
      {
        title: "Discover the wizard's identity",
        completed: false,
        details: "The elven wizard chanted in an ancient tongue. His intentions remain a mystery.",
        relatedQuests: ["Library Research"]
      },
      {
        title: "Uncover the ritual’s truth",
        completed: false,
        details: "What happened that night? The fragments feel like they once belonged to something whole."
      }
    ]
  }
];
