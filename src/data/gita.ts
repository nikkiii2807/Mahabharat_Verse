export interface GitaChapter {
  number: number;
  sanskritName: string;
  transliteration: string;
  englishName: string;
  verses: number;
  summary: string;
  teachings: string[];
  openingVerse: {
    sanskrit: string;
    transliteration: string;
    translation: string;
    commentary: string;
  };
  lifeApplication: string;
  theme: string;
  color: string;
}

export const gitaChapters: GitaChapter[] = [
  {
    number: 1,
    sanskritName: 'अर्जुनविषादयोग',
    transliteration: 'Arjuna Vishāda Yoga',
    englishName: 'The Yoga of Arjuna\'s Grief',
    verses: 47,
    summary: 'On the battlefield of Kurukshetra, Arjuna surveys the opposing armies and sees his kinsmen, teachers, and beloved ones ready to fight. Overwhelmed by grief and compassion, he drops his bow and refuses to fight, his resolve shaken by the thought of killing his own family.',
    teachings: ['The conflict between duty and personal emotion', 'The nature of grief and despondency', 'Setting the stage for divine wisdom', 'The battle within before the battle without'],
    openingVerse: {
      sanskrit: 'धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||',
      transliteration: 'dhṛtarāṣṭra uvāca | dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ | māmakāḥ pāṇḍavāś caiva kim akurvata sañjaya',
      translation: 'Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?',
      commentary: 'The opening verse immediately establishes the sacred geography — Kurukshetra (field of the Kurus) is also Dharmakshetra (field of dharma). This is not merely a battlefield but a cosmic arena where dharma itself will be decided.'
    },
    lifeApplication: 'When we face life\'s most difficult decisions — involving loved ones, duty, and moral ambiguity — we often experience our own "Arjuna\'s grief." The Gita teaches us to face this paralysis with clarity rather than avoidance.',
    theme: 'Grief & Paralysis',
    color: '#1e3a5f'
  },
  {
    number: 2,
    sanskritName: 'सांख्ययोग',
    transliteration: 'Sānkhya Yoga',
    englishName: 'The Yoga of Knowledge',
    verses: 72,
    summary: 'Krishna begins his teaching by revealing the eternal, indestructible nature of the soul (Atman). The body dies but the soul is eternal. He introduces the concept of Sthitaprajna (steady wisdom) and urges Arjuna to rise above grief by understanding true nature of existence.',
    teachings: ['The immortality of the soul (Atman)', 'The Sthitaprajna — one of steady wisdom', 'Action without attachment to results', 'The nature of the eternal versus the temporal'],
    openingVerse: {
      sanskrit: 'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः | न चैनं क्लेदयन्त्यापो न शोषयति मारुतः ||',
      transliteration: 'nainaṁ chindanti śastrāṇi nainaṁ dahati pāvakaḥ | na cainaṁ kledayanty āpo na śoṣayati mārutaḥ',
      translation: 'The soul can never be cut into pieces by any weapon, nor can it be burned by fire, nor moistened by water, nor withered by the wind.',
      commentary: 'This verse contains one of the most powerful declarations in all human philosophy — the absolute indestructibility of consciousness. Fire, water, wind, weapons — none can touch the soul. This is the foundation of all fearlessness.'
    },
    lifeApplication: 'Understanding that your true self — consciousness itself — cannot be destroyed, you can face life\'s challenges, including loss and death, with equanimity. You are not the role you play, not the body you inhabit.',
    theme: 'Soul & Immortality',
    color: '#1a4a6e'
  },
  {
    number: 3,
    sanskritName: 'कर्मयोग',
    transliteration: 'Karma Yoga',
    englishName: 'The Yoga of Action',
    verses: 43,
    summary: 'Krishna teaches the path of Karma Yoga — selfless action without attachment to results. Action is unavoidable; even inaction is a form of action. The secret is to act without ego, dedicating all actions to the Divine.',
    teachings: ['Act without attachment to outcomes', 'The cycle of sacrifice and cosmic order', 'Selfless service (Nishkama Karma)', 'Why action is superior to inaction'],
    openingVerse: {
      sanskrit: 'नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः | शरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः ||',
      transliteration: 'niyataṁ kuru karma tvaṁ karma jyāyo hy akarmaṇaḥ | śarīra-yātrāpi ca te na prasiddhyed akarmaṇaḥ',
      translation: 'Do your prescribed duty, for action is better than inaction. A man cannot even maintain his physical body without work.',
      commentary: 'This verse is the foundation of Karma Yoga. We cannot escape action — even maintaining the body requires it. The question is not whether to act, but how: with attachment or with wisdom.'
    },
    lifeApplication: 'Focus on the quality of your work and effort, not on rewards, recognition, or results. This detachment paradoxically leads to better work and inner peace.',
    theme: 'Selfless Action',
    color: '#7c2d12'
  },
  {
    number: 4,
    sanskritName: 'ज्ञानकर्मसन्न्यासयोग',
    transliteration: 'Jñāna Karma Sannyāsa Yoga',
    englishName: 'The Yoga of Renunciation of Action in Knowledge',
    verses: 42,
    summary: 'Krishna reveals his divine nature and the mystery of his repeated incarnations. He declares: whenever dharma declines and adharma rises, he incarnates. He also explains how knowledge purifies action and how wisdom surpasses ritualistic sacrifice.',
    teachings: ['Divine incarnation (Avatar theory)', 'Knowledge as the highest purifier', 'The four varnas and cosmic order', 'Transcendence through wisdom'],
    openingVerse: {
      sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत | अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||',
      transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham',
      translation: 'Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth.',
      commentary: 'One of the most famous verses of the Gita. The Divine is not absent — it responds to human crisis. When darkness overwhelms, the light returns. This is not passive hope but cosmic law.'
    },
    lifeApplication: 'Understand that knowledge — true knowledge of the self — transforms all actions. Acting from wisdom rather than ignorance purifies outcomes and removes the chains of karma.',
    theme: 'Divine Incarnation & Knowledge',
    color: '#166534'
  },
  {
    number: 5,
    sanskritName: 'कर्मसन्न्यासयोग',
    transliteration: 'Karma Sannyāsa Yoga',
    englishName: 'The Yoga of Renunciation',
    verses: 29,
    summary: 'Krishna reconciles the apparent conflict between action (Karma Yoga) and renunciation (Sannyasa). True renunciation is not abandoning actions but abandoning the ego\'s ownership of them. The wise man acts fully but remains unattached to results.',
    teachings: ['Both paths (action and renunciation) lead to the same goal', 'The renunciation of ego, not action', 'Equanimity in pleasure and pain', 'Brahman — the eternal ground of being'],
    openingVerse: {
      sanskrit: 'सन्न्यासः कर्मयोगश्च निःश्रेयसकरावुभौ | तयोस्तु कर्मसन्न्यासात्कर्मयोगो विशिष्यते ||',
      transliteration: 'sannyāsaḥ karma-yogaś ca niḥśreyasa-karāv ubhau | tayos tu karma-sannyāsāt karma-yogo viśiṣyate',
      translation: 'Both renunciation of action and the yoga of action lead to the supreme destination. But of the two, action in devotion is better than renunciation of action.',
      commentary: 'For most people in the world, engaged action with wisdom is more practical and more powerful than withdrawal. The householder who acts with detachment is more advanced than the hermit who has merely fled.'
    },
    lifeApplication: 'You need not become a monk to find peace. Act in the world fully — with your whole heart — but release attachment to the outcome. Work is worship when done with this spirit.',
    theme: 'True Renunciation',
    color: '#92400e'
  },
  {
    number: 6,
    sanskritName: 'ध्यानयोग',
    transliteration: 'Dhyāna Yoga',
    englishName: 'The Yoga of Meditation',
    verses: 47,
    summary: 'Krishna teaches the detailed practice of Raja Yoga — meditation, control of the mind, and the path to Samadhi. He describes the proper posture, environment, and mental discipline for meditation. He also addresses Arjuna\'s concern about the restless mind.',
    teachings: ['Practical meditation instruction', 'The restless mind and how to tame it', 'The yogi who masters the mind', 'Union with the Supreme through meditation'],
    openingVerse: {
      sanskrit: 'अनाश्रितः कर्मफलं कार्यं कर्म करोति यः | स सन्न्यासी च योगी च न निरग्निर्न चाक्रियः ||',
      transliteration: 'anāśritaḥ karma-phalaṁ kāryaṁ karma karoti yaḥ | sa sannyāsī ca yogī ca na niragnir na cākriyaḥ',
      translation: 'One who performs his duty without attachment, surrendering the results unto the Supreme Lord, is unaffected by sinful action, as the lotus leaf is untouched by water.',
      commentary: 'The lotus metaphor is perfect — it lives in water, needs water, yet its leaves repel water completely. The yogi lives in the world, acts in the world, but is untouched by it.'
    },
    lifeApplication: 'A daily meditation practice — even 15 minutes — rewires the mind. The Gita\'s prescription: consistent effort, a regular time and place, neither too harsh nor too lax in discipline.',
    theme: 'Meditation & Mind Control',
    color: '#1e1b4b'
  },
  {
    number: 7,
    sanskritName: 'ज्ञानविज्ञानयोग',
    transliteration: 'Jñāna Vijñāna Yoga',
    englishName: 'The Yoga of Knowledge and Wisdom',
    verses: 30,
    summary: 'Krishna reveals his two natures — the lower material nature (Prakriti) of eight elements, and his higher spiritual nature that sustains the universe. He describes the four types of people who approach the Divine and how Maya (illusion) conceals this truth from most.',
    teachings: ['The two natures of the Divine — material and spiritual', 'Maya — the divine illusion', 'Four types of devotees', 'The Divine as the source of all'],
    openingVerse: {
      sanskrit: 'मनुष्याणां सहस्रेषु कश्चिद्यतति सिद्धये | यततामपि सिद्धानां कश्चिन्मां वेत्ति तत्त्वतः ||',
      transliteration: 'manuṣyāṇāṁ sahasreṣu kaścid yatati siddhaye | yatatām api siddhānāṁ kaścin māṁ vetti tattvataḥ',
      translation: 'Out of many thousands among men, one may endeavor for perfection, and of those who have achieved perfection, hardly one knows Me in truth.',
      commentary: 'This sobering verse reminds us of the rarity of genuine spiritual seekers — and rarer still, those who truly understand. It is not discouraging but clarifying: true wisdom is precious precisely because it is rare.'
    },
    lifeApplication: 'Most people seek the Divine for relief from suffering, for gain, or out of curiosity. The Gita asks: can you seek the Divine purely, for its own sake? That is the highest form of devotion.',
    theme: 'Divine Nature & Maya',
    color: '#312e81'
  },
  {
    number: 8,
    sanskritName: 'अक्षरब्रह्मयोग',
    transliteration: 'Akṣara Brahma Yoga',
    englishName: 'The Yoga of the Imperishable Brahman',
    verses: 28,
    summary: 'Krishna explains the nature of Brahman (Supreme Absolute), Atman (individual soul), karma, and the cycle of birth and death. He reveals the sacred teaching: whatever one remembers at the moment of death, that is what one attains.',
    teachings: ['The imperishable Brahman', 'Death and the moment of transition', 'The cycles of cosmic time (Yugas)', 'Two paths after death — the path of light and the path of darkness'],
    openingVerse: {
      sanskrit: 'अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् | यः प्रयाति स मद्भावं याति नास्त्यत्र संशयः ||',
      transliteration: 'anta-kāle ca mām eva smaran muktvā kalevaram | yaḥ prayāti sa mad-bhāvaṁ yāti nāsty atra saṁśayaḥ',
      translation: 'Whoever, at the time of death, gives up the body remembering Me alone, reaches My state. Of this there is no doubt.',
      commentary: 'This verse transformed how Hindus approach death. The final thought is the culmination of a lifetime of cultivation. One cannot fake it at the end — it must be the natural overflow of a life spent in devotion.'
    },
    lifeApplication: 'Your final thought at death will be the thought you practiced most in life. So practice now. The question "what do I want to remember at death?" is the most clarifying question for how to live.',
    theme: 'Death, Rebirth & Brahman',
    color: '#0f172a'
  },
  {
    number: 9,
    sanskritName: 'राजविद्याराजगुह्ययोग',
    transliteration: 'Rāja Vidyā Rāja Guhya Yoga',
    englishName: 'The Yoga of Royal Knowledge and Royal Secret',
    verses: 34,
    summary: 'Krishna reveals the "royal secret" — the highest and most confidential knowledge: that he pervades the entire universe, all beings rest in him, yet he is not limited by them. He teaches unconditional devotion (Bhakti) as the supreme path available to all.',
    teachings: ['The royal secret — the supreme truth', 'Bhakti (devotion) as the highest path', 'All paths ultimately lead to the Divine', 'The Divine accepts even a simple offering with love'],
    openingVerse: {
      sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति | तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ||',
      transliteration: 'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati | tad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ',
      translation: 'If one offers Me with love and devotion a leaf, a flower, fruit or water, I will accept it.',
      commentary: 'Perhaps the most beloved verse in all the Gita. Wealth, power, ritual perfection — none of this is required. A leaf offered with pure love is received by the Divine with full joy. Devotion levels all hierarchies.'
    },
    lifeApplication: 'You need not be rich, educated, or ritually perfect to connect with the Divine. Any sincere act of love — cooking, serving, working — becomes sacred when offered with devotion.',
    theme: 'Bhakti & Royal Secret',
    color: '#4c1d95'
  },
  {
    number: 10,
    sanskritName: 'विभूतियोग',
    transliteration: 'Vibhūti Yoga',
    englishName: 'The Yoga of Divine Glories',
    verses: 42,
    summary: 'Krishna enumerates his divine manifestations (Vibhutis) — he is the Himalaya among mountains, the Ganga among rivers, Arjuna among Pandavas, the lion among beasts. Wherever there is excellence, power, beauty, and brilliance — that is a spark of the Divine.',
    teachings: ['The Divine expressed in excellence', 'Recognizing the sacred in the extraordinary', 'The infinite nature of divine expression', 'All greatness is a fraction of divine glory'],
    openingVerse: {
      sanskrit: 'अहमात्मा गुडाकेश सर्वभूताशयस्थितः | अहमादिश्च मध्यं च भूतानामन्त एव च ||',
      transliteration: 'aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ | aham ādiś ca madhyaṁ ca bhūtānām anta eva ca',
      translation: 'I am the Soul, O Arjuna, seated in the hearts of all living entities. I am the beginning, the middle, and the end of all beings.',
      commentary: 'The Divine is not somewhere else — it is the innermost witness in every being. To harm another is to harm the Divine. To love another is to love the Divine. This is the basis of all ethics.'
    },
    lifeApplication: 'Whenever you encounter true excellence — a master musician, a breathtaking mountain, an act of pure courage — recognize it as a glimpse of the Divine. This transforms ordinary experience into sacred awareness.',
    theme: 'Divine Manifestations',
    color: '#065f46'
  },
  {
    number: 11,
    sanskritName: 'विश्वरूपदर्शनयोग',
    transliteration: 'Viśvarūpa Darśana Yoga',
    englishName: 'The Yoga of the Vision of the Cosmic Form',
    verses: 55,
    summary: 'At Arjuna\'s request, Krishna reveals his cosmic, universal form (Vishwaroop). Arjuna sees the infinite — all beings, all time, past and future, all creation and destruction — contained within Krishna. Terrified and awed, he begs Krishna to return to his gentle human form.',
    teachings: ['The cosmic form of the Divine', 'Time as destroyer of all things', 'The terror and awe of the infinite', 'Why the Divine chooses a personal, approachable form'],
    openingVerse: {
      sanskrit: 'कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः | ऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः ||',
      transliteration: 'kālo \'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ | ṛte \'pi tvāṁ na bhaviṣyanti sarve ye \'vasthitāḥ pratyanīkeṣu yodhāḥ',
      translation: 'I am Time, the destroyer of all worlds, and I have come here to destroy all people. With the exception of you, all the soldiers standing on both sides will be slain.',
      commentary: 'This is the Vishwaroop in its most terrifying aspect — the Divine as Time itself, the absolute destroyer. J. Robert Oppenheimer famously quoted this verse when he witnessed the first atomic bomb explosion.'
    },
    lifeApplication: 'Meditating on the vastness of time and cosmos puts our individual problems in perspective. Our entire lives are brief flickers. This is humbling, yes — but also liberating.',
    theme: 'Vishwaroop — Cosmic Vision',
    color: '#1c1917'
  },
  {
    number: 12,
    sanskritName: 'भक्तियोग',
    transliteration: 'Bhakti Yoga',
    englishName: 'The Yoga of Devotion',
    verses: 20,
    summary: 'Arjuna asks: which is better — devotion to the personal God with form (Saguna), or worship of the formless Absolute (Nirguna)? Krishna answers: devotion to the personal form is easier for embodied beings. He then describes the ideal devotee — a being of complete equanimity, free from hatred, compassion to all, unmoved by praise or blame.',
    teachings: ['Personal devotion vs formless meditation', 'The qualities of the ideal devotee', 'Devotion as the most accessible path', 'Equanimity — the mark of true wisdom'],
    openingVerse: {
      sanskrit: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च | निर्ममो निरहङ्कारः समदुःखसुखः क्षमी ||',
      transliteration: 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca | nirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī',
      translation: 'One who is not envious but who is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant.',
      commentary: 'These verses (12.13-20) paint the portrait of the ideal human being — not a warrior, not a scholar, not a king, but someone who has achieved inner peace so complete that the world\'s ups and downs cannot disturb it.'
    },
    lifeApplication: 'Examine yourself: are you more disturbed by criticism than by praise? Do you treat all people with equal friendliness? The Gita\'s ideal devotee is a useful mirror for self-examination.',
    theme: 'Devotion & The Ideal Devotee',
    color: '#831843'
  },
  {
    number: 13,
    sanskritName: 'क्षेत्रक्षेत्रज्ञविभागयोग',
    transliteration: 'Kṣetra Kṣetrajña Vibhāga Yoga',
    englishName: 'The Yoga of Distinguishing the Field and Knower of the Field',
    verses: 35,
    summary: 'Krishna introduces the deep philosophical distinction between Kshetra (the field — the body, mind, and material nature) and Kshetrajña (the knower of the field — consciousness/soul). True wisdom lies in recognizing yourself as the knower, not the known.',
    teachings: ['The body as field, soul as the knower', 'The 24 elements of material nature (Sankhya)', 'The qualities of true wisdom', 'Seeing the Divine equally in all beings'],
    openingVerse: {
      sanskrit: 'इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते | एतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः ||',
      transliteration: 'idaṁ śarīraṁ kaunteya kṣetram ity abhidhīyate | etad yo vetti taṁ prāhuḥ kṣetrajña iti tad-vidaḥ',
      translation: 'This body, O son of Kunti, is called the field, and one who knows this body is called the knower of the field, according to those who know.',
      commentary: 'This verse introduces a radical shift in identity. You are not the body experiencing life — you are the consciousness that witnesses the body\'s experiences. This single recognition is the foundation of all liberation.'
    },
    lifeApplication: 'Practice the "witness" perspective: when you are angry, can you observe the anger without being fully consumed by it? You are the knower of the field — not the field itself.',
    theme: 'Soul vs Matter — The Deep Distinction',
    color: '#134e4a'
  },
  {
    number: 14,
    sanskritName: 'गुणत्रयविभागयोग',
    transliteration: 'Guṇa Traya Vibhāga Yoga',
    englishName: 'The Yoga of the Division of the Three Qualities',
    verses: 27,
    summary: 'Krishna explains the three fundamental qualities (Gunas) of all nature: Tamas (inertia/darkness), Rajas (passion/activity), and Sattva (clarity/goodness). All human personality, thought, and action is a mixture of these three. Liberation comes from transcending all three.',
    teachings: ['The three Gunas: Sattva, Rajas, Tamas', 'How Gunas bind the soul', 'Identifying which Guna dominates you', 'Transcending the Gunas for liberation'],
    openingVerse: {
      sanskrit: 'सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः | निबध्नन्ति महाबाहो देहे देहिनमव्ययम् ||',
      transliteration: 'sattvaṁ rajas tama iti guṇāḥ prakṛti-sambhavāḥ | nibadhnanti mahā-bāho dehe dehinam avyayam',
      translation: 'Material nature consists of three modes — goodness, passion and ignorance. When the eternal living entity comes in contact with nature, O mighty-armed Arjuna, he becomes conditioned by these modes.',
      commentary: 'The Gunas are not moral categories but descriptive ones. All three are necessary for the cosmos to function. The goal is not to eliminate Rajas or Tamas but to cultivate Sattva as the dominant mode, and ultimately transcend even that.'
    },
    lifeApplication: 'Observe your daily states: when you are lazy and sluggish (Tamas), restless and anxious (Rajas), or clear and peaceful (Sattva). Diet, sleep, company, and environment all influence which Guna dominates.',
    theme: 'Three Modes of Nature',
    color: '#1e3a8a'
  },
  {
    number: 15,
    sanskritName: 'पुरुषोत्तमयोग',
    transliteration: 'Puruṣottama Yoga',
    englishName: 'The Yoga of the Supreme Person',
    verses: 20,
    summary: 'Krishna uses the metaphor of an upside-down Ashvattha tree (eternal tree of existence) to describe the material world. He then introduces the three kinds of beings: the perishable, the imperishable, and the Supreme Person (Purushottama) who transcends both.',
    teachings: ['The Ashvattha tree of material existence', 'The three cosmic persons', 'The Supreme Person beyond all', 'How to cut the tree of Maya with the weapon of detachment'],
    openingVerse: {
      sanskrit: 'ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् | छन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् ||',
      transliteration: 'ūrdhva-mūlam adhaḥ-śākham aśvatthaṁ prāhur avyayam | chandāṁsi yasya parṇāni yas taṁ veda sa veda-vit',
      translation: 'The blessed Lord said: It is said that there is an imperishable banyan tree that has its roots upward and its branches down and whose leaves are the Vedic hymns. One who knows this tree is the knower of the Vedas.',
      commentary: 'The inverted tree is a profound metaphor — the roots of existence are in the eternal (above, spiritual), while the branches spread into the material world (below). Our vision is reversed: we see the branches as real and forget the roots.'
    },
    lifeApplication: 'When you are caught in worldly entanglements, remember: the roots of your being are in something beyond the material. Return to that. This is the "cutting" of the tree — detachment from material identification.',
    theme: 'Supreme Person & Cosmic Tree',
    color: '#14532d'
  },
  {
    number: 16,
    sanskritName: 'दैवासुरसम्पद्विभागयोग',
    transliteration: 'Daivāsura Sampadvibhāga Yoga',
    englishName: 'The Yoga of the Division of Divine and Demonic Qualities',
    verses: 24,
    summary: 'Krishna enumerates the divine (Daivi) and demonic (Asuri) qualities in human beings. Divine qualities include fearlessness, purity, compassion, truth. Demonic qualities include arrogance, anger, greed, and delusion. He warns about those who follow demonic nature.',
    teachings: ['Divine vs demonic qualities', 'The three gates to hell: lust, anger, greed', 'Living according to scripture vs ego', 'The consequence of rejecting dharma'],
    openingVerse: {
      sanskrit: 'त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः | कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ||',
      transliteration: 'tri-vidhaṁ narakasyedaṁ dvāraṁ nāśanam ātmanaḥ | kāmaḥ krodhas tathā lobhas tasmād etat trayaṁ tyajet',
      translation: 'There are three gates leading to this hell — lust, anger and greed. Every sane man should give these up, for they lead to the degradation of the soul.',
      commentary: 'Three words — Kama (lust/desire), Krodha (anger), and Lobha (greed) — are identified as the three great destroyers of human potential. They are interconnected: unfulfilled desire becomes anger, satisfied desire becomes greed.'
    },
    lifeApplication: 'Cultivate the divine qualities daily: speak truth, practice non-violence, be compassionate. Examine yourself: which of the three gates — lust, anger, greed — most frequently pulls you in?',
    theme: 'Divine vs Demonic Nature',
    color: '#450a0a'
  },
  {
    number: 17,
    sanskritName: 'श्रद्धात्रयविभागयोग',
    transliteration: 'Śraddhā Traya Vibhāga Yoga',
    englishName: 'The Yoga of the Division of Three Kinds of Faith',
    verses: 28,
    summary: 'Arjuna asks about people who worship with faith but without following scripture. Krishna responds by explaining that faith itself takes three forms — Sattvic (pure), Rajasic (passionate), and Tamasic (ignorant). Even our food, worship, charity, and austerity reflect our Guna.',
    teachings: ['Faith according to the three Gunas', 'Sattvic, Rajasic, Tamasic food and worship', 'Charity according to Guna', 'The sacred syllable Om Tat Sat'],
    openingVerse: {
      sanskrit: 'ओम् तत् सत् इति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः | ब्राह्मणास्तेन वेदाश्च यज्ञाश्च विहिताः पुरा ||',
      transliteration: 'oṁ tat sad iti nirdeśo brahmaṇas tri-vidhaḥ smṛtaḥ | brāhmaṇās tena vedāś ca yajñāś ca vihitāḥ purā',
      translation: 'From the beginning of creation, the three words Om Tat Sat were used to indicate the Supreme Absolute Truth. These three symbolic representations were used by Brahmanas while chanting the Vedic hymns and during sacrifices.',
      commentary: 'Om (the cosmic sound), Tat (That — pointing to the unnameable), Sat (Truth/Being) — together they form the most complete description of Ultimate Reality in three syllables. All Vedic ritual and Sanskrit sacred texts begin with these.'
    },
    lifeApplication: 'Examine the quality of your faith. Is it based on truth and wisdom (Sattvic), on desire for reward (Rajasic), or on fear and superstition (Tamasic)? True faith evolves as we mature.',
    theme: 'Three Kinds of Faith',
    color: '#713f12'
  },
  {
    number: 18,
    sanskritName: 'मोक्षसन्न्यासयोग',
    transliteration: 'Mokṣa Sannyāsa Yoga',
    englishName: 'The Yoga of Liberation through Renunciation',
    verses: 78,
    summary: 'The grand finale. Krishna summarizes all his teachings — Karma Yoga, Jnana Yoga, Bhakti Yoga — and reveals the highest secret of all: complete surrender to the Divine (Sarva-dharma-parityaga). Arjuna, with clarity restored, declares he will fight. The Gita ends with Sanjaya\'s testimony to the eternal glory of this divine dialogue.',
    teachings: ['The summary of all paths', 'Complete surrender as the highest teaching', 'The nature of duty across all roles in society', 'The eternal glory of the Gita itself'],
    openingVerse: {
      sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज | अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ||',
      transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja | ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ',
      translation: 'Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.',
      commentary: 'This is the charama shloka — the final, ultimate verse of the Gita\'s teaching. After 700 verses of philosophy, ethics, metaphysics, and devotion, it comes to this: Let go. Surrender completely. Trust the Divine. Fear nothing.'
    },
    lifeApplication: 'The greatest freedom comes not from controlling everything but from releasing the illusion of control. Complete surrender to the Divine — or to your highest purpose — removes the anxiety of outcome and enables fearless action.',
    theme: 'Liberation & Complete Surrender',
    color: '#1a0a2e'
  }
];
