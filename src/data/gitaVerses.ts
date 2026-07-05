export interface VerseWord {
  word: string;
  meaning: string;
}

export interface GitaVerse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  commentary: string;
  words: VerseWord[];
  theme: string;
}

export const gitaVerses: GitaVerse[] = [
  // ================= CHAPTER 1 =================
  {
    chapter: 1,
    verse: 1,
    sanskrit: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||",
    transliteration: "dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya",
    translation: "Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?",
    commentary: "The opening verse sets the stage for the entire Mahabharata. Kurukshetra is not just a geographical site, but 'Dharmakshetra'—the field of righteousness. It represents the moral conflict within the human soul where the battle between good and evil is constantly fought.",
    theme: "Conflict & Duty",
    words: [
      { word: "धर्मक्षेत्रे (dharma-kṣetre)", meaning: "on the field of righteousness" },
      { word: "कुरुक्षेत्रे (kuru-kṣetre)", meaning: "on the field of the Kurus" },
      { word: "समवेताः (samavetāḥ)", meaning: "assembled" },
      { word: "युयुत्सवः (yuyutsavaḥ)", meaning: "desiring to fight" },
      { word: "मामकाः (māmakāḥ)", meaning: "my sons" },
      { word: "पाण्डवाः (pāṇḍavāḥ)", meaning: "the sons of Pandu" },
      { word: "च (ca)", meaning: "and" },
      { word: "एव (eva)", meaning: "certainly" },
      { word: "किम (kim)", meaning: "what" },
      { word: "अकुर्वत (akurvata)", meaning: "did they do" },
      { word: "सञ्जय (sañjaya)", meaning: "O Sanjaya" }
    ]
  },
  {
    chapter: 1,
    verse: 28,
    sanskrit: "दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् |\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति ||",
    transliteration: "dṛṣṭvemaṁ svajanaṁ kṛṣṇa yuyutsuṁ samupasthitam\nsīdanti mama gātrāni mukhaṁ ca pariśuṣyati",
    translation: "Arjuna said: O Krishna, seeing my own kinsmen standing before me eager to fight, my limbs sink and my mouth is parched.",
    commentary: "This verse captures Arjuna's emotional breakdown. His grief and confusion stem from bodily identification and attachment. He looks at his teachers, grandfathers, and cousins as 'his own', causing a paralysis of will when duty demands he fight them.",
    theme: "Grief & Attachment",
    words: [
      { word: "दृष्ट्वा (dṛṣṭvā)", meaning: "seeing" },
      { word: "इमम् (imam)", meaning: "this" },
      { word: "स्वजनम् (svajanam)", meaning: "kinsmen / relatives" },
      { word: "कृष्ण (kṛṣṇa)", meaning: "O Krishna" },
      { word: "युयुत्सुम् (yuyutsum)", meaning: "eager to fight" },
      { word: "समुपस्थितम् (samupasthitam)", meaning: "present" },
      { word: "सीदन्ति (sīdanti)", meaning: "sink / fail" },
      { word: "मम (mama)", meaning: "my" },
      { word: "गात्राणि (gātrāṇi)", meaning: "limbs" },
      { word: "मुखम् (mukham)", meaning: "mouth" },
      { word: "च (ca)", meaning: "and" },
      { word: "परिशुष्यति (pariśuṣyati)", meaning: "is parched / drying up" }
    ]
  },

  // ================= CHAPTER 2 =================
  {
    chapter: 2,
    verse: 7,
    sanskrit: "कार्पण्यदोषोपहतस्वभावः पृच्छामि त्वां धर्मसम्मूढचेताः |\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे शिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम् ||",
    transliteration: "kārpaṇya-doṣopahata-svabhāvaḥ pṛcchāmi tvāṁ dharma-sammūḍha-cetāḥ\nyac chreyaḥ syān niścitaṁ brūhi tan me śiṣyas te ’haṁ śādhi māṁ tvāṁ prapannam",
    translation: "Now I am confused about my duty and have lost all composure because of miserly weakness. In this condition I am asking You to tell me for certain what is best for me. I am Your disciple, and a soul surrendered unto You. Please instruct me.",
    commentary: "This is the turning point of the Gita. Arjuna surrenders his ego, transitioning from a friend to a disciple (shishya). The spiritual path begins only when we acknowledge our ignorance and ask a Guru for guidance with genuine humility.",
    theme: "Surrender & Seek",
    words: [
      { word: "कार्पण्य (kārpaṇya)", meaning: "miserly / weakness" },
      { word: "दोष (doṣa)", meaning: "defect / flaw" },
      { word: "उपहत (upahata)", meaning: "afflicted by" },
      { word: "स्वभावः (svabhāvaḥ)", meaning: "nature" },
      { word: "पृच्छामि (pṛcchāmi)", meaning: "I ask" },
      { word: "त्वाम् (tvām)", meaning: "You" },
      { word: "धर्म (dharma)", meaning: "duty / righteousness" },
      { word: "सम्मूढ (sammūḍha)", meaning: "confused" },
      { word: "चेताः (cetāḥ)", meaning: "heart / mind" },
      { word: "यत् (yat)", meaning: "what" },
      { word: "श्रेयः (śreyaḥ)", meaning: "ultimate good" },
      { word: "स्यात् (syāt)", meaning: "may be" },
      { word: "निश्चितम् (niścitem)", meaning: "decisively" },
      { word: "ब्रूहि (brūhi)", meaning: "tell" },
      { word: "तत् (tat)", meaning: "that" },
      { word: "मे (me)", meaning: "to me" },
      { word: "शिष्यः (śiṣyaḥ)", meaning: "disciple" },
      { word: "ते (te)", meaning: "Your" },
      { word: "अहम् (aham)", meaning: "I am" },
      { word: "शाधि (śādhi)", meaning: "instruct" },
      { word: "माम् (mām)", meaning: "me" },
      { word: "प्रपन्नम् (prapannam)", meaning: "surrendered" }
    ]
  },
  {
    chapter: 2,
    verse: 20,
    sanskrit: "न जायते म्रियते वा कदाचि-न्नायं भूत्वा भविता वा न भूयः |\nअजो नित्यः शाश्वतोऽयं पुराणो-न हन्यते हन्यमाने शरीरे ||",
    transliteration: "na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śāśvato ’yaṁ purāṇo na hanyate hanyamāne śarīre",
    translation: "The soul is never born nor does it die at any time; nor having once been, does it ever cease to be. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
    commentary: "Krishna introduces Arjuna to the eternal reality of the soul (Atman). All grief is born from the illusion that we are our bodies. Realizing our nature as indestructible consciousness releases us from the fear of death.",
    theme: "Soul & Immortality",
    words: [
      { word: "न (na)", meaning: "never" },
      { word: "जायते (jāyate)", meaning: "is born" },
      { word: "म्रियते (mriyate)", meaning: "dies" },
      { word: "वा (vā)", meaning: "or" },
      { word: "कदाचित् (kadācit)", meaning: "at any time" },
      { word: "अयम् (ayam)", meaning: "this (soul)" },
      { word: "अजः (ajaḥ)", meaning: "unborn" },
      { word: "नित्यः (nityaḥ)", meaning: "eternal" },
      { word: "शाश्वतः (śāśvataḥ)", meaning: "permanent" },
      { word: "पुराणः (purāṇaḥ)", meaning: "ancient / primeval" },
      { word: "हन्यते (hanyate)", meaning: "is killed" },
      { word: "शरीरे (śarīre)", meaning: "when body (is slain)" }
    ]
  },
  {
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi",
    translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    commentary: "This is the signature verse of Karma Yoga. Krishna shifts the focus from 'what I get' to 'what I do'. Anxiety, stress, and disappointment are caused by attachment to results. By surrendering results, action becomes meditative and free of karma.",
    theme: "Selfless Action",
    words: [
      { word: "कर्मणि (karmaṇi)", meaning: "in your duty / action" },
      { word: "एव (eva)", meaning: "only" },
      { word: "अधिकारः (adhikāraḥ)", meaning: "right / claim" },
      { word: "ते (te)", meaning: "your" },
      { word: "मा (mā)", meaning: "never" },
      { word: "फलेषु (phaleṣu)", meaning: "in the fruits / results" },
      { word: "कदाचन (kadācana)", meaning: "at any time" },
      { word: "हेतुः (hetuḥ)", meaning: "cause" },
      { word: "सङ्गः (saṅgaḥ)", meaning: "attachment" },
      { word: "अकर्मणि (akarmaṇi)", meaning: "in inaction" }
    ]
  },

  // ================= CHAPTER 3 =================
  {
    chapter: 3,
    verse: 9,
    sanskrit: "यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः |\nतदर्थं कर्म कौन्तेय मुक्तसङ्गः समाचर ||",
    transliteration: "yajñārthāt karmaṇo ’nyatra loko ’yaṁ karma-bandhanaḥ\ntad-arthaṁ karma kaunteya mukta-saṅgaḥ samācara",
    translation: "Work done as a sacrifice for God must be performed; otherwise work causes bondage in this material world. Therefore, O son of Kunti, perform your prescribed duties for His satisfaction, and in that way you will always remain free from bondage.",
    commentary: "Work performed for personal, selfish gratification creates binding karma. When work is elevated to 'Yajna' (offering/sacrifice) to serve the greater good or the Divine, it becomes a path to liberation rather than a source of bondage.",
    theme: "Selfless Action",
    words: [
      { word: "यज्ञ-अर्थात् (yajña-arthāt)", meaning: "done for sacrifice / God" },
      { word: "कर्मणः (karmaṇaḥ)", meaning: "than action" },
      { word: "अन्यत्र (anyatra)", meaning: "otherwise" },
      { word: "लोकः (lokaḥ)", meaning: "world" },
      { word: "अयम् (ayam)", meaning: "this" },
      { word: "कर्म-बन्धनः (karma-bandhanaḥ)", meaning: "bound by karma" },
      { word: "मुक्त-सङ्गः (mukta-saṅgaḥ)", meaning: "free from attachment" },
      { word: "समाचर (samācara)", meaning: "perform perfectly" }
    ]
  },
  {
    chapter: 3,
    verse: 35,
    sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् |\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः ||",
    transliteration: "śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ",
    translation: "It is far better to discharge one’s own prescribed duties, even though faultily, than another’s duties perfectly. Destruction in the course of performing one’s own duty is better than engaging in another’s duties, for to follow another’s path is dangerous.",
    commentary: "Your 'Swadharma' is your own duty aligned with your inner nature (Swabhava). Trying to copy someone else's career or role because it looks glamorous leads to inner conflict and spiritual stagnation. Authenticity is better than imitation.",
    theme: "Conflict & Duty",
    words: [
      { word: "श्रेयान् (śreyān)", meaning: "better / superior" },
      { word: "स्व-धर्मः (sva-dharmaḥ)", meaning: "one's own duty" },
      { word: "विगुणः (viguṇaḥ)", meaning: "lacking qualities / imperfect" },
      { word: "पर-धर्मात् (para-dharmāt)", meaning: "than another's duty" },
      { word: "स्वनुष्ठितात् (sv-anuṣṭhitāt)", meaning: "perfectly executed" },
      { word: "निधनम् (nidhanam)", meaning: "death / destruction" },
      { word: "श्रेयः (śreyaḥ)", meaning: "beneficial" },
      { word: "भयावहः (bhayāvahaḥ)", meaning: "dangerous / fear-inducing" }
    ]
  },

  // ================= CHAPTER 4 =================
  {
    chapter: 4,
    verse: 7,
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत |\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
    translation: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
    commentary: "This is the cornerstone of the Avatar (incarnation) doctrine in Hinduism. Divine consciousness manifests in physical form on Earth during periods of moral decay to restore balance. In a personal sense, whenever we are overwhelmed by internal darkness, seeking divine light restores internal dharma.",
    theme: "Divine Presence",
    words: [
      { word: "यदा यदा (yadā yadā)", meaning: "whenever and wherever" },
      { word: "हि (hi)", meaning: "certainly" },
      { word: "धर्मस्य (dharmasya)", meaning: "of righteousness / dharma" },
      { word: "ग्लानिः (glāniḥ)", meaning: "decline / decay" },
      { word: "भवति (bhavati)", meaning: "becomes" },
      { word: "भारत (bhārata)", meaning: "O Arjuna (descendant of Bharata)" },
      { word: "अभ्युत्थानम् (abhyutthānam)", meaning: "rise / predominance" },
      { word: "अधर्मस्य (adharmasya)", meaning: "of unrighteousness" },
      { word: "तदा (tadā)", meaning: "at that time" },
      { word: "आत्मानम् (ātmānam)", meaning: "myself" },
      { word: "सृजामि (sṛjāmi)", meaning: "manifest / create" },
      { word: "अहम् (aham)", meaning: "I" }
    ]
  },
  {
    chapter: 4,
    verse: 34,
    sanskrit: "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया |\nउपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ||",
    transliteration: "tad viddhi praṇipātena paripraśnena sevayā\nupadekṣyanti te jñānaṁ jñāninas tattva-darśinaḥ",
    translation: "Just try to learn the truth by approaching a spiritual master. Inquire from him submissively and render service unto him. The self-realized souls can impart knowledge unto you because they have seen the truth.",
    commentary: "Spiritual wisdom cannot be acquired by mere bookish reading or intellectual pride. It requires three steps: 'Pranipata' (surrendering ego/humility), 'Pariprashna' (sincere, non-argumentative questioning), and 'Seva' (selfless service). Only then does the seed of wisdom bear fruit.",
    theme: "Surrender & Seek",
    words: [
      { word: "तत् (tat)", meaning: "that (knowledge)" },
      { word: "विद्धि (viddhi)", meaning: "try to learn" },
      { word: "प्रणिपातेन (praṇipātena)", meaning: "by bowing down / humility" },
      { word: "परिप्रश्नेन (paripraśnena)", meaning: "by submissive inquiries" },
      { word: "सेवया (sevayā)", meaning: "by rendering service" },
      { word: "उपदेक्ष्यन्ति (upadekṣyanti)", meaning: "will initiate / instruct" },
      { word: "ते (te)", meaning: "you" },
      { word: "ज्ञानम् (jñānam)", meaning: "knowledge" },
      { word: "ज्ञानिनः (jñāninaḥ)", meaning: "the wise" },
      { word: "तत्त्व-दर्शिनः (tattva-darśinaḥ)", meaning: "seers of the truth" }
    ]
  },

  // ================= CHAPTER 5 =================
  {
    chapter: 5,
    verse: 18,
    sanskrit: "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि |\nशुनि चैव श्वपाके च पण्डिताः समदर्शिनः ||",
    transliteration: "vidyā-vinaya-sampanne brāhmaṇe gavi hastini\nśuni caiva śvapāke ca paṇḍitāḥ sama-darśinaḥ",
    translation: "The humble sages, by virtue of true knowledge, see with an equal eye a learned and gentle brahmana, a cow, an elephant, a dog and a dog-eater (outcaste).",
    commentary: "True spiritual realization manifests as universal, non-judgmental equanimity. A wise person looks past the physical, social, and species-based outer shells (the field) and sees the same spark of divine consciousness (the knower) within all living beings.",
    theme: "Equanimity & Peace",
    words: [
      { word: "विद्या (vidyā)", meaning: "education" },
      { word: "विनय (vinaya)", meaning: "gentleness / humility" },
      { word: "सम्पन्ने (sampanne)", meaning: "fully equipped with" },
      { word: "ब्राह्मणे (brāhmaṇe)", meaning: "in a priest / intellectual" },
      { word: "गवि (gavi)", meaning: "in a cow" },
      { word: "हस्तिनि (hastini)", meaning: "in an elephant" },
      { word: "शुनि (śuni)", meaning: "in a dog" },
      { word: "श्वपाके (śvapāke)", meaning: "in an outcaste / dog-eater" },
      { word: "पण्डिताः (paṇḍitāḥ)", meaning: "sages / wise men" },
      { word: "सम-दर्शिनः (sama-darśinaḥ)", meaning: "seeing with equal vision" }
    ]
  },

  // ================= CHAPTER 6 =================
  {
    chapter: 6,
    verse: 5,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् |\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ||",
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
    translation: "One must deliver himself with the help of his mind, and not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well.",
    commentary: "We are responsible for our own liberation or downfall. Outer circumstances do not make us happy or sad; it is our mind's reaction to them. If trained, the mind is our greatest ally. If uncontrolled, it becomes our worst enemy.",
    theme: "Mind & Meditation",
    words: [
      { word: "उद्धरेत् (uddharet)", meaning: "must elevate / deliver" },
      { word: "आत्मना (ātmanā)", meaning: "by the mind / self" },
      { word: "आत्मानम् (ātmānam)", meaning: "the self" },
      { word: "न (na)", meaning: "never" },
      { word: "अवसादयेत् (avasādayet)", meaning: "should degrade / depress" },
      { word: "आत्म-एव (ātma-eva)", meaning: "the mind indeed" },
      { word: "बन्धुः (bandhuḥ)", meaning: "friend" },
      { word: "रिपुः (ripuḥ)", meaning: "enemy" }
    ]
  },
  {
    chapter: 6,
    verse: 26,
    sanskrit: "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम् |\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत् ||",
    transliteration: "yato yato niścarati manaś cañcalam asthiram\ntatas tato niyamyaitad ātmany eva vaśaṁ nayet",
    translation: "From wherever the restless and unsteady mind wanders due to its flickering nature, one must certainly withdraw it and bring it back under the control of the self.",
    commentary: "Meditation is not about stopping thoughts instantly, but about constant vigilance. Whenever the mind drifts off into daydreams, anxiety, or memories, gently but firmly redirect it back to the present moment, anchoring it in the Soul.",
    theme: "Mind & Meditation",
    words: [
      { word: "यतः यतः (yataḥ yataḥ)", meaning: "from wherever" },
      { word: "निश्चरति (niścarati)", meaning: "wanders / drifts" },
      { word: "मनः (manaḥ)", meaning: "the mind" },
      { word: "चञ्चलम् (cañcalam)", meaning: "flickering / restless" },
      { word: "अस्थिरम् (asthiram)", meaning: "unsteady" },
      { word: "ततः ततः (tatas tataḥ)", meaning: "from there" },
      { word: "नियम्य (niyamya)", meaning: "controlling / regulating" },
      { word: "एतत् (etat)", meaning: "this" },
      { word: "आत्मनि (ātmani)", meaning: "in the self" },
      { word: "वशम् (vaśam)", meaning: "under control" },
      { word: "नयेत् (nayet)", meaning: "must bring" }
    ]
  },

  // ================= CHAPTER 7 =================
  {
    chapter: 7,
    verse: 7,
    sanskrit: "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय |\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ||",
    transliteration: "mattaḥ parataraṁ nānyat kiñcid asti dhanañjaya\nmayi sarvam idaṁ protaṁ sūtre maṇi-gaṇā iva",
    translation: "O conqueror of wealth, there is no truth superior to Me. Everything rests upon Me, as pearls are strung on a thread.",
    commentary: "Krishna describes Himself as the ultimate connecting fabric of the cosmos. Just as a necklace of pearls is held together by an invisible thread, all of material nature and consciousness is sustained by the underlying Divine energy.",
    theme: "Divine Presence",
    words: [
      { word: "मत्तः (mattaḥ)", meaning: "beyond Me" },
      { word: "परतरम् (parataram)", meaning: "superior" },
      { word: "न (na)", meaning: "not" },
      { word: "अन्यत् (anyat)", meaning: "other" },
      { word: "किञ्चित् (kiñcit)", meaning: "anything" },
      { word: "अस्ति (asti)", meaning: "there is" },
      { word: "धनञ्जय (dhanañjaya)", meaning: "O Arjuna (conqueror of wealth)" },
      { word: "मयि (mayi)", meaning: "in Me" },
      { word: "सर्वम् (sarvam)", meaning: "all / everything" },
      { word: "इदम् (idam)", meaning: "this" },
      { word: "प्रोतम् (protam)", meaning: "is strung" },
      { word: "सूत्रे (sūtre)", meaning: "on a thread" },
      { word: "मणि-गणाः (maṇi-gaṇāḥ)", meaning: "pearls / gems" },
      { word: "इव (iva)", meaning: "like" }
    ]
  },

  // ================= CHAPTER 8 =================
  {
    chapter: 8,
    verse: 5,
    sanskrit: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् |\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः ||",
    transliteration: "anta-kāle ca mām eva smaran muktvā kalevaram\nyaḥ prayāti sa mad-bhāvaṁ yāti nāsty atra saṁśayaḥ",
    translation: "And whoever, at the end of his life, quits his body remembering Me alone, at once attains My nature. Of this there is no doubt.",
    commentary: "Our thoughts at the moment of death determine our next destination. This final thought is not accidental; it is the summary of what we contemplated most during our lifetime. Thus, we must cultivate divine consciousness daily so it comes naturally at the end.",
    theme: "Death & Rebirth",
    words: [
      { word: "अन्त-काले (anta-kāle)", meaning: "at the time of death" },
      { word: "च (ca)", meaning: "and" },
      { word: "माम् (mām)", meaning: "Me" },
      { word: "एव (eva)", meaning: "only" },
      { word: "स्मरन् (smaran)", meaning: "remembering" },
      { word: "मुक्त्वा (muktvā)", meaning: "leaving / quitting" },
      { word: "कलेवरम् (kalevaram)", meaning: "the body" },
      { word: "यः (yaḥ)", meaning: "whoever" },
      { word: "प्रयाति (prayāti)", meaning: "goes" },
      { word: "मद्-भावम् (mad-bhāvam)", meaning: "My nature / state" },
      { word: "याति (yāti)", meaning: "achieves" }
    ]
  },

  // ================= CHAPTER 9 =================
  {
    chapter: 9,
    verse: 22,
    sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते |\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ||",
    transliteration: "ananyāś cintayanto māṁ ye janāḥ paryupāsate\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham",
    translation: "But those who always worship Me with exclusive devotion, meditating on My transcendental form—to them I carry what they lack, and I preserve what they have.",
    commentary: "This is Krishna's grand promise of protection. When we align our entire life with spiritual truth and surrender our anxieties to the Divine, the universe handles our material needs ('Yoga'—getting what we need, and 'Kshema'—keeping what we have).",
    theme: "Devotion & Grace",
    words: [
      { word: "अनन्याः (ananyāḥ)", meaning: "without other desires / exclusive" },
      { word: "चिन्तयन्तः (cintayantaḥ)", meaning: "meditating" },
      { word: "माम् (mām)", meaning: "on Me" },
      { word: "ये (ye)", meaning: "those who" },
      { word: "जनाः (janāḥ)", meaning: "people" },
      { word: "पर्युपासते (paryupāsate)", meaning: "worship" },
      { word: "तेषाम् (teṣām)", meaning: "for them" },
      { word: "नित्य (nitya)", meaning: "always" },
      { word: "अभियुक्तानाम् (abhiyuktānām)", meaning: "fixed in devotion" },
      { word: "योग (yoga)", meaning: "attainment of needs" },
      { word: "क्षेमम् (kṣemam)", meaning: "protection of assets" },
      { word: "वहामि (vahāmi)", meaning: "carry / deliver" },
      { word: "अहम् (aham)", meaning: "I" }
    ]
  },
  {
    chapter: 9,
    verse: 26,
    sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति |\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ||",
    transliteration: "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ",
    translation: "If one offers Me with love and devotion a leaf, a flower, a fruit or water, I will accept it.",
    commentary: "God is not enticed by expensive rituals, gold, or academic titles. The simplest offering made by a pure, loving heart is received with supreme joy. Love is the currency of the spiritual world.",
    theme: "Devotion & Grace",
    words: [
      { word: "पत्रम् (patram)", meaning: "a leaf" },
      { word: "पुष्पम् (puṣpam)", meaning: "a flower" },
      { word: "फलम् (phalam)", meaning: "a fruit" },
      { word: "तोयम् (toyam)", meaning: "water" },
      { word: "यः (yaḥ)", meaning: "whoever" },
      { word: "मे (me)", meaning: "to Me" },
      { word: "भक्त्या (bhaktyā)", meaning: "with devotion" },
      { word: "प्रयच्छति (prayacchati)", meaning: "offers" },
      { word: "तत् (tat)", meaning: "that" },
      { word: "अहम् (aham)", meaning: "I" },
      { word: "अश्नामि (aśnāmi)", meaning: "accept / consume" }
    ]
  },

  // ================= CHAPTER 10 =================
  {
    chapter: 10,
    verse: 41,
    sanskrit: "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा |\nतत्तदेवावगच्छ त्वं मम तेजोंऽशसम्भवम् ||",
    transliteration: "yad yad vibhūtimat sattvaṁ śrīmad ūrjitamevavā\ntat tad evāvagaccha tvaṁ mama tejo-’ṁśa-sambhavam",
    translation: "Know that all opulent, beautiful and glorious creations spring from but a spark of My splendor.",
    commentary: "Whenever we see genius in art, immense beauty in nature, or profound strength in a human being, we must not worship the individual ego. We should recognize it as a tiny ray of the cosmic Divine glory, reflecting through that form.",
    theme: "Divine Presence",
    words: [
      { word: "यत् यत् (yat yat)", meaning: "whatever" },
      { word: "विभूतिमत् (vibhūtimat)", meaning: "opulent / glorious" },
      { word: "सत्त्वम् (sattvam)", meaning: "existence / creation" },
      { word: "श्रीमत् (śrī-mat)", meaning: "beautiful / wealthy" },
      { word: "ऊर्जितम् (ūrjitam)", meaning: "mighty / powerful" },
      { word: "तत् तत् (tat tat)", meaning: "all those" },
      { word: "अवगच्छ (avagaccha)", meaning: "know / understand" },
      { word: "त्वम् (tvam)", meaning: "you" },
      { word: "मम (mama)", meaning: "My" },
      { word: "तेजः (tejaḥ)", meaning: "splendor / energy" },
      { word: "अंश (aṁśa)", meaning: "part / fragment" },
      { word: "सम्भवम् (sambhavam)", meaning: "born of" }
    ]
  },

  // ================= CHAPTER 11 =================
  {
    chapter: 11,
    verse: 32,
    sanskrit: "कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः |\nऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः ||",
    transliteration: "kālo ’smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ\nṛte ’pi tvāṁ na bhaviṣyanti sarve ye ’vasthitāḥ pratyanīkeṣu yodhāḥ",
    translation: "The Supreme Lord said: I am Time, the great destroyer of worlds, engaged here in destroying all people. With the exception of you, all the soldiers here on both sides will be slain.",
    commentary: "In the Cosmic Form (Vishwaroop), Krishna reveals Himself as Time. Time consumes everything—empires, stars, and bodies. He assures Arjuna that the corrupt warriors have already been judged by their karma. Arjuna is merely an instrument ('Nimitta-matra') of this cosmic law.",
    theme: "Time & Cosmic Form",
    words: [
      { word: "कालः (kālaḥ)", meaning: "Time / Destroyer" },
      { word: "अस्मि (asmi)", meaning: "I am" },
      { word: "लोक-क्षय-कृत् (loka-kṣaya-kṛt)", meaning: "destroyer of the worlds" },
      { word: "प्रवृद्धः (pravṛddhaḥ)", meaning: "mighty / expanded" },
      { word: "समाहर्तुम् (samāhartum)", meaning: "to dissolve / wipe out" },
      { word: "इह (iha)", meaning: "here" },
      { word: "ऋते अपि (ṛte api)", meaning: "even without" },
      { word: "त्वाम् (tvām)", meaning: "you" },
      { word: "न भविष्यन्ति (na bhaviṣyanti)", meaning: "will not survive" },
      { word: "योधाः (yodhāḥ)", meaning: "warriors" }
    ]
  },

  // ================= CHAPTER 12 =================
  {
    chapter: 12,
    verse: 13,
    sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च |\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी ||",
    transliteration: "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī",
    translation: "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant...",
    commentary: "Krishna defines the psychological qualities of his beloved devotee. True spirituality is not measured by the hours spent in temples, but by character: absence of malice, friendliness, active compassion, lack of ownership and pride, emotional stability under stress, and forgiveness.",
    theme: "Equanimity & Peace",
    words: [
      { word: "अद्वेष्टा (adveṣṭā)", meaning: "free from hatred" },
      { word: "सर्व-भूतानाम् (sarva-bhūtānām)", meaning: "toward all living beings" },
      { word: "मैत्रः (maitraḥ)", meaning: "friendly" },
      { word: "करुणः (karuṇaḥ)", meaning: "compassionate" },
      { word: "निर्ममः (nirmamaḥ)", meaning: "without possessiveness" },
      { word: "निरहङ्कारः (nirahaṅkāraḥ)", meaning: "without false ego" },
      { word: "सम (sama)", meaning: "equal / balanced" },
      { word: "दुःख-सुखः (duḥkha-sukhaḥ)", meaning: "in distress and joy" },
      { word: "क्षमी (kṣamī)", meaning: "forgiving / patient" }
    ]
  },

  // ================= CHAPTER 13 =================
  {
    chapter: 13,
    verse: 2,
    sanskrit: "इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते |\nएतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः ||",
    transliteration: "idaṁ śarīraṁ kaunteya kṣetram ity abhidhīyate\netad yo vetti taṁ prāhuḥ kṣetrajña iti tad-vidaḥ",
    translation: "The Supreme Lord said: This body, O son of Kunti, is called the field, and one who knows this body is called the knower of the field, by those who understand both.",
    commentary: "Krishna divides existence into the 'Field' (Kshetra) and the 'Knower of the Field' (Kshetrajna). The field is the body, mind, emotions, and external universe. The Knower is the silent witness—consciousness itself. Mental health issues occur when the Knower misidentifies itself with the field.",
    theme: "Soul & Immortality",
    words: [
      { word: "इदम् (idam)", meaning: "this" },
      { word: "शरीरम् (śarīram)", meaning: "body" },
      { word: "कौन्तेय (kaunteya)", meaning: "O Arjuna (son of Kunti)" },
      { word: "क्षेत्रम् (kṣetram)", meaning: "the field" },
      { word: "यो वेत्ति (yo vetti)", meaning: "one who knows" },
      { word: "क्षेत्रज्ञः (kṣetrajñaḥ)", meaning: "the knower of the field" }
    ]
  },

  // ================= CHAPTER 14 =================
  {
    chapter: 14,
    verse: 5,
    sanskrit: "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः |\nनिबध्नन्ति महाबाहो देहे देहिनमव्ययम् ||",
    transliteration: "sattvaṁ rajas tama iti guṇāḥ prakṛti-sambhavāḥ\nnibadhnanti mahā-bāho dehe dehinam avyayam",
    translation: "Material nature consists of three modes—goodness (sattva), passion (rajas) and ignorance (tamas). When the eternal living entity comes in contact with nature, O mighty-armed Arjuna, he becomes bound by these modes.",
    commentary: "Everything in material nature is composed of three strings or ropes (Gunas). Sattva binds the soul with attachment to knowledge and happiness. Rajas binds it with greed, passion, and intense action. Tamas binds it with laziness, sleep, and delusion. The goal is to cultivate Sattva, then transcend all three.",
    theme: "Three Gunas",
    words: [
      { word: "सत्त्वम् (sattvam)", meaning: "the mode of goodness" },
      { word: "रजः (rajaḥ)", meaning: "the mode of passion" },
      { word: "तमः (tamaḥ)", meaning: "the mode of ignorance / darkness" },
      { word: "गुणाः (guṇāḥ)", meaning: "qualities / modes" },
      { word: "प्रकृति (prakṛti)", meaning: "material nature" },
      { word: "निबध्नन्ति (nibadhnanti)", meaning: "bind / shackle" },
      { word: "देहे (dehe)", meaning: "in the body" },
      { word: "देहिनम् (dehinam)", meaning: "the embodied soul" },
      { word: "अव्ययम् (avyayam)", meaning: "the eternal / imperishable" }
    ]
  },

  // ================= CHAPTER 15 =================
  {
    chapter: 15,
    verse: 15,
    sanskrit: "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च |\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ||",
    transliteration: "sarvasya cāhaṁ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṁ ca\nvedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham",
    translation: "I am seated in everyone's heart, and from Me come memory, knowledge and forgetfulness. By all the Vedas, I am to be known. Indeed, I am the compiler of Vedanta, and I am the knower of the Vedas.",
    commentary: "The Divine is not far away in the clouds, but resides in our own heart as the Paramatman (Super-soul). Intuition, memory, creativity, and the peaceful moments of forgetfulness are coordinates of this inner presence directing our biological and psychological lives.",
    theme: "Divine Presence",
    words: [
      { word: "सर्वस्य (sarvasya)", meaning: "of all living beings" },
      { word: "हृदि (hṛdi)", meaning: "in the heart" },
      { word: "सन्निविष्टः (sanniviṣṭaḥ)", meaning: "situated" },
      { word: "मत्तः (mattaḥ)", meaning: "from Me" },
      { word: "स्मृतिः (smṛtiḥ)", meaning: "memory" },
      { word: "ज्ञानम् (jñānam)", meaning: "knowledge" },
      { word: "अपोहनम् (apohanam)", meaning: "forgetfulness" },
      { word: "अहम् (aham)", meaning: "I" }
    ]
  },

  // ================= CHAPTER 16 =================
  {
    chapter: 16,
    verse: 21,
    sanskrit: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः |\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ||",
    transliteration: "tri-vidhaṁ narakasyedaṁ dvāraṁ nāśanam ātmanaḥ\nkāmaḥ krodhas tathā lobhas tasmād etat trayaṁ tyajet",
    translation: "There are three gates leading to this hell—lust, anger and greed. Every sane man should give these up, for they lead to the degradation of the soul.",
    commentary: "Lust (uncontrolled desire), Anger, and Greed are the three root psychological toxins ('kleshas'). They are sequential: unfulfilled desire leads to anger, and satisfied desire leads to greed. They cloud intellect, leading to self-destruction.",
    theme: "Three Gunas",
    words: [
      { word: "त्रिविधम् (tri-vidham)", meaning: "three kinds of" },
      { word: "नरकस्य (narakasya)", meaning: "of hell" },
      { word: "द्वारम् (dvāram)", meaning: "gate / entrance" },
      { word: "नाशनम् (nāśanam)", meaning: "destructive" },
      { word: "आत्मनः (ātmanaḥ)", meaning: "of the soul" },
      { word: "कामः (kāmaḥ)", meaning: "lust / selfish desire" },
      { word: "क्रोधः (krodhaḥ)", meaning: "anger" },
      { word: "लोभः (lobhaḥ)", meaning: "greed" },
      { word: "तस्मात् (tasmāt)", meaning: "therefore" },
      { word: "त्रयम् (trayam)", meaning: "these three" },
      { word: "त्यजेत् (tyajet)", meaning: "one must abandon" }
    ]
  },

  // ================= CHAPTER 17 =================
  {
    chapter: 17,
    verse: 3,
    sanskrit: "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत |\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः ||",
    transliteration: "sattvānurūpā sarvasya śraddhā bhaviṣyati bhārata\nśraddhā-mayo ’yaṁ puruṣo yo yac-chraddhaḥ sa eva saḥ",
    translation: "O descendant of Bharata, according to one's existence under the various modes of nature, one evolves a particular kind of faith. The human being is endowed with faith, and whatever is the object of his faith, that indeed he becomes.",
    commentary: "We are shaped by what we believe. Faith is not just religious belief, but our core conviction about reality, self-worth, and values. What you choose to trust, value, and focus on is what transforms your character and eventually dictates your destiny.",
    theme: "Faith & Belief",
    words: [
      { word: "सत्त्व-अनुरूपा (sattva-anurūpā)", meaning: "according to one's mental constitution" },
      { word: "श्रद्धा (śraddhā)", meaning: "faith / conviction" },
      { word: "भवति (bhavati)", meaning: "becomes / is" },
      { word: "पुरुषः (puruṣaḥ)", meaning: "the human being" },
      { word: "यः यत्-श्रद्धः (yo yat-śraddhaḥ)", meaning: "whatever is his faith" },
      { word: "सः एव सः (sa eva saḥ)", meaning: "that indeed he is" }
    ]
  },

  // ================= CHAPTER 18 =================
  {
    chapter: 18,
    verse: 63,
    sanskrit: "इति ते ज्ञानमाख्यातं गुह्याद्गुह्यतरं मया |\nविमृश्यैतदशेषेण यथेच्छसि तथा कुरु ||",
    transliteration: "iti te jñānam ākhyātaṁ guhyād guhyataraṁ mayā\nvimṛśyaitad aśeṣeṇa yathecchasi tathā kuru",
    translation: "Thus I have explained to you knowledge which is still more confidential. Deliberate on this fully, and then do what you wish to do.",
    commentary: "This is a beautiful declaration of human free will. Krishna does not coerce, threaten, or demand blind obedience. He lays down the ultimate philosophical truth and asks Arjuna to think critically, digest the ideas, and make his own conscious decision. The Divine respects human reason.",
    theme: "Surrender & Seek",
    words: [
      { word: "इति (iti)", meaning: "thus" },
      { word: "ते (te)", meaning: "to you" },
      { word: "ज्ञानम् (jñānam)", meaning: "knowledge" },
      { word: "आख्याताम् (ākhyātam)", meaning: "explained" },
      { word: "गुह्यात् गुह्यतरम् (guhyāt guhyataram)", meaning: "more confidential than the confidential" },
      { word: "मया (mayā)", meaning: "by Me" },
      { word: "विमृश्य (vimṛśya)", meaning: "reflecting / deliberating" },
      { word: "अशेषेण (aśeṣeṇa)", meaning: "fully / completely" },
      { word: "यथा इच्छसि (yathā icchasi)", meaning: "as you wish" },
      { word: "तथा (tathā)", meaning: "so" },
      { word: "कुरु (kuru)", meaning: "do" }
    ]
  },
  {
    chapter: 18,
    verse: 66,
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज |\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ||",
    transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
    translation: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    commentary: "This is the final, ultimate verse of the Gita's teaching (charama shloka). After describing all paths of yoga, Krishna gives the absolute shortcut: let go of the burden of all relative duties, anxieties, and moral codes, and surrender in absolute trust to the Supreme. Love and surrender dissolve all karma and fear.",
    theme: "Surrender & Seek",
    words: [
      { word: "सर्व-धर्मान् (sarva-dharmān)", meaning: "all varieties of duties/religions" },
      { word: "परित्यज्य (parityajya)", meaning: "abandoning / leaving behind" },
      { word: "मम् (mām)", meaning: "to Me" },
      { word: "एकम् (ekam)", meaning: "only" },
      { word: "शरणम् (śaraṇam)", meaning: "shelter / surrender" },
      { word: "व्रज (vraja)", meaning: "go / take" },
      { word: "अहम् (aham)", meaning: "I" },
      { word: "त्वाम् (tvām)", meaning: "you" },
      { word: "सर्व-पापेभ्यः (sarva-pāpebhyo)", meaning: "from all sinful reactions" },
      { word: "मोक्षयिष्यामि (mokṣayiṣyāmi)", meaning: "will liberate" },
      { word: "मा शुचः (mā śucaḥ)", meaning: "do not grieve / do not fear" }
    ]
  }
];
