const questData = [
  {
    id: "quest-0",
    title: "The Tower and the Elf",
    category: "Personal Quest",
    summary: "Elio is haunted by visions of a strange tower and a cryptic wizard—but his past remains hidden.",
    reward: "Fragments of memory; elusive truth",
    relatedQuests: [],
    details: `
      <strong>Origin:</strong><br>
      In the middle of an ever-burning hellish landscape stood a thin, crooked black tower—impossibly tall, crafted from a single shard of obsidian.  
      Flickering lights danced in its top chamber as a beam of arcane energy split the sky.<br>
      Elio awoke in a ring of glowing runes, sensing a ritual at work. In the center stood a strange elven wizard chanting an unfamiliar tongue.  
      Across the circle, a shadowed figure grinned maniacally, raising a dark incantation that warped reality itself.<br>
      The air grew cold and heavy. The wizard’s voice trembled with resolve as he continued his spell, his eyes betraying decades of worry and flickers of hope.<br>
      Then, with a soft smile meant only for Elio, the wizard paused—and a blinding light erupted from the circle.  
      Elio was hurled out of the tower at impossible speed, landing in a distant forest with no memory of who he was.<br>
      Distressed and lost, he struggled with flashes of power and fleeting memories of arcane secrets.  
      Yearning for answers, he now seeks the black tower, the elven wizard, and the shadowed figure who changed his fate.<br>
      <strong>Progress:</strong><br>
      Haunting visions draw him to Emberfall’s ruins, but the ritual’s purpose and his true identity remain shrouded.
    `,
    subQuests: [
      { title: "Follow visions of the tower", completed: false, details: "Dreams of a lanky black spire beckon Elio back to Emberfall." },
      { title: "Find the familiar figure",    completed: false, details: "A masked smile haunts his thoughts—ally or adversary?" },
      { title: "Discover the wizard's identity", completed: false, details: "Who cast that spell?", relatedQuests: ["Library Research"] },
      { title: "Uncover the ritual’s truth",   completed: false, details: "What was the ritual all abot?" }
    ]
  },
  {
    id: "quest-1",
    title: "The Memory Keeper",
    category: "Main Quest",
    summary: "Stopped a dragonborn ritual and rescued Draksha, but the mystery deepens.",
    reward: "Free night at Brisban's Inn; 100 gp (Garak)",
    relatedQuests: [],
    details: `
      <strong>Origin (Session 1):</strong><br>
      A wounded orc bursts into Brisban’s Inn. He introduced Garak Kha'zul and requested out help, 
      his tribe has been attacked and their Memory Keeper has been taken captive<br>
      <strong>Completed:</strong><br>
      We infiltrated the dragonborn cave, stopped the ritual, and rescued Draksha. As we stopped the ritual,
      we were shown a vision of a dragon, a flaming sword, and a tiger warrior.
      We also found an encrypted draconic scroll that we need to decode.<br>
    `,
    subQuests: [
      { title: "Infiltrate the dragonborn cave", completed: true,  details: "Find and infiltrate the dragonborn's stronghold" },
      { title: "Rescue Draksha", completed: true,  details: "Stop the ritual and free Draksha" },
      { title: "Escort the orcs to Saftey", completed: true,  details: "Help Garak and Draksha get to saftey." },
      { title: "Decode the three-part vision", completed: false, details: "Interpret the dragon, the flaming sword, and the tiger warrior." },
      { title: "Decode the encrypted draconic scroll", completed: false, details: "Translate and decode the draconic cipher to reveal hidden lore." }
    ]
  },
  {
    id: "quest-2",
    title: "The Blacksmit's Son",
    category: "Side Quest",
    summary: "Uncovered Parnell’s smuggling ring in Grimhold and discovered cryptic letters signed 'T.D.'",
    reward: "150 gp (Rusty); Weapon of choise (Rusty)",
    relatedQuests: [],
    details: `
      <strong>Origin (Sessions 2):</strong><br>
      Rusty, the blacksmith of Grimhold, asked for help finding his son, Thorn Reddale, who haven't been seen for days.
      
      <strong>Completed:</strong><br>
      You started your serach in Lady Luck’s Lair, a local casino. <br>
      There you uncovered Parnell Varen's smuggling ring.  
      Mysterious map of Fang’s Keep's breaches and a letter signed "T.D." point to a hidden patron pulling the strings.  
      You freed Thorn Reddale, tracked the remaining gand, defeated them, and interogated Tavon Graystone 'with' Captain Blackthorn.<br>
    `,
    subQuests: [
      { title: "Find Thorn", completed: true,  details: "Track Thorn Reddale." },
      { title: "Rescue Thorn from the mysterious gang", completed: true,  details: "Rescue Thorn from Parnell's gang."},
      { title: "Defeat the remaining gang members", completed: true,  details: "Clear any remaining gang members." },
      { title: "Get more informtaion", completed: true,  details: "Interogate the remaining gang members." , relatedQuests: ["The Mysterious T.D."] },
    ]
  },
  {
    id: "quest-3",
    title: "The Lights of Emberfall",
    category: "Side Quest",
    summary: "Use a borrowed trinket to trace arcane lights within Emberfall’s ancient ruins.",
    reward: "A magic trinket",
    relatedQuests: [],
    details: `
      <strong>Origin (Session 2):</strong><br>
      Frida & Funny, of Frinda & Funny's Funny Potions(?), saw some mystirious lights over some ruins in Emberfall.<br>
      They want you to investigate the lights and they gave you a small magical trinket to help with this.<br>
      Find out what the lights are and bring proof of it's source.
      
      <strong>Completed:</strong><br>
      After returning from the ruined tample in the deapths of Emberfall, we came back through the ruins.<br>
      There we found some strange fireflies that were flying from one of the houses in the ruined village.<br>
      In the house we found a golden necklace with some gems in it, and a diary inside a nearby chest.<br>
      The diary was of a woman who lived about 30 years ago. She described how her loved one was drafted into war and never returned.<br>
      The necklace was the only thing left of him. <br>
      She described how she can't keep living without him, and how she is going to end her life.<br>
      We followed the lights to a nearby well, where we found a hanging skeleton inside.<br>
      Then a wraith appeared and as Tazir was trying to talk to it, we attacked it.<br>
      After destroying the amulet. we defeated the wraith, she thanked us for freeing her, and her tear remained as she was fading.
    `,
    subQuests: [
      { title: "Investigate the mysterious lights", completed: true,  details: "Find the source of the lights" },
      { title: "Report back to Frida & Funny", completed: true, details: "Report back your findings to Frida & Funny." }
    ]
  },
  {
    id: "quest-4",
    title: "The Mysterious T.D.",
    category: "Main Quest",
    summary: "Uncover the identity and motives of the enigmatic 'T.D.' behind Grimhold’s smuggling ring.",
    reward: "Unknown",
    relatedQuests: ["The Blacksmit's Son"],
    details: `
      <strong>Origin (Sessions 2–5):</strong><br>
      While investigating Parnell’s smuggling ring, you discovered a hand-drawn map of Fang’s Keep’s secret breaches and intercepted letters signed “T.D.”  
      During Tavon Greystone’s interrogation, he admitted that T.D. is a powerful patron who communicates via hidden messages beneath a loose stone at The Bloody Blade.<br>
      <strong>Background:</strong><br>
      • The Fang’s Keep map shows hidden tunnels and breaches.<br>
      • T.D.’s letters threatening Parnel<br>
      • Tavon doesn’t know T.D.’s true name, only that a middleman retrieves and plants the messages.<br>
      <strong>Progress:</strong><br>
      You know where T.D.’s messages are hidden, but not who they serve or what they ultimately want.
    `,
    subQuests: [
      { title: "Search under the stone at The Bloody Blade", completed: false, details: "Recover any letters or tokens left by T.D." },
      { title: "Identify the intermediary",                 completed: false, details: "Discover who plants and collects the hidden messages." },
      { title: "Uncover T.D.'s identity",                   completed: false, details: "Determine T.D.'s true name and motives." },
    ]
  },

  {
    id: "quest-5",
    title: "Library Research",
    category: "Faction Quest",
    summary: "Delve into tomes to uncover elven magic and secret soul rituals.",
    reward: "Lore on Feywild rituals; clues to the Shadowfell",
    relatedQuests: ["The Tower and the Elf"],
    details: `
      <strong>Origin (Session 6):</strong><br>
      Tazir discovered rare tomes in Creston’s library. One text on Emberfall’s legends is missing pages.<br>
    `,
    subQuests: [
      { title: "Study Thornheart’s research", completed: false, details: "Examine ties between elves and the Feywild's magic." },
      { title: "Review Stormeye’s thesis",   completed: false, details: "Her Sylpharium project hints at fey rituals." },
      { title: "Investigate missing pages",  completed: false, details: "Determine who removed the manuscript’s crucial sections." }
    ]
  },

  {
    id: "quest-6",
    title: "The Emberwoven Shroud",
    category: "Main Quest",
    summary: "Retrieve the Emberwoven Shroud from Emberfall’s elemental temple and deliver it to your employer.",
    reward: "Meeting the mysterious employer; 300 gp",
    relatedQuests: [],
    details: `
      <strong>Origin (Sessions 6–7):</strong><br>
      A gold-lined stranger at The Bloody Blade paid you 300 gp as a start to fetch the Emberwoven Shroud.<br>

      <strong>Completed:</strong><br>
      You crossed the Scar, faced some walking trees and managed to find the temple of Sylira<br>
      After solving the elemental puzzle, you entered the temple and found a strange priest named Vhalgor, behind him the Emberwoven Shroud.<br>
      After defeating Vhalgor and escaping the collapsing temple, you started your way back to Grimhold.<br>
      Krystal seized the Shroud as the temple collapsed around you.<br>
      `,
    subQuests: [
      { title: "Travel to the forgotten temple",    completed: true, details: "Make your way in The Scar and find the forgotten temple of Sylira." },
      { title: "Retrieve the Emberwoven Shroud",    completed: true, details: "Retrieve the Emberwoven Shroud." },
      { title: "Deliver the Emberwoven Shroud",     completed: false, details: "Hand over the Shroud and receive your reward." }
    ]
  }
];
