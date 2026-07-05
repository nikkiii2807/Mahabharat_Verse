export interface Character {
  id: string;
  name: string;
  sanskritName: string;
  title: string;
  side: 'pandava' | 'kaurava' | 'neutral' | 'divine';
  role: string;
  bio: string;
  born: string;
  died: string;
  weapons: string[];
  allies: string[];
  enemies: string[];
  family: { relation: string; name: string }[];
  keyEvents: string[];
  quotes: string[];
  moralDilemma: string;
  color: string;
  symbol: string;
}

export const characters: Character[] = [
  {
    id: 'krishna',
    name: 'Krishna',
    sanskritName: 'कृष्ण',
    title: 'The Divine Charioteer',
    side: 'divine',
    role: 'Avatar of Vishnu, Charioteer of Arjuna, King of Dwarka',
    bio: 'Krishna, the eighth avatar of Lord Vishnu, is the supreme guide and philosopher of the Mahabharata. Born in a prison to Devaki and Vasudeva, he was secretly raised in Vrindavan. As the charioteer of Arjuna, he delivered the Bhagavad Gita on the battlefield of Kurukshetra, revealing the eternal truths of dharma, karma, and moksha. His wisdom, strategy, and divine love shaped the outcome of the great war.',
    born: 'Mathura, under Rohini Nakshatra',
    died: 'Prabhasa, after the Mausala Parva',
    weapons: ['Sudarshana Chakra', 'Kaumodaki (mace)', 'Saranga (bow)', 'Nandaka (sword)'],
    allies: ['Arjuna', 'Pandavas', 'Draupadi', 'Balarama', 'Satyaki'],
    enemies: ['Kamsa', 'Jarasandha', 'Duryodhana', 'Shishupala'],
    family: [
      { relation: 'Father', name: 'Vasudeva' },
      { relation: 'Mother', name: 'Devaki' },
      { relation: 'Foster Mother', name: 'Yashoda' },
      { relation: 'Brother', name: 'Balarama' },
      { relation: 'Wife', name: 'Rukmini' },
      { relation: 'Cousin', name: 'Arjuna' },
    ],
    keyEvents: [
      'Birth in Mathura prison',
      'Killing of Kamsa',
      'Lifting of Govardhan mountain',
      'Revelation of Vishwaroop to Arjuna',
      'Delivery of Bhagavad Gita',
      'Kurukshetra War strategy',
      'Death of Duryodhana',
    ],
    quotes: [
      'Whenever righteousness declines and unrighteousness rises, I manifest myself. — Bhagavad Gita 4.7',
      'You have the right to perform your actions, but you are not entitled to the fruits of the actions.',
      'The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being.',
    ],
    moralDilemma: 'Krishna, knowing the outcome, allowed events like Abhimanyu\'s death and Draupadi\'s insult to unfold for the greater dharmic order — raising the eternal question: does divine plan override human compassion?',
    color: '#1a6b8a',
    symbol: '🪈',
  },
  {
    id: 'arjuna',
    name: 'Arjuna',
    sanskritName: 'अर्जुन',
    title: 'The Peerless Archer',
    side: 'pandava',
    role: 'Third Pandava, Greatest archer, Hero of Kurukshetra',
    bio: 'Arjuna, the third son of Pandu and Kunti, fathered by Indra himself, is considered the greatest archer who ever lived. His mastery of the Gandiva bow was unparalleled. On the battlefield of Kurukshetra, his moral crisis led to the profound dialogue with Krishna — the Bhagavad Gita. His journey from doubt to divine purpose defines the spiritual core of the Mahabharata.',
    born: 'To Kunti, fathered by Indra',
    died: 'During the Mahaprasthanika Parva, ascending to heaven',
    weapons: ['Gandiva (bow)', 'Pashupatastra', 'Brahmastra', 'Varunastra', 'Agni astra'],
    allies: ['Krishna', 'Pandavas', 'Draupadi', 'Drupada', 'Virata'],
    enemies: ['Karna', 'Duryodhana', 'Bhishma (reluctantly)'],
    family: [
      { relation: 'Father', name: 'Pandu' },
      { relation: 'Divine Father', name: 'Indra' },
      { relation: 'Mother', name: 'Kunti' },
      { relation: 'Brothers', name: 'Yudhishthira, Bhima, Nakula, Sahadeva' },
      { relation: 'Wife', name: 'Draupadi, Subhadra, Ulupi, Chitrangada' },
      { relation: 'Son', name: 'Abhimanyu (from Subhadra), Iravan (from Ulupi)' },
    ],
    keyEvents: [
      'Winning Draupadi at Swayamvara',
      'Building Indraprastha',
      'Exile in forest',
      'Training under Drona',
      'Receiving Gandiva from Agni',
      'Receiving Pashupatastra from Shiva',
      'Battle of Kurukshetra — slaying Karna',
    ],
    quotes: [
      'I will not fight those who are my teachers and elders. — Arjuna to Krishna, before Gita',
      'O Krishna, I see my kinsmen arrayed for battle... My limbs fail and my mouth is parched.',
    ],
    moralDilemma: 'Arjuna\'s moment of crisis — refusing to fight his own kinsmen — represents the universal human conflict between personal love and social duty. His eventual decision to fight defines the Gita\'s teaching on dharma.',
    color: '#2563eb',
    symbol: '🏹',
  },
  {
    id: 'karna',
    name: 'Karna',
    sanskritName: 'कर्ण',
    title: 'The Tragic Hero',
    side: 'kaurava',
    role: 'King of Anga, Greatest rival of Arjuna, Son of Surya',
    bio: 'Karna, born of Kunti and Sun god Surya before her marriage, was abandoned at birth and raised by a charioteer. Despite possessing divine weapons, incomparable valor, and a heart of gold, he was repeatedly denied respect due to his low-born status. His loyalty to Duryodhana — the only one who gave him dignity — led him to fight against his own brothers, the Pandavas. Karna remains the most beloved tragic figure of the Mahabharata.',
    born: 'To Kunti, fathered by Surya (the Sun god)',
    died: 'Killed by Arjuna on Day 17 of Kurukshetra War',
    weapons: ['Vasavi Shakti (divine lance from Indra)', 'Nagastra', 'Brahmastra', 'Kavach and Kundal (divine armor, given away)'],
    allies: ['Duryodhana', 'Shakuni', 'Kripa', 'Ashwatthama'],
    enemies: ['Arjuna', 'Draupadi', 'Bhima'],
    family: [
      { relation: 'Mother', name: 'Kunti' },
      { relation: 'Divine Father', name: 'Surya (Sun god)' },
      { relation: 'Foster Father', name: 'Adhiratha' },
      { relation: 'Half-brothers', name: 'Pandavas (Yudhishthira, Bhima, Arjuna, Nakula, Sahadeva)' },
      { relation: 'Sons', name: 'Vrishasena, Sushena, Banasena' },
    ],
    keyEvents: [
      'Born with divine armor (Kavach-Kundala)',
      'Rejected at Drona\'s school for being a charioteer\'s son',
      'Made King of Anga by Duryodhana',
      'Donation of Kavach-Kundala to Indra',
      'Learning truth of his birth from Krishna',
      'Kunti\'s visit and his oath to spare four Pandavas',
      'Death by Arjuna during Kurukshetra',
    ],
    quotes: [
      'I will not break my friendship with Duryodhana, even if I lose heaven itself.',
      'I know who I am. The son of a charioteer they say, but I know I am the son of Surya.',
      'A friend who stands by you when the world turns against you — that is the truest gift.',
    ],
    moralDilemma: 'Karna knew the Pandavas were his brothers, yet chose loyalty to Duryodhana. Was he a man of dharma who kept friendship sacred, or a tragic figure trapped by circumstance and pride?',
    color: '#f59e0b',
    symbol: '☀️',
  },
  {
    id: 'bhishma',
    name: 'Bhishma',
    sanskritName: 'भीष्म',
    title: 'The Grandsire of Kurus',
    side: 'kaurava',
    role: 'Commander of Kaurava army, Son of Ganga, Oath-keeper',
    bio: 'Bhishma, born Devavrata to King Shantanu and the goddess Ganga, took the most terrible vow in history — to never marry and never claim the throne — so his father could wed Satyavati. This vow earned him the name Bhishma (one who has taken a terrible oath). He was a warrior of supreme skill, loyal to the throne of Hastinapur above all else, which forced him to fight for the Kauravas despite knowing Pandavas were righteous.',
    born: 'To King Shantanu and Goddess Ganga',
    died: 'Died on bed of arrows after Kurukshetra, had the boon to choose time of death',
    weapons: ['Brahmastra', 'Pashupatastra', 'Divine arrows', 'Unmatched archery'],
    allies: ['Hastinapur throne', 'Dronacharya', 'Kauravas'],
    enemies: ['Amba (who became Shikhandi)', 'Parashurama (his guru, in battle)'],
    family: [
      { relation: 'Father', name: 'King Shantanu' },
      { relation: 'Mother', name: 'Ganga (goddess)' },
      { relation: 'Half-brothers', name: 'Chitrangada, Vichitravirya' },
      { relation: 'Grand-nephews', name: 'Pandavas and Kauravas' },
    ],
    keyEvents: [
      'Terrible vow of celibacy (Bhishma Pratigya)',
      'Abduction of Amba, Ambika, Ambalika for Vichitravirya',
      'Battle with Parashurama (his guru)',
      'Teaching Yudhishthira on Shanti Parva on bed of arrows',
      'Fell on 10th day of Kurukshetra, pierced by Arjuna\'s arrows',
      'Died after the war, choosing his time of death',
    ],
    quotes: [
      'The throne of Hastinapur shall be protected. That is my dharma.',
      'A man\'s vow is his highest truth. Without it, he is nothing.',
    ],
    moralDilemma: 'Bhishma knew Duryodhana was unrighteous and the Pandavas deserved victory, yet he fought for the Kauravas out of loyalty to the throne. His loyalty to institution over justice remains the greatest moral paradox of the epic.',
    color: '#6366f1',
    symbol: '⚔️',
  },
  {
    id: 'drona',
    name: 'Dronacharya',
    sanskritName: 'द्रोणाचार्य',
    title: 'The Supreme Guru',
    side: 'kaurava',
    role: 'Royal preceptor of Kurus and Pandavas, Commander of Kaurava army',
    bio: 'Dronacharya, the supreme master of arms and warfare, was guru to both the Pandavas and Kauravas. His love for his son Ashwatthama was his greatest weakness. He was commander of the Kaurava forces after Bhishma fell, and was killed by Dhrishtadyumna after being deceived about Ashwatthama\'s death — a moment of great moral controversy.',
    born: 'Born from a pot (Drona = pot) from sage Bharadvaja',
    died: 'Killed by Dhrishtadyumna on Day 15 of Kurukshetra',
    weapons: ['Brahmastra', 'Divine archery', 'Pashupatastra'],
    allies: ['Ashwatthama', 'Bhishma', 'Karna', 'Kauravas'],
    enemies: ['Drupada (once friend, then enemy)', 'Dhrishtadyumna'],
    family: [
      { relation: 'Father', name: 'Sage Bharadvaja' },
      { relation: 'Wife', name: 'Kripi' },
      { relation: 'Son', name: 'Ashwatthama' },
    ],
    keyEvents: [
      'Denial of milk for infant Ashwatthama',
      'Becoming royal guru after Parashurama',
      'Demanding Ekalavya\'s thumb as Guru Dakshina',
      'Demanding Drupada\'s defeat from Pandavas',
      'Forming Chakravyuha to trap Abhimanyu',
      'Death upon hearing false news of Ashwatthama',
    ],
    quotes: [
      'Archery is not just about the arrow. It is about the mind behind it.',
      'The greatest weapon a warrior can possess is focus.',
    ],
    moralDilemma: 'Drona\'s demanding Ekalavya\'s thumb to protect Arjuna\'s supremacy, and his role in killing Abhimanyu through Chakravyuha, question whether a guru\'s favoritism can ever be justified.',
    color: '#7c3aed',
    symbol: '🎯',
  },
  {
    id: 'yudhishthira',
    name: 'Yudhishthira',
    sanskritName: 'युधिष्ठिर',
    title: 'The Dharmaraj',
    side: 'pandava',
    role: 'Eldest Pandava, Emperor of Indraprastha, Son of Yama',
    bio: 'Yudhishthira, eldest of the Pandavas, fathered by Dharma (the god of justice) himself, was the embodiment of truth and righteousness. Yet it was his fateful decision to stake Draupadi in the dice game that brought the greatest catastrophe upon the Pandavas. His reign at Indraprastha was golden, and after the war, he ruled Hastinapur with wisdom and grief.',
    born: 'To Kunti, fathered by Yama (god of Dharma)',
    died: 'Ascended to heaven during Mahaprasthanika Parva',
    weapons: ['Spear', 'Sword'],
    allies: ['Pandavas', 'Krishna', 'Draupadi', 'Virata', 'Drupada'],
    enemies: ['Duryodhana', 'Shakuni'],
    family: [
      { relation: 'Father', name: 'Pandu' },
      { relation: 'Divine Father', name: 'Yama (Dharma)' },
      { relation: 'Mother', name: 'Kunti' },
      { relation: 'Brothers', name: 'Bhima, Arjuna, Nakula, Sahadeva' },
      { relation: 'Wife', name: 'Draupadi, Devika' },
      { relation: 'Son', name: 'Prativindhya (from Draupadi)' },
    ],
    keyEvents: [
      'Indraprastha coronation and golden rule',
      'Rajasuya Yajna',
      'Dice game — losing everything including Draupadi',
      '13 years of exile',
      'Virata Parva incognito',
      'Peace negotiations with Duryodhana',
      'Coronation after Kurukshetra War',
    ],
    quotes: [
      'Truth is the highest duty. I shall not waver from it.',
      'A king who rules through dharma never truly falls.',
    ],
    moralDilemma: 'Yudhishthira, the man of dharma, gambled away his wife Draupadi — perhaps the single most debated moral failure in the epic. Did gambling addiction override his righteousness?',
    color: '#10b981',
    symbol: '⚖️',
  },
  {
    id: 'bhima',
    name: 'Bhima',
    sanskritName: 'भीम',
    title: 'The Mighty Pandava',
    side: 'pandava',
    role: 'Second Pandava, Son of Vayu, Mace warrior',
    bio: 'Bhima, born of Kunti and Vayu (god of wind), was the mightiest warrior of the Mahabharata. His strength was immeasurable — he killed a hundred Kauravas including Duryodhana in the final mace battle. His devotion to protecting Draupadi and his brothers was absolute. He kept every vow he made — including killing Dushasana and breaking Duryodhana\'s thigh.',
    born: 'To Kunti, fathered by Vayu (Wind god)',
    died: 'Fell during Mahaprasthanika Parva',
    weapons: ['Kaumodaki (mace)', 'Bare hands', 'Sword'],
    allies: ['Pandavas', 'Krishna', 'Draupadi', 'Ghatotkacha'],
    enemies: ['Duryodhana', 'Dushasana', 'Kichaka'],
    family: [
      { relation: 'Father', name: 'Pandu' },
      { relation: 'Divine Father', name: 'Vayu (Wind god)' },
      { relation: 'Mother', name: 'Kunti' },
      { relation: 'Brothers', name: 'Yudhishthira, Arjuna, Nakula, Sahadeva' },
      { relation: 'Wife', name: 'Draupadi, Hidimbi' },
      { relation: 'Son', name: 'Ghatotkacha (from Hidimbi), Sutasoma' },
    ],
    keyEvents: [
      'Poisoning by Duryodhana — rescued by Nagas',
      'Killing of Bakasura',
      'Killing of Jarasandha',
      'Killing of Kichaka during Virata Parva',
      'Killing Dushasana and drinking his blood',
      'Killing of Duryodhana in the final mace battle',
    ],
    quotes: [
      'I have sworn to break Duryodhana\'s thigh and drink Dushasana\'s blood. I shall keep my vow.',
      'My arms are my bow, my fists my arrows.',
    ],
    moralDilemma: 'Bhima\'s striking Duryodhana below the waist (against the rules of mace combat) raises the question: is it just to use adharma to defeat adharma?',
    color: '#ef4444',
    symbol: '🔱',
  },
  {
    id: 'draupadi',
    name: 'Draupadi',
    sanskritName: 'द्रौपदी',
    title: 'The Empress of Indraprastha',
    side: 'pandava',
    role: 'Queen of Pandavas, Daughter of King Drupada, Born from fire',
    bio: 'Draupadi (also Krishnaa or Panchali), born from a sacred fire altar, was the most beautiful and intelligent woman of her age. Her marriage to all five Pandavas was ordained by fate. Her humiliation in the Kuru court — when Dushasana attempted to disrobe her — became the central cause of the Kurukshetra War. Her rage, dignity, and demand for justice drove the Mahabharata to its inevitable conclusion.',
    born: 'Born from fire altar of King Drupada of Panchala',
    died: 'Fell first during Mahaprasthanika Parva',
    weapons: ['Her voice', 'Her dignity', 'Krishna\'s divine protection'],
    allies: ['Krishna', 'Pandavas', 'Drupada', 'Dhrishtadyumna'],
    enemies: ['Duryodhana', 'Dushasana', 'Karna', 'Shakuni'],
    family: [
      { relation: 'Father', name: 'King Drupada' },
      { relation: 'Brother', name: 'Dhrishtadyumna' },
      { relation: 'Husbands', name: 'Yudhishthira, Bhima, Arjuna, Nakula, Sahadeva' },
      { relation: 'Sons', name: 'Five Upapandavas (one from each husband)' },
    ],
    keyEvents: [
      'Swayamvara — Arjuna wins her with his archery',
      'Marriage to all five Pandavas',
      'Life at Indraprastha',
      'Disrobing in Kuru court — Krishna\'s divine protection',
      '12 years of forest exile',
      'Incognito year at Virata',
      'All five sons killed by Ashwatthama at war\'s end',
    ],
    quotes: [
      'The court that watches a woman\'s honor be violated and stays silent has no dharma.',
      'Krishna, only you know my pain. Only you can be my refuge.',
    ],
    moralDilemma: 'Draupadi\'s question in the Kuru court — "Was Yudhishthira himself not already lost before he staked me?" — remains one of the most powerful legal and moral challenges in all literature.',
    color: '#ec4899',
    symbol: '🔥',
  },
  {
    id: 'duryodhana',
    name: 'Duryodhana',
    sanskritName: 'दुर्योधन',
    title: 'The Kaurava Prince',
    side: 'kaurava',
    role: 'Leader of Kauravas, Son of Dhritarashtra and Gandhari, King of Hastinapur',
    bio: 'Duryodhana, eldest of the hundred Kauravas, was a complex figure — not simply a villain, but a proud, ambitious prince who felt the Pandavas had stolen his birthright. He was a master of mace warfare, a loyal friend to Karna (when the world scorned him), and a devoted son. His refusal to give the Pandavas even five villages triggered the Kurukshetra War.',
    born: 'First of hundred sons born to Dhritarashtra and Gandhari',
    died: 'Killed by Bhima on Day 18 of Kurukshetra War',
    weapons: ['Mace (Gada) — supreme master', 'Sword', 'Bow'],
    allies: ['Karna', 'Shakuni', 'Dushasana', 'Ashwatthama', 'Drona', 'Bhishma'],
    enemies: ['Pandavas', 'Krishna', 'Draupadi'],
    family: [
      { relation: 'Father', name: 'Dhritarashtra' },
      { relation: 'Mother', name: 'Gandhari' },
      { relation: 'Brothers', name: '99 Kauravas including Dushasana' },
      { relation: 'Wife', name: 'Bhanumati' },
      { relation: 'Son', name: 'Lakshmana' },
    ],
    keyEvents: [
      'Jealousy of Pandavas at Indraprastha',
      'Scheming the dice game with Shakuni',
      'Refusing Pandavas five villages for peace',
      'Laughing at Draupadi\'s disrobing',
      'Rejecting Krishna\'s peace mission',
      'Final mace battle with Bhima',
    ],
    quotes: [
      'I will not give the Pandavas land enough to fit a needle\'s point.',
      'I know my actions may not be dharma, but I cannot bow to those who humiliated me.',
    ],
    moralDilemma: 'Duryodhana\'s loyalty to Karna and his refusal to bow despite knowing he would lose raises a profound question: is stubborn pride a vice or a virtue of nobility?',
    color: '#dc2626',
    symbol: '👑',
  },
  {
    id: 'shakuni',
    name: 'Shakuni',
    sanskritName: 'शकुनि',
    title: 'The Master Manipulator',
    side: 'kaurava',
    role: 'Prince of Gandhara, Uncle of Kauravas, Master of dice',
    bio: 'Shakuni, prince of Gandhara and uncle to Duryodhana through Gandhari, was the architect of the Pandavas\' downfall through the dice game. His motivations were rooted in vengeance against the Kuru dynasty for the humiliation of his father and the imprisonment of his family. A supreme strategist and dice master, he manipulated events from the shadows to engineer the great war.',
    born: 'Prince of Gandhara kingdom',
    died: 'Killed by Sahadeva on Day 18 of Kurukshetra War',
    weapons: ['Loaded dice made from his father\'s bones', 'Cunning and manipulation'],
    allies: ['Duryodhana', 'Dushasana', 'Kauravas'],
    enemies: ['Pandavas', 'Vidura', 'Krishna'],
    family: [
      { relation: 'Father', name: 'King Subala of Gandhara' },
      { relation: 'Sister', name: 'Gandhari' },
      { relation: 'Nephew', name: 'Duryodhana' },
    ],
    keyEvents: [
      'Imprisonment of Gandhari\'s family by Hastinapur',
      'Vow of revenge against Kuru dynasty',
      'Engineering the Dice Game',
      'Orchestrating Lakshagriha (house of wax) conspiracy',
      'Advising Duryodhana against peace',
      'Death at Sahadeva\'s hands',
    ],
    quotes: [
      'The best weapon against a just man is injustice done so cleverly he cannot name it.',
      'I do not play to win. I play so that others lose everything.',
    ],
    moralDilemma: 'Was Shakuni a villain or a man driven by righteous revenge for his family\'s humiliation? His methods were adharmic, but his cause was personal justice.',
    color: '#78350f',
    symbol: '🎲',
  },
  {
    id: 'ashwatthama',
    name: 'Ashwatthama',
    sanskritName: 'अश्वत्थामा',
    title: 'The Immortal Warrior',
    side: 'kaurava',
    role: 'Son of Drona, Cursed to immortality, Last Kaurava general',
    bio: 'Ashwatthama, son of Dronacharya, was born with a gem in his forehead that protected him from hunger, thirst, and danger. One of the most powerful warriors of the Mahabharata, he became a vessel of destructive rage after his father\'s treacherous death. His night raid on the Pandava camp and use of the Brahmastra against Uttara\'s womb led to his greatest sin — and his eternal curse.',
    born: 'To Dronacharya and Kripi, born with divine gem (mani) in forehead',
    died: 'Never died — cursed to wander in misery for 3000 years',
    weapons: ['Brahmastra', 'Narayanastra', 'Divine bow', 'Sword', 'Gem in forehead'],
    allies: ['Drona', 'Duryodhana', 'Kauravas'],
    enemies: ['Pandavas', 'Krishna', 'Dhrishtadyumna'],
    family: [
      { relation: 'Father', name: 'Dronacharya' },
      { relation: 'Mother', name: 'Kripi' },
    ],
    keyEvents: [
      'Night raid — killing sleeping Upapandavas (Draupadi\'s sons)',
      'Firing Brahmastra at Uttara\'s womb (Parikshit)',
      'Krishna\'s curse: gem removed, doomed to immortal suffering',
      'Father Drona\'s death by deception',
      'Death of Dhrishtadyumna',
    ],
    quotes: [
      'You killed my father through deception. I will not rest until I have taken my revenge.',
      'I am cursed to live. That is a worse punishment than death.',
    ],
    moralDilemma: 'Ashwatthama\'s burning rage at his father\'s death and his subsequent atrocities raises the question: can grief justify the destruction of the innocent? His eternal curse suggests the cosmos said no.',
    color: '#374151',
    symbol: '💎',
  },
  {
    id: 'kunti',
    name: 'Kunti',
    sanskritName: 'कुन्ती',
    title: 'The Mother of Pandavas',
    side: 'pandava',
    role: 'Princess of Kunti, Queen of Hastinapur, Mother of Pandavas',
    bio: 'Kunti, born Pritha, was adopted by her childless uncle Kuntibhoja. She received a boon from sage Durvasa to invoke any god and bear his child. She tested the boon and had Karna before marriage — a secret she carried forever. After Pandu\'s curse, she invoked gods to give birth to the three eldest Pandavas. Her choices, secrets, and silences shaped the entire Mahabharata.',
    born: 'Princess Pritha, daughter of Shurasena, adopted by Kuntibhoja',
    died: 'Died in a forest fire during pilgrimage after the war',
    weapons: ['Durvasa\'s boon to invoke gods', 'Her wisdom and resilience'],
    allies: ['Pandavas', 'Krishna', 'Vidura'],
    enemies: ['Kauravas'],
    family: [
      { relation: 'Husband', name: 'Pandu' },
      { relation: 'Sons', name: 'Karna (secret), Yudhishthira, Bhima, Arjuna' },
      { relation: 'Daughter-in-law', name: 'Draupadi' },
      { relation: 'Nephew', name: 'Krishna' },
    ],
    keyEvents: [
      'Testing boon — birth of Karna, abandonment at birth',
      'Marriage to Pandu',
      'Invoking Yama, Vayu, Indra for three Pandavas',
      'Widowhood after Pandu\'s death',
      'Life in Hastinapur under Dhritarashtra',
      'Visiting Karna before war — her revelation and his oath',
    ],
    quotes: [
      'My heart has always known Karna was my son. And that secret has been my greatest punishment.',
      'A mother cannot choose which son lives. That is why the gods made this war, not me.',
    ],
    moralDilemma: 'Kunti abandoned Karna at birth, kept his identity secret for decades, and visited him only when she needed him to spare her other sons. Her maternal love and moral failure are inseparable.',
    color: '#a78bfa',
    symbol: '🌸',
  },
  {
    id: 'gandhari',
    name: 'Gandhari',
    sanskritName: 'गान्धारी',
    title: 'The Blindfolded Queen',
    side: 'kaurava',
    role: 'Queen of Hastinapur, Mother of Kauravas, Princess of Gandhara',
    bio: 'Gandhari, princess of Gandhara, chose to blindfold herself permanently upon learning her husband Dhritarashtra was blind — so she could share in his experience. This act of ultimate devotion is also read as willful ignorance: she never saw her sons\' faults. Her unbounded grief after the war — and her curse upon Krishna — make her one of the most powerful tragic figures.',
    born: 'Princess of Gandhara, daughter of King Subala',
    died: 'Died in a forest fire during pilgrimage',
    weapons: ['Her divine sight (unleashed once)', 'Her blessings and curses'],
    allies: ['Dhritarashtra', 'Kauravas', 'Kunti (sisterly bond in grief)'],
    enemies: ['None — but blamed Krishna for the war'],
    family: [
      { relation: 'Husband', name: 'Dhritarashtra' },
      { relation: 'Brother', name: 'Shakuni' },
      { relation: 'Sons', name: '100 Kauravas including Duryodhana' },
      { relation: 'Daughter', name: 'Duhshala' },
    ],
    keyEvents: [
      'Choosing to blindfold herself at marriage',
      'Birth of hundred sons from iron ball divided by Vyasa',
      'Failed attempt to give Duryodhana an armor body',
      'Witnessing all her sons die',
      'Cursing Krishna after the war',
    ],
    quotes: [
      'I gave up my sight for my husband. I never gave up my love for my sons.',
      'Krishna — you who had the power to stop this war — you shall see your own clan destroyed.',
    ],
    moralDilemma: 'Gandhari\'s blindfold is both literal and metaphorical — her willful refusal to see and correct her sons\' adharma makes her complicit in the war. Yet her devotion is absolute. Was she a saint or an enabler?',
    color: '#9ca3af',
    symbol: '🏛️',
  },
  {
    id: 'abhimanyu',
    name: 'Abhimanyu',
    sanskritName: 'अभिमन्यु',
    title: 'The Brave Prince',
    side: 'pandava',
    role: 'Son of Arjuna and Subhadra, Hero of Chakravyuha',
    bio: 'Abhimanyu, son of Arjuna and Subhadra (Krishna\'s sister), was a warrior of extraordinary valor. He learned how to enter the Chakravyuha military formation while in his mother\'s womb — but the knowledge of how to exit was never completed. On Day 13 of the Kurukshetra War, he was surrounded and killed by multiple warriors simultaneously — an act that violated all rules of honorable combat.',
    born: 'To Arjuna and Subhadra',
    died: 'Killed by multiple warriors on Day 13 of Kurukshetra War at age 16',
    weapons: ['Gandiva (bow)', 'Sword', 'Chariot wheel (in last stand)', 'Supreme valor'],
    allies: ['Pandavas', 'Draupadi', 'Krishna'],
    enemies: ['Kauravas', 'Drona (tactically)', 'Karna'],
    family: [
      { relation: 'Father', name: 'Arjuna' },
      { relation: 'Mother', name: 'Subhadra' },
      { relation: 'Uncle', name: 'Krishna' },
      { relation: 'Wife', name: 'Uttara' },
      { relation: 'Son', name: 'Parikshit (born after his death, saved by Krishna)' },
    ],
    keyEvents: [
      'Learning Chakravyuha entry in the womb',
      'Entering Chakravyuha alone on Day 13',
      'Fighting all Kaurava maharathis simultaneously',
      'Last stand with a chariot wheel',
      'Death by multiple warriors — war\'s most controversial moment',
    ],
    quotes: [
      'I know how to enter the formation. I do not know how to exit. But I will enter.',
      'A warrior who does not fight when called is not worthy of the name.',
    ],
    moralDilemma: 'Abhimanyu\'s death — surrounded by six great warriors who violated single-combat rules — remains the Mahabharata\'s most agonizing moment. His sacrifice reframed the war as one where dharma itself had collapsed.',
    color: '#f97316',
    symbol: '⚡',
  },
];

