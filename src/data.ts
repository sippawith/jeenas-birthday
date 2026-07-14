import { Category, SlideData } from './types';

export const categories: Category[] = [
  {
    id: "little-moments",
    title: "โมเมนต์เล็กๆ แต่มีความหมายมากก",
    description: "กุสอนมึงขับรถ มึงสอนคณิตกุ กุสอนคณิตมึง มึงเป่าผม มึงแดกข้าวแล้วส่งรูปมารายงาน โมเม้นต์เล็กๆ แต่กุชอบมากเลยนะะะ",
    placeholders: [
      { label: "📱 Texting / Reporting", filename: "little_moments_1.jpeg" },
      { label: "💨 Drying her hair", filename: "little_moments_2.png" },
      { label: "💨 Drying her hair", filename: "little_moments_3.jpeg" },
      { label: "📞 Calling each other", filename: "little_moments_4.jpeg" },
      { label: "🚗 Driving lessons", filename: "little_moments_5.jpeg" }
    ]
  },
  {
    id: "us-at-play",
    title: "ทำอะไรโง่ๆด้วยกัน",
    description: "เวลาที่พวกกุแค่มีคสด้วยกัน ตีแบด แลหนังซัมเม้อเอ๋อๆของมึง",
    placeholders: [
      { label: "🎨 Painting together", filename: "us_at_play_1.jpeg" },
      { label: "🎨 Painting together", filename: "us_at_play_2.jpeg" },
      { label: "🧱 Building Lego reindeer", filename: "us_at_play_3.jpeg" },
      { label: "🧱 Building Lego reindeer", filename: "us_at_play_4.jpeg" },
      { label: "🧱 Building Lego reindeer", filename: "us_at_play_5.jpeg" },
      { label: "🧱 Building Lego reindeer", filename: "us_at_play_6.jpeg" },
      { label: "🏖️ The Summer I Turned Pretty", filename: "us_at_play_7.jpeg" },
      { label: "🏖️ The Summer I Turned Pretty", filename: "us_at_play_8.jpeg" },
      { label: "🏖️ The Summer I Turned Pretty", filename: "us_at_play_9.png" },
      { label: "🏖️ The Summer I Turned Pretty", filename: "us_at_play_10.png" },
      { label: "🧙‍♀️ Wicked at the theater", filename: "us_at_play_11.jpeg" },
      { label: "🧙‍♀️ Wicked at the theater", filename: "us_at_play_12.jpeg" }
      

    ]
  },
  {
    id: "the-day",
    title: "The Day You Said Yes",
    description: "อ่าวนางบีชช ดอกไม้ที่มึงหยบไว้ในตู้ ละก็นิคที่กุมือดีหยิบได้พรือไม่รุ้้้",
    placeholders: [
      { label: "🦊 Miniso Nick", filename: "the_day_1.png" },
      { label: "💐 Flowers", filename: "the_day_2.png" },
      { label: "🌅 Ao Nang Beach", filename: "the_day_3.JPG" },
      { label: "💍 The Proposal", filename: "the_day_4.JPG" },
      { label: "🥰 Happy Tears", filename: "the_day_5.png" },
      { label: "💍 The Proposal", filename: "the_day_6.JPG" },
      { label: "💍 The Proposal", filename: "the_day_7.PNG" },
    ]
  },
  {
    id: "adventures",
    title: "Adventures Together",
    description: "Exploring the world, one step at a time krabbbb",
    placeholders: [
      { label: "⛰️ Hiking together", filename: "adventures_1.jpg" },
      { label: "🚌 School trip", filename: "adventures_2.jpg" },
      { label: "🎒 On the road", filename: "adventures_3.jpg" },
      { label: "📸 Snapshots", filename: "adventures_4.jpg" },
      { label: "✨ Core memories", filename: "adventures_5.jpg" },
      { label: "✨ Core memories", filename: "adventures_6.jpg" },
      { label: "✨ Core memories", filename: "adventures_7.jpg" },
      { label: "✨ Core memories", filename: "adventures_8.jpg" },
      { label: "✨ Core memories", filename: "adventures_9.jpg" }
    ]
  },
  {
    id: "you-being-you",
    title: "You Being You",
    description: "My favourite version of you♥️",
    placeholders: [
      { label: "🏅 School sports week", filename: "you_being_you_1.jpg" },
      { label: "😂 Laughing", filename: "you_being_you_2.jpg" },
      { label: "🥺 Cute faces", filename: "you_being_you_3.jpg" },
      { label: "🎀 Princess moments", filename: "you_being_you_4.jpg" },
      { label: "💖 Just Jeena", filename: "you_being_you_5.jpg" },
      { label: "💖 Just Jeena", filename: "you_being_you_5.jpg" },
      { label: "💖 Just Jeena", filename: "you_being_you_6.jpg" },
      { label: "💖 Just Jeena", filename: "you_being_you_7.jpg" },
      { label: "💖 Just Jeena", filename: "you_being_you_8.jpg" },
      { label: "💖 Just Jeena", filename: "you_being_you_9.JPG" },
      { label: "💖 Just Jeena", filename: "you_being_you_10.jpg" },
      { label: "💖 Just Jeena", filename: "you_being_you_11.JPG" },
      { label: "💖 Just Jeena", filename: "you_being_you_12.JPG" }
    ]
  }
];

export const slides: SlideData[] = [
  { type: 'intro' },
  { type: 'category', category: categories[0] },
  { type: 'category', category: categories[1] },
  { type: 'game' },
  { type: 'category', category: categories[2] },
  { type: 'category', category: categories[3] },
  { type: 'category', category: categories[4] },
  { type: 'outro' }
];