export const getCharacterById = (id: string) => characters.find(c => c.id === id);

export const getRelationships = () => {
  const nodes = characters.map(c => ({ id: c.id, name: c.name, side: c.side, color: c.color, symbol: c.symbol }));
  const links: { source: string; target: string; type: string }[] = [];

  const addLink = (source: string, target: string, type: string) => {
    if (characters.find(c => c.id === source) && characters.find(c => c.id === target)) {
      links.push({ source, target, type });
    }
  };

  // Key relationships
  addLink('krishna', 'arjuna', 'divine_bond');
  addLink('krishna', 'draupadi', 'divine_bond');
  addLink('krishna', 'duryodhana', 'conflict');
  addLink('arjuna', 'karna', 'rivalry');
  addLink('arjuna', 'draupadi', 'marriage');
  addLink('arjuna', 'abhimanyu', 'parent');
  addLink('karna', 'duryodhana', 'friendship');
  addLink('karna', 'kunti', 'family');
  addLink('karna', 'bhishma', 'rivalry');
  addLink('bhishma', 'drona', 'alliance');
  addLink('drona', 'ashwatthama', 'parent');
  addLink('drona', 'arjuna', 'guru');
  addLink('drona', 'duryodhana', 'alliance');
  addLink('yudhishthira', 'draupadi', 'marriage');
  addLink('bhima', 'draupadi', 'marriage');
  addLink('yudhishthira', 'duryodhana', 'conflict');
  addLink('bhima', 'duryodhana', 'conflict');
  addLink('duryodhana', 'shakuni', 'alliance');
  addLink('duryodhana', 'gandhari', 'family');
  addLink('gandhari', 'shakuni', 'family');
  addLink('kunti', 'yudhishthira', 'family');
  addLink('kunti', 'bhima', 'family');
  addLink('kunti', 'arjuna', 'family');
  addLink('abhimanyu', 'krishna', 'family');
  addLink('ashwatthama', 'draupadi', 'conflict');

  return { nodes, links };
};
