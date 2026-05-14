/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo, MouseEvent, FormEvent } from 'react';
import YouTube from 'react-youtube';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Calendar, 
  Users, 
  Gamepad2, 
  Globe, 
  ChevronRight, 
  Play, 
  ExternalLink,
  Trophy,
  RefreshCw,
  ArrowUpDown,
  Send,
  CheckCircle2,
  Sun,
  Moon,
  Heart,
  Image as ImageIcon,
  MessageSquare,
  Upload,
  Plus,
  Share2,
  Check,
  Trash2,
  Search,
  Lock,
  Unlock,
  Shield,
  Instagram,
  CreditCard,
  Wallet,
  Smartphone,
  Landmark,
  Minus,
  Clock,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Data ---

const MEMBERS = [
  { 
    id: 'bangchan', 
    nameKey: 'members.bangchan', 
    role: 'Leader, Producer, Vocalist, Dancer, Rapper', 
    skzoo: 'Wolf Chan', 
    birthday: 'October 3, 1997',
    shortBio: 'The reliable leader and all-rounder producer.',
    color: 'bg-zinc-800', 
    skzooImg: 'https://i.pinimg.com/736x/57/2c/5e/572c5e447da4288a9b452067ae0921fb.jpg',
    soloTracks: ['Connected', 'Baby', 'Drive'],
    recent: 'Produced the title track "GIANT", participated in Met Gala 2024.',
    instagram: 'gnabnahc'
  },
  { 
    id: 'leeknow', 
    nameKey: 'members.leeknow', 
    role: 'Main Dancer, Vocalist, Rapper', 
    skzoo: 'Leebit', 
    birthday: 'October 25, 1998',
    shortBio: 'Captivating dancer with a sharp wit and 4D charm.',
    color: 'bg-zinc-700', 
    skzooImg: 'https://i.pinimg.com/736x/f4/55/16/f455161da6ee920ace2046885f513360.jpg',
    soloTracks: ['Limbo', 'Love Me or Leave Me (Cover)', 'Drive'],
    recent: 'MC for Show! Music Core, main dancer for "Chk Chk Boom".',
    instagram: 't.leeknowsaurus'
  },
  { 
    id: 'changbin', 
    nameKey: 'members.changbin', 
    role: 'Main Rapper, Producer', 
    skzoo: 'Dwaekki', 
    birthday: 'August 11, 1999',
    shortBio: 'Powerful rapper with intense energy and soft heart.',
    color: 'bg-zinc-600', 
    skzooImg: 'https://i.pinimg.com/1200x/b0/00/3e/b0003efa1cbc2a91a3edb6ca4ff33cd5.jpg',
    soloTracks: ['Doodle', 'Streetlight', 'Cypher'],
    recent: 'Participated in producing "ATE" album, collaboration with various artists.',
    instagram: 'jutdwae'
  },
  { 
    id: 'hyunjin', 
    nameKey: 'members.hyunjin', 
    role: 'Main Dancer, Visual, Rapper', 
    skzoo: 'Jiniret', 
    birthday: 'March 20, 2000',
    shortBio: 'Artistic performer known for expressive visual storytelling.',
    color: 'bg-zinc-500', 
    skzooImg: 'https://i.pinimg.com/1200x/d1/03/ec/d103ec39f288a2cad8e80df19d192be1.jpg',
    soloTracks: ['Long for you', 'ice.cream', 'Red Lights'],
    recent: 'Versace Global Ambassador, released solo track "Long for you".',
    instagram: 'hynjinnnn'
  },
  { 
    id: 'han', 
    nameKey: 'members.han', 
    role: 'Main Rapper, Vocalist, Producer', 
    skzoo: 'Han Quokka', 
    birthday: 'September 14, 2000',
    shortBio: 'Genius all-rounder who masters rap, vocals, and production.',
    color: 'bg-zinc-400', 
    skzooImg: 'https://i.pinimg.com/1200x/c0/32/e6/c032e64f1dddd3577400d1b77e43db9e.jpg',
    soloTracks: ['Hold On', 'Volcano', 'Alien'],
    recent: 'Key producer for the Japanese comeback "GIANT".',
    instagram: '_doolsetnet'
  },
  { 
    id: 'felix', 
    nameKey: 'members.felix', 
    role: 'Lead Dancer, Lead Rapper', 
    skzoo: 'BbokAri', 
    birthday: 'September 15, 2000',
    shortBio: 'Iconic deep voice with an angelic, sunshine energy.',
    color: 'bg-zinc-300', 
    skzooImg: 'https://i.pinimg.com/webp70/736x/02/ef/2e/02ef2ea17bd01d38a3f1a85951447f08.webp',
    soloTracks: ['Deep end', 'Rev Up', 'No Problem (feat.)'],
    recent: 'Louis Vuitton House Ambassador, UNICEF donation activities.',
    instagram: 'yong.lixx'
  },
  { 
    id: 'seungmin', 
    nameKey: 'members.seungmin', 
    role: 'Main Vocalist', 
    skzoo: 'PuppyM', 
    birthday: 'September 22, 2000',
    shortBio: 'Diligently powerful vocalist with a clean, emotional tone.',
    color: 'bg-zinc-200', 
    skzooImg: 'https://i.pinimg.com/736x/9f/4b/b2/9f4bb21e5e8c3cb66024739e2d30c565.jpg',
    soloTracks: ['Hold On (Cover)', 'Stars and Raindrops', 'Phobia'],
    recent: 'OST for various popular K-Dramas, Vocal highlight in "ATE".',
    instagram: 'miniseungkim'
  },
  { 
    id: 'i_n', 
    nameKey: 'members.i_n', 
    role: 'Vocalist, Maknae', 
    skzoo: 'FoxI.Ny', 
    birthday: 'February 8, 2001',
    shortBio: 'Adorable youngest with a unique voice and bright charm.',
    color: 'bg-zinc-100', 
    skzooImg: 'https://i.pinimg.com/736x/43/bb/a1/43bba130603ac99db0b8f7d22eb54251.jpg',
    soloTracks: ['Hug Me', 'Maknae on Top', 'Unnamed'],
    recent: 'Alexander McQueen show attendance, vocal growth in recent world tour.',
    instagram: 'i.2.n.8'
  },
];

const DISCOGRAPHY = [
  { 
    id: 'giant', 
    title: 'GIANT', 
    year: '2024', 
    type: 'Japanese Album', 
    cover: 'https://i.pinimg.com/736x/ae/fe/51/aefe51a1f377273edde401682d6140e8.jpg',
    tracks: ['GIANT', 'Christmas Love', 'Night', 'Falling Up', 'WHY?', 'Butterfly', 'Replay', 'GIANT (Inst.)', 'Christmas Love (Inst.)', 'Night (English Ver.)'],
    color: 'from-orange-600 to-orange-950',
    link: 'https://www.youtube.com/watch?v=h21pp5-k9SA&list=OLAK5uy_n8bUr3R4tYeowARvyerfdSQ-uehWi6LHg'
  },
  { 
    id: 'ate', 
    title: 'ATE', 
    year: '2024', 
    type: 'Mini Album', 
    cover: 'https://i.pinimg.com/1200x/c5/f0/63/c5f063d5a3e563a9280c9a766a7da64b.jpg',
    tracks: ['Mountains', 'Chk Chk Boom', 'JJAM', 'I Like It', 'Runners', 'Twilight', 'Stray Kids', 'Chk Chk Boom (Festival Ver.)'],
    color: 'from-blue-600 to-blue-950',
    link: 'https://www.youtube.com/watch?v=80H_-aHTUws&list=OLAK5uy_lg4gB04Dszel6Z-Ec_zY4FInxtI-AAtII'
  },
  { 
    id: 'rockstar', 
    title: 'ROCK-STAR', 
    year: '2023', 
    type: 'Mini Album', 
    cover: 'https://i.pinimg.com/1200x/26/01/fb/2601fb4919e55ff30937e41dbae5ea62.jpg',
    tracks: ['MEGAVERSE', 'LALALALA', 'Blind Spot', 'COMFLEX', 'Cover Me', 'Leave', 'Social Path (feat. LiSA) (Korean Ver.)', 'LALALALA (Rock Ver.)'],
    color: 'from-zinc-600 to-zinc-950',
    link: 'https://www.youtube.com/watch?v=JqwPCzJnYyY&list=OLAK5uy_mOoN01WE6XACoMuB3w0FkqEUi7NFMUKKo'
  },
  { 
    id: 'fivestar', 
    title: '5-STAR', 
    year: '2023', 
    type: 'Studio Album', 
    cover: 'https://i.pinimg.com/736x/65/00/6c/65006c6599f3aa76737d23052bb53cf2.jpg',
    tracks: ['Hall of Fame', 'S-Class', 'Item', 'Super Bowl', 'Topline (feat. Tiger JK)', 'DLC', 'Get Lit', 'Collision', 'FNF', 'Youtiful', 'THE SOUND (Korean Ver.)', 'Time Out'],
    color: 'from-amber-600 to-amber-950',
    link: 'https://www.youtube.com/watch?v=XRx2vo9UeWg&list=OLAK5uy_mGR39h6icJO17k4NADkXvFpIFgniqVRb4'
  },
  { 
    id: 'maxident', 
    title: 'MAXIDENT', 
    year: '2022', 
    type: 'Mini Album', 
    cover: 'https://i.pinimg.com/736x/94/dc/c6/94dcc66a4943efa98ed2d19ce19d6a38.jpg',
    tracks: ['CASE 143', 'CHILL', 'Give Me Your TMI', 'SUPER BOARD', '3RACHA', 'TASTE', 'Can\'t Stop', 'CIRCUS (Korean Ver.)'],
    color: 'from-pink-600 to-pink-950',
    link: 'https://www.youtube.com/watch?v=jYSlpC6Ud2A&list=OLAK5uy_m0KIk3NbEwgzYF6Ott8szRxnXfzvOfDRk'
  },
];

const SONG_LYRICS: Record<string, string> = {
  'GIANT': `I'm a giant, walk with me
I'm a giant, can you see?
Stray Kids everywhere all around the world
We won't stop, we won't quit
Scaling up the giant wall
Breaking through the ceiling now
Watch us rise above it all
I'm a giant, hear the sound
Shaking up the very ground!`,
  'Chk Chk Boom': `Chk chk boom, chk chk boom
Now we're coming for the throne
Boom boom boom, let it go
Everything we do is bold
Catch us if you can, we're fast
Making music that will last
Boom, boom, Chk chk boom!
Target locked, we hit it right
Shining in the dark of night`,
  'S-Class': `Bling-bling, shining like a star
S-Class, we are who we are
I'm the most special, unique
The one they all want to seek
Scale it up, higher now
Taking all the crowns, somehow
Seoul city, special class
Watch us as the moments pass
Bling, bling, S-Class!`,
  'CASE 143': '143, I love you\nIt\'s a code, it\'s an emergency\nMy heart is beating fast\nWhy am I like this?',
  'LALALALA': `Just feel the rhythm now
Lalalala, lalalala
Rocking the stage tonight
No limits, only Stray Kids!
Heart is beating boom boom boom
Cuz we're about to rock the room
Feel the vibe and let it go
Stray Kids show!`,
  'God\'s Menu': 'Welcome, it\'s our menu\nCooking up some tracks today\nSpicy, salty, everything you like\nStray Kids style!',
  'Back Door': 'Knock knock, knock knock\nWelcome to the back door\nAuthorized only, but come in\nLet\'s party!',
  'Thunderous': 'Free like the wind, thunderous roar\nPa, pa, pa, breaking boundaries\nWe are the storm that\'s coming\nWatch us rise!',
  'Maniac': 'Maniac, manic mode\nJust like Frankenstein\nEveryone is a bit crazy\nWe just embrace it better!',
  'Christmas Love': 'Falling like the snow tonight\nChristmas love in every light\nHolding hands, staying warm\nYou are the star of my holiday...',
  'Mountains': `Climbing over mountains high
Touching the clouds in the sky
Never looking down at the pain
Only forward to the gain
Stray Kids reaching for the peak
Stronger than the ones who are weak
We'll never stop until we're there
Fresh air everywhere!`
};

interface DiscographyTrackProps {
  track: string;
  index: number;
  color?: string;
  key?: string; // Explicitly adding key to satisfy TS in this environment
}

const DiscographyTrack = ({ track, index, color }: DiscographyTrackProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const lyrics = SONG_LYRICS[track] || 'Lyrics coming soon for this track... \nWe are working on bringing more content to you as soon as possible! \nStray Kids Everywhere All Around The World.';

  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group/track p-4 rounded-lg hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
           <span className="text-zinc-600 font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
           <span className={`font-bold tracking-tight transition-colors ${isOpen ? 'text-red-500' : 'text-zinc-200 group-hover/track:text-white'}`}>{track}</span>
        </div>
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronRight className="w-4 h-4 text-red-500 rotate-90 transition-transform" /> : <ChevronRight className="w-4 h-4 text-zinc-700" />}
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-12 pb-6"
          >
            <div className={`p-5 rounded-2xl bg-zinc-900/50 border-l-4 ${color?.split(' ')[0].replace('from-', 'border-') || 'border-red-600'} backdrop-blur-md shadow-inner`}>
              <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3 opacity-70 flex justify-between items-center">
                <span>Lyrics</span>
                <div className="w-12 h-1 bg-white/10 rounded-full" />
              </div>
              <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                <pre className="text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap italic">
                  {lyrics}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MERCHANDISE = [
  { id: 'lightstick', nameKey: 'merch.lightstick', item: 'Official Lightstick Ver.2', price: '$55.00', img: 'https://m.cn.thejypshop.com/web/product/big/202306/25bd1244c037b7f658f78266f5604e19.jpg' },
  { id: 'plush', nameKey: 'merch.plush', item: 'SKZOO Plush', price: '$35.00', img: 'https://cdn.cybassets.com/media/W1siZiIsIjMyMzE5L3Byb2R1Y3RzLzY1NTQ0OTUxLzE3NzE4NDcyMDRfYzQ1ZmYwOTQ2ZGYzODU3MjVhYTIucG5nIl1d.png?sha=c94e41bb9095e204' },
  { id: 'photocard', nameKey: 'merch.photocard', item: 'Photocard Set', price: '$15.00', img: 'https://down-tw.img.susercontent.com/file/sg-11134207-7rdvu-lyb055lx5ygae3' },
  { id: 'pen', nameKey: 'merch.pen', item: 'Official Pen', price: '$8.00', img: 'https://m.cn.thejypshop.com/web/product/big/202403/961d290edc7fbbebedb381d9412d88dc.jpg' },
  { id: 'jacket', nameKey: 'merch.jacket', item: 'World Tour Jacket', price: '$85.00', img: 'https://www.funiki.nl/cdn/shop/files/FunikiEuropeWebshopK-PopT-PopBLBoysLoveWebshopStrayKidsSKZOOalbumpopupshopdominatecelebratekoreajapanexclusivepre-orderbenefitpobalbumplushdollphotocardBangChanLeeKnowChangbinHyunjinH.jpg?v=1759320034' },
];

const SCHEDULE = [
  { 
    date: '2024.04.15', 
    event: 'World Tour [dominATE] - Seoul', 
    type: 'Concert', 
    location: 'KSPO Dome', 
    time: '18:00 KST',
    details: 'The massive world tour kicks off in Seoul! Experience the electrifying performances and new tracks live. Tickets available at Global Interpark.'
  },
  { 
    date: '2024.04.20', 
    event: 'Music Bank Performance', 
    type: 'TV', 
    location: 'KBS Hall', 
    time: '17:00 KST',
    details: 'Live performance of "GIANT" on Music Bank. Special stage prepared for the comeback week.'
  },
  { 
    date: '2024.04.25', 
    event: 'Inkigayo Special Stage', 
    type: 'TV', 
    location: 'SBS Prism Tower', 
    time: '15:20 KST',
    details: 'Don\'t miss the stunning visual performance on Inkigayo. Includes a special interview segment with the members.'
  },
  { 
    date: '2024.05.02', 
    event: 'New Single Release', 
    type: 'Release', 
    location: 'Online', 
    time: '13:00 KST',
    details: 'Global digital release of the Japanese single "GIANT". Available on Spotify, Apple Music, and YouTube Music.'
  },
  { 
    date: '2024.05.05', 
    event: 'Children\'s Day Special V-Live', 
    type: 'Broadcast', 
    location: 'V-Studio', 
    time: '14:00 KST',
    details: 'A cozy live stream to celebrate Children\'s Day with STAY. Expect games, Q&A, and a peek into our daily lives.'
  },
  { 
    date: '2024.05.10', 
    event: 'Fan Meeting [SKZ-REPLAY]', 
    type: 'Event', 
    location: 'Jamsil Arena', 
    time: '19:30 KST',
    details: 'Exclusive fan meeting for certified STAY members. Fan participation events and special acoustic performances.'
  },
  { 
    date: '2024.05.18', 
    event: 'World Tour [dominATE] - Tokyo', 
    type: 'Concert', 
    location: 'Tokyo Dome', 
    time: '18:30 JST',
    details: 'Day 1 of the Tokyo Dome concerts. Witness the scale of dominATE in Japan\'s iconic venue.'
  },
  { 
    date: '2024.05.19', 
    event: 'World Tour [dominATE] - Tokyo', 
    type: 'Concert', 
    location: 'Tokyo Dome', 
    time: '17:00 JST',
    details: 'Day 2 of Tokyo Dome. The grand finale of the Tokyo leg with special surprise announcements expected.'
  },
  { 
    date: '2024.05.25', 
    event: 'Magazine Photoshoot', 
    type: 'Event', 
    location: 'Seoul Studio', 
    time: '10:00 KST',
    details: 'Editorial photoshoot for the June issue of Dazed Korea. Concept: "Primal Energy".'
  },
  { 
    date: '2024.06.02', 
    event: 'SKZ-CODE Episode Release', 
    type: 'Release', 
    location: 'YouTube', 
    time: '20:00 KST',
    details: 'Episode 54 of SKZ-CODE. Watch the members tackle a mystery escape room challenge.'
  },
  { 
    date: '2024.06.08', 
    event: 'World Tour [dominATE] - Osaka', 
    type: 'Concert', 
    location: 'Kyocera Dome', 
    time: '18:00 JST',
    details: 'The energy continues in Osaka! Bringing the dominATE atmosphere to Kyocera Dome.'
  },
];

const SKZOO_CHARACTERS = [
  { id: 'wolfchan', name: 'Wolf Chan', emoji: '🐺', color: 'from-zinc-500/30 to-zinc-800/60', particle: '✨', bgElements: ['🌙', '⭐', '☁️'], bioKey: 'game.characters.wolfchan' },
  { id: 'leebit', name: 'Leebit', emoji: '🐰', color: 'from-green-500/30 to-green-800/60', particle: '🥕', bgElements: ['🥕', '🥬', '🍀'], bioKey: 'game.characters.leebit' },
  { id: 'dwaekki', name: 'Dwaekki', emoji: '🐷', color: 'from-pink-500/30 to-pink-800/60', particle: '💪', bgElements: ['💪', '❤️', '🍕'], bioKey: 'game.characters.dwaekki' },
  { id: 'jiniret', name: 'Jiniret', emoji: '🦦', color: 'from-white/20 to-zinc-400/40', particle: '💎', bgElements: ['💎', '✨', '🎨'], bioKey: 'game.characters.jiniret' },
  { id: 'hanquokka', name: 'Han Quokka', emoji: '🐹', color: 'from-amber-700/30 to-amber-900/60', particle: '🍰', bgElements: ['🍰', '🎸', '🐿️'], bioKey: 'game.characters.hanquokka' },
  { id: 'bbokari', name: 'BbokAri', emoji: '🐥', color: 'from-yellow-400/30 to-yellow-600/60', particle: '☀️', bgElements: ['☀️', '🐣', '🌻'], bioKey: 'game.characters.bbokari' },
  { id: 'puppym', name: 'PuppyM', emoji: '🐶', color: 'from-blue-400/30 to-blue-600/60', particle: '🦴', bgElements: ['🦴', '🐾', '🎾'], bioKey: 'game.characters.puppym' },
  { id: 'foxiny', name: 'FoxI.Ny', emoji: '🦊', color: 'from-orange-500/30 to-orange-700/60', particle: '🍞', bgElements: ['🍞', '🦊', '🔥'], bioKey: 'game.characters.foxiny' },
];

const MUSIC_VIDEOS = [
  { id: '0P0aQreFs8w', title: 'Stray Kids "Chk Chk Boom" M/V' },
  { id: 'dBDkYofMUs4', title: 'Stray Kids "樂 (LALALALA)" M/V' },
  { id: 'JsOOis4bBFg', title: 'Stray Kids "特 (S-Class)" M/V' },
  { id: 'OvioeS1ZZ7o', title: 'Stray Kids "MANIAC" M/V' },
  { id: 'TQTlCHxyuu8', title: 'Stray Kids "神메뉴 (God\'s Menu)" M/V' },
  { id: 'EaswWiwMVs8', title: 'Stray Kids "소리꾼 (Thunderous)" M/V' },
  { id: 'jYSlpC6Ud2A', title: 'Stray Kids "CASE 143" M/V' },
  { id: 'X-uJtV8ScYk', title: 'Stray Kids "Back Door" M/V' },
];

// --- Components ---

const ChristopherTrainingHub = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (password === '1003') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const trainingVideos = [
    { id: 'feXZlajcRU0', title: '背部訓練', type: 'youtube' },
    { id: 'OEEjMxlxgX8', title: '胸部訓練', type: 'youtube' },
    { id: 'env5RtxZovU', title: '手部訓練', type: 'youtube' }
  ];

  return (
    <section id="traininghub" className="py-32 px-6 bg-zinc-950 text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-2xl"
          >
            {isUnlocked ? (
              <Unlock className="w-10 h-10 text-green-500" />
            ) : (
              <Lock className="w-10 h-10 text-red-600" />
            )}
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 italic">
            Christopher's <span className="text-red-600">Training Hub</span>
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-xs font-bold">{t('training.subtitle')}</p>
        </div>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="lock-screen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
                {/* Border Glow */}
                <div className="absolute inset-0 border border-red-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-center font-bold text-zinc-400 mb-8 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-red-600" /> {t('training.lockTitle')}
                </h3>

                <form onSubmit={handleUnlock} className="space-y-6">
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder={t('training.placeholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`h-16 bg-black/50 border-white/10 rounded-2xl text-center text-2xl font-mono tracking-[0.3em] transition-all focus:ring-red-600/50 ${error ? 'border-red-600 animate-shake' : ''}`}
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-[10px] text-center font-black uppercase tracking-widest mt-2"
                      >
                        {t('training.error')}
                      </motion.p>
                    )}
                  </div>
                  <Button 
                    type="submit"
                    className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-widest"
                  >
                    {t('training.button')}
                  </Button>
                </form>
                
                <div className="mt-10 pt-8 border-t border-white/5 text-center">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-loose">
                    {t('training.footer')}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {trainingVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="group"
                >
                  <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-red-600/50 transition-colors h-full flex flex-col">
                    <div className="aspect-video relative bg-black flex items-center justify-center">
                      {video.type === 'youtube' ? (
                        <YouTube 
                          videoId={video.id} 
                          opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                              autoplay: 0,
                              modestbranding: 1,
                              rel: 0,
                            }
                          }}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center gap-4">
                          <ImageIcon className="w-12 h-12 text-zinc-700 mb-2" />
                          <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Pinterest 影片檔案</p>
                          <a 
                            href={video.id} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-6 py-3 rounded-full font-black uppercase tracking-widest flex items-center gap-2"
                          >
                            點此觀看影片 <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="p-6 mt-auto">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">RECORD {idx + 1}</span>
                      </div>
                      <h4 className="text-xl font-bold tracking-tight text-white">{video.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 dark:bg-black/80 backdrop-blur-md border-b border-border dark:border-white/10 px-6 py-4 flex justify-between items-center transition-colors">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-600 flex items-center justify-center font-bold text-white rounded-sm">SKZ</div>
        <span className="font-bold text-xl tracking-tighter text-foreground dark:text-white hidden sm:block">STRAY KIDS WORLD</span>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground dark:text-zinc-400">
          <a href="#members" className="hover:text-foreground dark:hover:text-white transition-colors">{t('nav.members')}</a>
          <a href="#music" className="hover:text-foreground dark:hover:text-white transition-colors">{t('nav.music')}</a>
          <a href="#videos" className="hover:text-foreground dark:hover:text-white transition-colors">{t('music.videos')}</a>
          <a href="#schedule" className="hover:text-foreground dark:hover:text-white transition-colors">{t('nav.schedule')}</a>
          <a href="#traininghub" className="hover:text-foreground dark:hover:text-white transition-colors">{t('nav.training')}</a>
          <a href="#merch" className="hover:text-foreground dark:hover:text-white transition-colors">{t('nav.merch')}</a>
          <a href="#game" className="hover:text-foreground dark:hover:text-white transition-colors">{t('nav.game')}</a>
          <a href="#fanzone" className="hover:text-foreground dark:hover:text-white transition-colors">{t('nav.fanZone')}</a>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-md hover:bg-accent dark:hover:bg-white/10 text-foreground dark:text-white"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent dark:hover:bg-white/10 h-9 w-9 text-foreground dark:text-white">
              <Globe className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('zh')}>繁體中文</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

const INITIAL_SUBMISSIONS = [
  { id: 1, name: 'Stay_Art', type: 'art', content: 'https://i.pinimg.com/736x/92/ab/48/92ab482b964ea385cd161b28c98d2008.jpg', message: 'I drew Bang Chan!', likes: 124 },
  { id: 2, name: 'FelixLover', type: 'message', content: null, message: 'Felix your voice is amazing! Stay healthy!', likes: 89 },
  { id: 3, name: 'SKZ_Fan_99', type: 'art', content: 'https://i.pinimg.com/736x/66/b1/2f/66b12f75c7a244d708efe5bedee7de39.jpg', message: 'Group fanart for the new comeback', likes: 256 },
];

const FanZone = () => {
  const { t } = useTranslation();
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('skz_fan_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [userLikedIds, setUserLikedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('skz_user_liked_ids');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('skz_fan_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('skz_user_liked_ids', JSON.stringify(userLikedIds));
  }, [userLikedIds]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'likes'>('date');

  const filteredAndSortedSubmissions = useMemo(() => {
    let result = submissions.filter((sub: any) => 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sub.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'likes') {
      result = [...result].sort((a, b) => b.likes - a.likes);
    } else {
      result = [...result].sort((a, b) => b.id - a.id);
    }

    return result;
  }, [submissions, searchQuery, sortBy]);

  const handleShare = (id: number) => {
    const url = `${window.location.origin}${window.location.pathname}#fanzone-${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleLike = (id: number) => {
    if (userLikedIds.includes(id)) {
      setSubmissions((prev: any[]) => prev.map(s => s.id === id ? { ...s, likes: s.likes - 1 } : s));
      setUserLikedIds(prev => prev.filter(i => i !== id));
    } else {
      setSubmissions((prev: any[]) => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
      setUserLikedIds(prev => [...prev, id]);
    }
  };

  const [submissionToDelete, setSubmissionToDelete] = useState<number | null>(null);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

  const confirmDelete = () => {
    if (submissionToDelete) {
      setSubmissions((prev: any[]) => prev.filter(s => s.id !== submissionToDelete));
      setSubmissionToDelete(null);
    }
  };
  const [newSubmission, setNewSubmission] = useState({
    name: '',
    type: 'art',
    message: '',
    image: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submission = {
      id: Date.now(),
      name: newSubmission.name || 'Anonymous Stay',
      type: newSubmission.type,
      content: newSubmission.type === 'art' ? (newSubmission.image || 'https://i.pinimg.com/736x/66/b1/2f/66b12f75c7a244d708efe5bedee7de39.jpg') : null,
      message: newSubmission.message,
      likes: 0
    };
    setSubmissions([submission, ...submissions]);
    setNewSubmission({ name: '', type: 'art', message: '', image: '' });
    setIsDialogOpen(false);
    setShowSubmitSuccess(true);
    setTimeout(() => setShowSubmitSuccess(false), 4000);
  };

  return (
    <section id="fanzone" className="py-32 px-6 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-left">
          <div className="w-full">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground">{t('fanZone.title')}</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 gap-6">
              <p className="text-muted-foreground dark:text-zinc-500 uppercase tracking-widest font-bold">{t('fanZone.subtitle')}</p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input 
                    placeholder="Search Stay content..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background dark:bg-zinc-900 border-border dark:border-white/10 rounded-full h-12"
                  />
                </div>
                <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
                  <SelectTrigger className="w-full sm:w-40 bg-background dark:bg-zinc-900 border-border dark:border-white/10 rounded-full h-12 font-bold text-xs uppercase tracking-widest">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Newest First</SelectItem>
                    <SelectItem value="likes">Most Liked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {showSubmitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -100, x: '-50%' }}
                animate={{ opacity: 1, y: 32, x: '-50%' }}
                exit={{ opacity: 0, y: -100, x: '-50%' }}
                className="fixed top-0 left-1/2 z-[100] bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-green-600/20 flex items-center gap-3 font-bold border border-white/20 backdrop-blur-md"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">{t('fanZone.success')}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-red-600/20">
                <Plus className="w-5 h-5 mr-2" />
                {t('fanZone.uploadCta')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-card dark:bg-zinc-900 border-border dark:border-white/10">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">{t('fanZone.uploadTitle')}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {t('fanZone.uploadDesc')}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 py-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{t('fanZone.labelName')}</label>
                  <Input 
                    placeholder={t('fanZone.placeholderName')}
                    value={newSubmission.name}
                    onChange={e => setNewSubmission({...newSubmission, name: e.target.value})}
                    className="bg-background dark:bg-black/50 border-border dark:border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{t('fanZone.labelType')}</label>
                  <Select 
                    value={newSubmission.type} 
                    onValueChange={(val) => setNewSubmission({...newSubmission, type: val})}
                  >
                    <SelectTrigger className="bg-background dark:bg-black/50 border-border dark:border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="art">{t('fanZone.typeArt')}</SelectItem>
                      <SelectItem value="message">{t('fanZone.typeMessage')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newSubmission.type === 'art' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{t('fanZone.labelImage')} (URL)</label>
                    <div className="flex gap-4 items-start">
                      <div className="flex-grow">
                        <div className="flex gap-2">
                          <Input 
                            placeholder="https://..."
                            value={newSubmission.image}
                            onChange={e => setNewSubmission({...newSubmission, image: e.target.value})}
                            className="bg-background dark:bg-black/50 border-border dark:border-white/10"
                          />
                          <Button type="button" variant="outline" size="icon" className="shrink-0 border-border dark:border-white/10">
                            <Upload className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="shrink-0 w-16 h-16 rounded-xl border border-border dark:border-white/10 bg-muted dark:bg-black/40 flex items-center justify-center overflow-hidden shadow-inner group/preview relative">
                        <AnimatePresence mode="wait">
                          {newSubmission.image ? (
                            <motion.img 
                              key={newSubmission.image}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              src={newSubmission.image} 
                              className="w-full h-full object-cover" 
                              alt="Preview"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.5 }}
                              className="flex flex-col items-center gap-1"
                            >
                              <ImageIcon className="w-5 h-5 text-zinc-400" />
                              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Preview</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{t('fanZone.labelMessage')}</label>
                  <Textarea 
                    placeholder={t('fanZone.placeholderMessage')}
                    value={newSubmission.message}
                    onChange={e => setNewSubmission({...newSubmission, message: e.target.value})}
                    className="bg-background dark:bg-black/50 border-border dark:border-white/10 min-h-[100px]"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold">
                    {t('fanZone.submit')}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={submissionToDelete !== null} onOpenChange={(open) => !open && setSubmissionToDelete(null)}>
          <DialogContent className="sm:max-w-[425px] bg-card dark:bg-zinc-900 border-border dark:border-white/10">
            <DialogHeader>
              <DialogTitle className="text-foreground">Confirm Deletion</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Are you sure you want to delete this submission? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0 mt-4">
              <Button variant="outline" onClick={() => setSubmissionToDelete(null)} className="border-border dark:border-white/10">
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredAndSortedSubmissions.map((sub: any) => (
            <motion.div
              key={sub.id}
              id={`fanzone-${sub.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="break-inside-avoid"
            >
              <Card className="bg-card dark:bg-zinc-900 border-border dark:border-white/5 overflow-hidden group hover:shadow-xl transition-all duration-300">
                {sub.type === 'art' && sub.content && (
                  <div className="relative overflow-hidden">
                    <img 
                      src={sub.content} 
                      alt="Fan Art" 
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600 text-white border-none">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        {t('fanZone.typeArt')}
                      </Badge>
                    </div>
                  </div>
                )}
                <CardHeader className="p-6">
                  {sub.type === 'message' && (
                    <div className="mb-4">
                      <Badge variant="outline" className="border-red-600/30 text-red-600">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {t('fanZone.typeMessage')}
                      </Badge>
                    </div>
                  )}
                  <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center text-red-600 text-xs font-black">
                      {sub.name.charAt(0).toUpperCase()}
                    </div>
                    {sub.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-muted-foreground dark:text-zinc-400 italic leading-relaxed">
                    "{sub.message}"
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLike(sub.id)}
                        className={`flex items-center gap-2 transition-colors group/like ${
                          userLikedIds.includes(sub.id) ? 'text-red-500' : 'text-zinc-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${userLikedIds.includes(sub.id) ? 'fill-red-500' : 'group-hover/like:fill-red-500'}`} />
                        <span className="text-xs font-mono">{sub.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleShare(sub.id)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-blue-500 transition-colors group/share"
                      >
                        {copiedId === sub.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Share2 className="w-4 h-4 group-hover/share:text-blue-500" />
                        )}
                        <span className="text-[10px] uppercase tracking-widest font-bold">
                          {copiedId === sub.id ? 'Copied!' : 'Share'}
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setSubmissionToDelete(sub.id)}
                        className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors"
                        title="Delete submission"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Verified Stay</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredAndSortedSubmissions.length === 0 && (
          <div className="text-center py-24 bg-zinc-100 dark:bg-zinc-900/30 rounded-3xl border border-dashed border-border dark:border-white/5">
            <div className="flex flex-col items-center gap-4">
               <Search className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
               <div>
                 <p className="text-foreground font-bold text-xl">{t('fanZone.noContent')}</p>
                 <p className="text-muted-foreground text-sm mt-1">Try adjusting your search or be the first to share something!</p>
               </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const SKZOOGame = () => {
  const { t } = useTranslation();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSkzoo, setActiveSkzoo] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; char: string }[]>([]);

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
    setTimeLeft(30);
  };

  const catchSkzoo = (index: number, e: MouseEvent) => {
    if (index === activeSkzoo) {
      // Play playful catch sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
      audio.volume = 0.4;
      audio.play().catch(() => {}); // Ignore errors if browser blocks autoplay

      setScore(s => s + 1);
      
      // Add particles
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        char: SKZOO_CHARACTERS[index].particle
      }));
      setParticles(prev => [...prev, ...newParticles]);
      
      setActiveSkzoo(null);
      
      // Clean up particles
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 1000);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
        setActiveSkzoo(Math.floor(Math.random() * 8));
      }, 800);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setActiveSkzoo(null);
      if (score > highScore) setHighScore(score);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  return (
    <section id="game" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden transition-colors">
      {/* Particle Overlay */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{ 
              x: p.x + (Math.random() - 0.5) * 200, 
              y: p.y + (Math.random() - 0.5) * 200 - 100, 
              opacity: 0,
              scale: 0.5,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed z-[100] pointer-events-none text-2xl"
          >
            {p.char}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-5xl font-bold tracking-tighter text-foreground mb-2">{t('game.title')}</h2>
            <p className="text-muted-foreground dark:text-zinc-500">{t('game.instructions')}</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-card dark:bg-zinc-900 p-4 rounded-xl border border-border dark:border-white/5 min-w-[120px] shadow-sm">
              <div className="text-xs text-muted-foreground dark:text-zinc-500 uppercase font-bold mb-1">{t('game.score')}</div>
              <motion.div 
                key={score}
                initial={{ scale: 1.2, color: "#ef4444" }}
                animate={{ scale: 1, color: "#ef4444" }}
                className="text-3xl font-mono"
              >
                {score}
              </motion.div>
            </div>
            <div className="bg-card dark:bg-zinc-900 p-4 rounded-xl border border-border dark:border-white/5 min-w-[120px] shadow-sm">
              <div className="text-xs text-muted-foreground dark:text-zinc-500 uppercase font-bold mb-1">{t('game.highScore')}</div>
              <div className="text-3xl font-mono text-foreground dark:text-white">{highScore}</div>
            </div>
          </div>
        </div>

        <div className="relative aspect-video bg-card dark:bg-zinc-900 rounded-3xl border border-border dark:border-white/10 overflow-visible grid grid-cols-4 gap-4 p-8 shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {!isPlaying && (
            <div className="absolute inset-0 z-10 bg-background/60 dark:bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
              <Gamepad2 className="w-16 h-16 text-red-600 mb-4" />
              <Button size="lg" onClick={startGame} className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-xl rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                {t('game.start')}
              </Button>
            </div>
          )}
          
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="relative flex items-center justify-center bg-muted/50 dark:bg-zinc-800/30 rounded-2xl border border-border dark:border-white/5 group/char">
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <AnimatePresence>
                  {activeSkzoo === i && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 bg-gradient-to-t ${SKZOO_CHARACTERS[i].color} blur-xl`}
                      />
                      {/* Background Elements */}
                      {SKZOO_CHARACTERS[i].bgElements.map((el, elIdx) => (
                        <motion.div
                          key={elIdx}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: 0.4, 
                            scale: 1,
                            x: [0, (elIdx % 2 === 0 ? 30 : -30), 0],
                            y: [0, (elIdx < 2 ? -30 : 30), 0],
                            rotate: [0, 10, -10, 0]
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: elIdx * 0.2,
                            ease: "easeInOut"
                          }}
                          className="absolute text-2xl pointer-events-none"
                          style={{
                            top: elIdx < 2 ? '20%' : '60%',
                            left: elIdx % 2 === 0 ? '20%' : '70%',
                          }}
                        >
                          {el}
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
                
                <AnimatePresence>
                  {activeSkzoo === i && (
                    <motion.button
                      initial={{ y: 120, opacity: 0, scale: 0.5 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ 
                        scale: [1, 1.8, 0], 
                        rotate: [0, 180, 360],
                        opacity: [1, 1, 0],
                        filter: ["blur(0px)", "blur(0px)", "blur(10px)"],
                        transition: { 
                          duration: 0.4,
                          times: [0, 0.4, 1],
                          ease: "easeOut"
                        }
                      }}
                      whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => catchSkzoo(i, e)}
                      className="text-7xl z-10 cursor-pointer drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] absolute inset-0 flex items-center justify-center"
                    >
                      {SKZOO_CHARACTERS[i].emoji}
                    </motion.button>
                  )}
                </AnimatePresence>
                <div className="absolute bottom-0 w-full h-6 bg-muted/80 dark:bg-zinc-900/80 backdrop-blur-sm" />
              </div>

              {/* Tooltip (Outside overflow-hidden) */}
              <AnimatePresence>
                {activeSkzoo === i && (
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 bg-card dark:bg-black/95 backdrop-blur-md border border-border dark:border-white/10 p-3 rounded-xl pointer-events-none z-30 opacity-0 group-hover/char:opacity-100 group-hover/char:-translate-y-2 transition-all duration-300 shadow-2xl">
                    <div className="text-xs font-bold text-red-500 uppercase mb-1">{SKZOO_CHARACTERS[i].name}</div>
                    <div className="text-[10px] text-muted-foreground dark:text-zinc-300 leading-tight">
                      {t(`game.characters.${SKZOO_CHARACTERS[i].id}`)}
                    </div>
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-card dark:bg-black/95 border-r border-b border-border dark:border-white/10 rotate-45" />
                  </div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="absolute top-4 right-4 bg-background/60 dark:bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-foreground dark:text-white font-mono border border-border dark:border-white/10">
            TIME: {timeLeft}s
          </div>
        </div>

        {/* Character Guide Section */}
        <div className="mt-20">
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-8 text-center">{t('game.characterGuide')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SKZOO_CHARACTERS.map((skzoo) => (
              <motion.div
                key={skzoo.id}
                whileHover={{ y: -5 }}
                className="bg-card dark:bg-zinc-900 border border-border dark:border-white/5 p-6 rounded-3xl text-center group transition-all duration-300 hover:shadow-xl hover:border-red-600/30"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${skzoo.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {skzoo.emoji}
                </div>
                <h4 className="text-sm font-bold text-foreground mb-2">{skzoo.name}</h4>
                <p className="text-[10px] text-muted-foreground dark:text-zinc-400 font-medium leading-relaxed italic">
                  {t(skzoo.bioKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [sortOrder, setSortOrder] = useState<'default' | 'lowToHigh' | 'highToLow'>('default');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [favoriteMerchIds, setFavoriteMerchIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skz_favorite_merch');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('skz_favorite_merch', JSON.stringify(favoriteMerchIds));
  }, [favoriteMerchIds]);

  const toggleFavoriteMerch = (id: string) => {
    setFavoriteMerchIds(prev => 
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const [selectedVideo, setSelectedVideo] = useState(MUSIC_VIDEOS[0].id);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideosListLoading, setIsVideosListLoading] = useState(true);
  const [loadedThumbnails, setLoadedThumbnails] = useState<Record<string, boolean>>({});
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [scheduleFilters, setScheduleFilters] = useState<string[]>(['All']);
  const [selectedEvent, setSelectedEvent] = useState<typeof SCHEDULE[0] | null>(null);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [musicSearchQuery, setMusicSearchQuery] = useState('');
  const [selectedMerchItem, setSelectedMerchItem] = useState<any>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'bank' | 'apple'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    holder: ''
  });
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success'>('details');

  const filteredDiscography = useMemo(() => {
    return DISCOGRAPHY.filter(album => 
      album.title.toLowerCase().includes(musicSearchQuery.toLowerCase()) ||
      album.tracks.some(track => track.toLowerCase().includes(musicSearchQuery.toLowerCase()))
    );
  }, [musicSearchQuery]);

  const selectedMember = MEMBERS.find(m => m.id === selectedMemberId);
  const activeAlbum = DISCOGRAPHY.find(a => a.id === activeAlbumId);

  const countdownEvent = SCHEDULE[0]; // Nearest event
  const [timeLeftToNextEvent, setTimeLeftToNextEvent] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const eventDate = new Date(countdownEvent.date.replace(/\./g, '/')).getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        setTimeLeftToNextEvent('Happening Now!');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeftToNextEvent(`${days}d ${hours}h left`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleScheduleFilter = (type: string) => {
    if (type === 'All') {
      setScheduleFilters(['All']);
      return;
    }

    setScheduleFilters(prev => {
      let next = prev.filter(f => f !== 'All');
      if (next.includes(type)) {
        next = next.filter(f => f !== type);
        return next.length === 0 ? ['All'] : next;
      } else {
        return [...next, type];
      }
    });
  };

  const filteredSchedule = scheduleFilters.includes('All') 
    ? SCHEDULE 
    : SCHEDULE.filter(s => scheduleFilters.includes(s.type));

  const getCalendarLink = (event: any) => {
    const title = encodeURIComponent(event.event);
    const details = encodeURIComponent(`${event.type} @ ${event.location}`);
    const date = event.date.replace(/\./g, '');
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${date}/${date}`;
  };

  const handleBuyNow = (item: any) => {
    setSelectedMerchItem(item);
    setPurchaseQuantity(1);
    setPaymentMethod('card');
    setCardDetails({ number: '', expiry: '', cvc: '', holder: '' });
    setIsPaymentDialogOpen(true);
    setPaymentStep('details');
  };

  const processPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
    }, 2000);
  };

  useEffect(() => {
    // Simulate fetching video data
    const timer = setTimeout(() => setIsVideosListLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsVideoLoading(true);
  }, [selectedVideo]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const sortedMerch = [...MERCHANDISE].sort((a, b) => {
    if (sortOrder === 'default') return 0;
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    return sortOrder === 'lowToHigh' ? priceA - priceB : priceB - priceA;
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-red-600 selection:text-white font-sans transition-colors">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          {/* Black and Red Smoke/Dye Effect */}
          <div className="absolute inset-0 bg-background transition-colors" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.2)_0%,transparent_50%)] blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2],
              x: [-50, 50, -50],
              y: [-50, 50, -50]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(153,27,27,0.3)_0%,transparent_60%)] blur-3xl" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 transition-colors" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[15vw] leading-[0.85] font-black tracking-tighter mb-6 text-foreground drop-shadow-[0_0_30px_rgba(220,38,38,0.3)] dark:drop-shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-colors">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-[0.3em] text-red-500 mb-12 uppercase font-bold">
              {t('hero.subtitle')}
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-8 text-lg group">
              {t('hero.cta')}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Members Section */}
      <section id="members" className="py-32 px-6 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-4 mb-16">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground">{t('members.title')}</h2>
            <div className="h-2 flex-grow bg-red-600" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEMBERS.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="z-0 hover:z-10 group relative"
              >
                {/* Member Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 w-48 scale-90 group-hover:scale-100 origin-bottom">
                  <div className="bg-zinc-950/95 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
                    <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">SKZOO: {member.skzoo ?? ''}</div>
                    <div className="text-[11px] text-zinc-300 leading-snug font-medium">{member.role}</div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 rotate-45 -mt-1 border-r border-b border-white/10" />
                  </div>
                </div>

                <Card 
                  onClick={() => setSelectedMemberId(member.id)}
                  className="bg-card dark:bg-zinc-900 border-border dark:border-white/5 hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={member.skzooImg} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                      alt={t(member.nameKey)}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-red-600 text-white border-none">
                        {member.skzoo}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground dark:text-white group-hover:text-red-600 transition-colors duration-300 transform group-hover:-translate-y-1 flex items-center justify-between gap-2">
                      {t(member.nameKey)}
                      {member.instagram && (
                        <a 
                          href={`https://instagram.com/${member.instagram}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-red-600 transition-colors p-1"
                          title={`@${member.instagram} on Instagram`}
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground dark:text-zinc-500 text-xs uppercase tracking-widest font-bold mt-1">
                      {member.role}
                    </CardDescription>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed border-l-2 border-red-600/30 pl-3 italic">
                      "{member.shortBio}"
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-[10px] text-red-500/80 font-bold uppercase tracking-tighter">
                      <Calendar className="w-3 h-3" />
                      {member.birthday}
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <p className="text-sm text-muted-foreground dark:text-zinc-400 leading-relaxed">
                      {t(`members.bio.${member.id}`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Dialog open={selectedMemberId !== null} onOpenChange={(open) => !open && setSelectedMemberId(null)}>
            <DialogContent className="max-w-2xl bg-zinc-950 border-white/10 p-0 overflow-hidden">
              <div className="relative aspect-video">
                <img 
                  src={selectedMember?.skzooImg} 
                  className="w-full h-full object-cover opacity-40" 
                  alt={selectedMember ? t(selectedMember.nameKey) : ''}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-red-600 text-white border-none">{selectedMember?.skzoo}</Badge>
                    <Badge variant="outline" className="border-white/20 text-zinc-300 backdrop-blur-sm">
                      <Calendar className="w-3 h-3 mr-1 text-red-500" />
                      {selectedMember?.birthday}
                    </Badge>
                  </div>
                  <DialogTitle className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase">
                    {selectedMember ? t(selectedMember.nameKey) : ''}
                  </DialogTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-red-500 font-bold tracking-widest text-xs uppercase">{selectedMember?.role}</div>
                    {(selectedMember as any)?.instagram && (
                      <a 
                        href={`https://instagram.com/${(selectedMember as any).instagram}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full border border-white/10"
                      >
                        <Instagram className="w-3 h-3 text-red-500" />
                        @{(selectedMember as any).instagram}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <div className="w-1 h-3 bg-red-600" /> Member Bio
                      </h4>
                      <p className="text-zinc-300 leading-relaxed italic">
                        {selectedMember ? t(`members.bio.${selectedMember.id}`) : ''}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <div className="w-1 h-3 bg-red-600" /> Recent Activities
                        </h4>
                        <p className="text-sm text-zinc-400">
                          {selectedMember?.recent}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <div className="w-1 h-3 bg-red-600" /> Solo / Highlights
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember?.soloTracks?.map(track => (
                            <Badge key={track} variant="outline" className="border-white/10 text-zinc-400">
                              {track}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                
                <div className="mt-8 flex justify-end">
                  <Button onClick={() => setSelectedMemberId(null)} size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full px-8">
                    Close Profile
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </section>

      {/* Music & Schedule Section */}
      <section className="py-32 px-6 bg-background transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Music */}
          <div id="music">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-4">
                <Music className="w-8 h-8 text-red-600" />
                <h2 className="text-4xl font-bold tracking-tighter text-foreground">{t('music.title')}</h2>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input 
                  placeholder={t('music.searchPlaceholder')} 
                  value={musicSearchQuery}
                  onChange={(e) => setMusicSearchQuery(e.target.value)}
                  className="pl-10 bg-background dark:bg-zinc-900 border-border dark:border-white/10 rounded-full h-10 text-xs"
                />
              </div>
            </div>
            
            <div className="space-y-8">
              {filteredDiscography.length > 0 ? (
                filteredDiscography.map((album, idx) => (
                  <motion.div 
                    key={album.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveAlbumId(album.id)}
                    className="flex gap-6 group cursor-pointer relative"
                  >
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-border dark:border-white/10 relative shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img 
                      src={album.cover} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      alt={album.title} 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white scale-75 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center border-b border-border dark:border-white/5 flex-grow pb-4 px-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-red-500 transition-colors">{album.title}</h3>
                      <span className="text-muted-foreground dark:text-zinc-500 font-mono text-sm">{album.year}</span>
                    </div>
                    <p className="text-muted-foreground dark:text-zinc-500 text-xs uppercase tracking-wider mt-1">{album.type}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                         {album.tracks.slice(0, 2).map(tk => (
                           <span key={tk} className="text-[10px] text-zinc-500 border border-zinc-200 dark:border-white/10 px-2 py-0.5 rounded-full">{tk}</span>
                         ))}
                         {album.tracks.length > 2 && <span className="text-[10px] text-zinc-500 flex items-center">+{album.tracks.length - 2} more</span>}
                      </div>
                      <div className="text-[10px] font-black text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        View Lyrics <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                ))
              ) : (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                  <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{t('music.noResults')} "{musicSearchQuery}"</p>
                  <Button 
                    variant="link" 
                    onClick={() => setMusicSearchQuery('')}
                    className="text-red-500 text-xs uppercase tracking-widest mt-2"
                  >
                    {t('music.clearSearch')}
                  </Button>
                </div>
              )}
              
              <Dialog open={activeAlbumId !== null} onOpenChange={(open) => !open && setActiveAlbumId(null)}>
                <DialogContent className="max-w-xl bg-zinc-950 border-white/10 p-0 overflow-hidden max-h-[90vh] flex flex-col">
                  <div className={`h-48 bg-gradient-to-br ${activeAlbum?.color} relative shrink-0`}>
                     <div className="absolute inset-0 bg-black/20" />
                     <div className="absolute bottom-6 left-8 flex items-end gap-6">
                        <div className="w-32 h-32 rounded-xl shadow-2xl overflow-hidden border-2 border-white/20">
                           <img src={activeAlbum?.cover} className="w-full h-full object-cover" alt={activeAlbum?.title} />
                        </div>
                        <div className="mb-2">
                           <div className="flex items-center gap-2 mb-2">
                             <Badge className="bg-white/20 text-white border-none backdrop-blur-md">{activeAlbum?.type}</Badge>
                             <Badge variant="outline" className="border-white/20 text-white/60 font-mono text-[10px]">{activeAlbum?.year}</Badge>
                           </div>
                           <DialogTitle className="text-4xl font-black text-white tracking-widest uppercase">{activeAlbum?.title}</DialogTitle>
                        </div>
                     </div>
                  </div>
                  <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
                     <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-3 bg-red-600" /> Tracklist
                     </h4>
                      <div className="space-y-1">
                        {activeAlbum?.tracks.map((track, i) => (
                           <DiscographyTrack key={track} track={track} index={i} color={activeAlbum?.color} />
                        ))}
                     </div>
                     <div className="mt-8 flex gap-4 sticky bottom-0 bg-zinc-950 pt-4 pb-2 z-10">
                        <Button 
                          onClick={() => activeAlbum?.link && window.open(activeAlbum.link, '_blank')}
                          className="flex-grow bg-red-600 hover:bg-red-700 text-white rounded-full"
                        >
                          Stream Now
                        </Button>
                        <Button variant="outline" onClick={() => setActiveAlbumId(null)} className="rounded-full border-white/10 text-white">Back</Button>
                     </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full border-border dark:border-white/10 hover:bg-accent dark:hover:bg-white/5 py-6">
                View All Releases
              </Button>
            </div>
          </div>

          {/* Schedule */}
          <div id="schedule">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
              <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-red-600" />
                <h2 className="text-4xl font-bold tracking-tighter text-foreground">{t('schedule.title')}</h2>
              </div>
              <div className="flex flex-wrap gap-2 p-1 bg-muted dark:bg-zinc-900 rounded-2xl md:rounded-full border border-border dark:border-white/5">
                {['All', 'Concert', 'Release', 'TV', 'Broadcast', 'Event'].map(type => (
                  <button 
                    key={type}
                    onClick={() => toggleScheduleFilter(type)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${scheduleFilters.includes(type) ? 'bg-red-600 text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {scheduleFilters.includes(type) && type !== 'All' && <Check className="w-3 h-3" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 p-6 bg-red-600/10 border-l-4 border-red-600 rounded-r-2xl flex items-center justify-between group">
               <div>
                  <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 italic">NEXT EVENT 🔥</div>
                  <div className="text-lg font-bold text-foreground">{countdownEvent.event}</div>
               </div>
               <div className="text-right">
                  <div className="text-2xl font-black text-red-600 font-mono">{timeLeftToNextEvent}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{countdownEvent.date} @ {countdownEvent.time}</div>
               </div>
            </div>
            
            <div className="bg-card dark:bg-zinc-900/50 rounded-3xl border border-border dark:border-white/5 p-8 shadow-sm">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-10">
                  {filteredSchedule.map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      onClick={() => setSelectedEvent(item)}
                      className="relative pl-12 border-l border-border dark:border-white/10 group/item cursor-pointer"
                    >
                      <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-red-600 ring-4 ring-red-600/20 group-hover/item:scale-150 transition-transform" />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-grow">
                          <div className="text-xs font-mono text-red-600 font-black mb-1">{item.date}</div>
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover/item:text-red-500 transition-colors uppercase tracking-tight">{item.event}</h3>
                          <div className="flex items-center gap-4">
                             <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-border dark:border-white/20 text-muted-foreground dark:text-zinc-500 group-hover/item:border-red-500/50 transition-colors">
                               {item.type}
                             </Badge>
                             <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-medium italic">
                                <Globe className="w-3 h-3" /> {item.location} • {item.time}
                             </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <a 
                            href={getCalendarLink(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-shrink-0"
                          >
                            <Button size="sm" variant="outline" className="rounded-full border-border dark:border-white/10 hover:bg-red-600 hover:text-white transition-all gap-2 group/btn">
                               <Calendar className="w-3.5 h-3.5" />
                               <span className="text-[10px] font-black uppercase tracking-widest group-hover/btn:scale-95 transition-transform">Save</span>
                            </Button>
                          </a>
                          <ChevronRight className="w-5 h-5 text-zinc-500 group-hover/item:text-red-500 group-hover/item:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
              {filteredSchedule.length === 0 && (
                <div className="py-20 text-center text-zinc-500 text-sm italic">No events found for this category.</div>
              )}
            </div>

            <Dialog open={selectedEvent !== null} onOpenChange={(open) => !open && setSelectedEvent(null)}>
              <DialogContent className="max-w-md bg-zinc-950 border-white/10 p-0 overflow-hidden">
                <div className="h-3 bg-red-600 w-full" />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-red-600/10 text-red-600 border-red-600/20 hover:bg-red-600/20 uppercase text-[10px] tracking-widest">
                      {selectedEvent?.type}
                    </Badge>
                    <div className="text-xs font-mono text-zinc-500">{selectedEvent?.date}</div>
                  </div>
                  
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
                    {selectedEvent?.event}
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <Globe className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Location</div>
                        <div className="text-sm font-medium text-zinc-200">{selectedEvent?.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <Clock className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Time</div>
                        <div className="text-sm font-medium text-zinc-200">{selectedEvent?.time}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <Info className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Event Details</div>
                        <div className="text-sm text-zinc-400 leading-relaxed font-medium">
                          {selectedEvent?.details || "No additional details available for this event."}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => selectedEvent && window.open(getCalendarLink(selectedEvent), '_blank')}
                      className="flex-grow bg-red-600 hover:bg-red-700 text-white rounded-full font-black uppercase tracking-widest text-xs h-12"
                    >
                      Add to Calendar
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedEvent(null)}
                      className="rounded-full border-white/10 text-white font-black uppercase tracking-widest text-xs h-12"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </section>

      {/* Music Video Section */}
      <section id="videos" className="py-32 px-6 bg-muted/30 dark:bg-zinc-900/30 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Play className="w-8 h-8 text-red-600" />
            <h2 className="text-4xl font-bold tracking-tighter text-foreground">{t('music.videos')}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 aspect-video rounded-3xl overflow-hidden border border-border dark:border-white/5 bg-black shadow-2xl relative">
              <AnimatePresence>
                {isVideoLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900"
                  >
                    <div className="relative w-20 h-20">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-red-600/20 border-t-red-600 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-[10px] font-black text-white">SKZ</div>
                      </div>
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 animate-pulse">Loading Video...</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <YouTube 
                videoId={selectedVideo} 
                className="w-full h-full"
                onReady={() => setIsVideoLoading(false)}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 0,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
              />
            </div>
            
            <div className="bg-card dark:bg-zinc-900/50 rounded-3xl border border-border dark:border-white/5 p-6 shadow-sm">
              <ScrollArea className="h-[400px] lg:h-full pr-4">
                <div className="space-y-4">
                  {isVideosListLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-muted dark:bg-black/20 shimmer relative">
                        <div className="w-24 aspect-video rounded-lg bg-zinc-300 dark:bg-zinc-800 shrink-0" />
                        <div className="flex-grow space-y-2">
                          <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-full" />
                          <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded w-2/3" />
                        </div>
                      </div>
                    ))
                  ) : (
                    MUSIC_VIDEOS.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${
                          selectedVideo === video.id 
                            ? 'bg-red-600 text-white' 
                            : 'bg-muted dark:bg-black/40 hover:bg-accent dark:hover:bg-zinc-800 text-muted-foreground dark:text-zinc-400'
                        }`}
                      >
                        <div className="w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0 relative bg-zinc-300 dark:bg-zinc-800">
                          <img 
                            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                            onLoad={() => setLoadedThumbnails(prev => ({ ...prev, [video.id]: true }))}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${loadedThumbnails[video.id] ? 'opacity-100' : 'opacity-0'}`}
                            alt={video.title}
                            referrerPolicy="no-referrer"
                          />
                          {!loadedThumbnails[video.id] && (
                            <div className="absolute inset-0 shimmer bg-zinc-300 dark:bg-zinc-800 z-10" />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                            <Play className={`w-6 h-6 ${selectedVideo === video.id ? 'text-white' : 'text-white/80'}`} />
                          </div>
                        </div>
                        <span className={`font-bold text-sm line-clamp-2 flex-grow ${selectedVideo === video.id ? 'text-white' : 'text-foreground'}`}>{video.title}</span>
                        <a 
                          href={`https://www.youtube.com/watch?v=${video.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`p-2 rounded-full hover:bg-white/20 transition-colors ${selectedVideo === video.id ? 'text-white' : 'text-red-600'}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </button>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </section>

      {/* Christopher's Training Hub Section */}
      <ChristopherTrainingHub />

      {/* Merchandise Section */}
      <section id="merch" className="py-32 px-6 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground">{t('merch.title')}</h2>
              <p className="text-muted-foreground dark:text-zinc-500 mt-4 uppercase tracking-widest font-bold">{t('merch.subtitle')}</p>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-border dark:border-white/10 hover:bg-accent dark:hover:bg-white/5 h-10 px-4 py-2 text-foreground dark:text-white gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  {t('merch.sort.label')}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOrder('default')}>{t('merch.sort.default')}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder('lowToHigh')}>{t('merch.sort.lowToHigh')}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder('highToLow')}>{t('merch.sort.highToLow')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="link" className="text-red-500 p-0 h-auto flex items-center gap-2">
                Visit JYP Shop <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedMerch.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`bg-card dark:bg-zinc-900 border-border dark:border-white/5 overflow-hidden group shadow-sm transition-all duration-300 ${favoriteMerchIds.includes(item.id) ? 'ring-2 ring-red-600 shadow-lg shadow-red-600/10' : ''}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.item} referrerPolicy="no-referrer" />
                    
                    <Button 
                      onClick={(e) => { e.stopPropagation(); toggleFavoriteMerch(item.id); }}
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-3 right-3 z-20 bg-black/20 backdrop-blur-md hover:bg-black/40 text-white rounded-full transition-all"
                    >
                      <Heart className={`w-5 h-5 transition-all duration-300 ${favoriteMerchIds.includes(item.id) ? 'fill-red-600 text-red-600 scale-110' : 'text-white'}`} />
                    </Button>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        onClick={() => handleBuyNow(item)}
                        className="bg-white text-black hover:bg-zinc-200 rounded-full"
                      >
                        {t('merch.buy')}
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-bold text-foreground">{item.item}</CardTitle>
                    <CardDescription className="text-red-500 font-mono font-bold mt-2">
                      {item.price}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Section */}
      <SKZOOGame />

      {/* Fan Zone Section */}
      <FanZone />

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border dark:border-white/10 bg-zinc-100 dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="flex flex-col items-center lg:items-start gap-6">
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center font-bold text-white rounded-sm text-2xl">SKZ</div>
            <p className="text-muted-foreground dark:text-zinc-500 text-sm max-w-xs text-center lg:text-left">
              {t('footer.disclaimer')}
            </p>
            <div className="flex gap-8 mt-4">
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground dark:text-zinc-500">{t('footer.social')}</h4>
                <a href="https://www.instagram.com/realstraykids/" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground dark:text-zinc-300 hover:text-red-500 transition-colors">Instagram</a>
                <a href="https://twitter.com/Stray_Kids" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground dark:text-zinc-300 hover:text-red-500 transition-colors">Twitter / X</a>
                <a href="https://www.youtube.com/c/StrayKids" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground dark:text-zinc-300 hover:text-red-500 transition-colors">YouTube</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground dark:text-zinc-500">{t('footer.official')}</h4>
                <a href="https://en.thejypshop.com/straykids.html" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground dark:text-zinc-300 hover:text-red-500 transition-colors">{t('footer.shop')}</a>
                <a href="https://fans.jype.com/StrayKids" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground dark:text-zinc-300 hover:text-red-500 transition-colors">{t('footer.fanclub')}</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card dark:bg-zinc-900/50 border border-border dark:border-white/5 p-8 rounded-3xl shadow-sm">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                <Send className="w-5 h-5 text-red-600" />
                {t('footer.contact.title')}
              </h4>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                  <p className="text-lg font-medium text-foreground dark:text-white">{t('footer.contact.success')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground dark:text-zinc-500 ml-1">
                        {t('footer.contact.name')}
                      </label>
                      <Input 
                        required
                        placeholder={t('footer.contact.placeholderName')}
                        className="bg-background dark:bg-black/50 border-border dark:border-white/10 focus:border-red-600/50 text-foreground"
                        value={contactForm.name}
                        onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground dark:text-zinc-500 ml-1">
                        {t('footer.contact.email')}
                      </label>
                      <Input 
                        required
                        type="email"
                        placeholder={t('footer.contact.placeholderEmail')}
                        className="bg-background dark:bg-black/50 border-border dark:border-white/10 focus:border-red-600/50 text-foreground"
                        value={contactForm.email}
                        onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground dark:text-zinc-500 ml-1">
                      {t('footer.contact.message')}
                    </label>
                    <Textarea 
                      required
                      placeholder={t('footer.contact.placeholderMessage')}
                      className="bg-background dark:bg-black/50 border-border dark:border-white/10 focus:border-red-600/50 min-h-[120px] text-foreground"
                      value={contactForm.message}
                      onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {t('footer.contact.send')}
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border dark:border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-600">
          <span>&copy; 2024 STRAY KIDS WORLD</span>
          <span>STAY WITH US</span>
        </div>
      </footer>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-card dark:bg-zinc-950 border-border dark:border-white/10 p-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {paymentStep === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <DialogHeader className="mb-6 text-left">
                  <DialogTitle className="text-2xl font-black tracking-widest uppercase text-foreground">Checkout</DialogTitle>
                  <DialogDescription className="text-muted-foreground">Complete your purchase for {selectedMerchItem?.item}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-border dark:border-white/5">
                    <img src={selectedMerchItem?.img} className="w-16 h-16 rounded-lg object-cover" alt={selectedMerchItem?.item} referrerPolicy="no-referrer" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-foreground">{selectedMerchItem?.item}</h4>
                      <p className="text-red-500 font-mono font-bold">{selectedMerchItem?.price}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-black p-2 rounded-lg border border-border dark:border-white/10">
                      <button 
                        onClick={() => setPurchaseQuantity(Math.max(1, purchaseQuantity - 1))}
                        className="w-8 h-8 rounded flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-bold font-mono">{purchaseQuantity}</span>
                      <button 
                        onClick={() => setPurchaseQuantity(purchaseQuantity + 1)}
                        className="w-8 h-8 rounded flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Payment Method</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button 
                        onClick={() => setPaymentMethod('card')}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-red-600 bg-red-600/5 text-foreground' : 'border-border dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/50 text-muted-foreground'}`}
                      >
                        <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-red-600' : ''}`} />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Card</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('apple')}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${paymentMethod === 'apple' ? 'border-red-600 bg-red-600/5 text-foreground' : 'border-border dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/50 text-muted-foreground'}`}
                      >
                        <Smartphone className={`w-5 h-5 ${paymentMethod === 'apple' ? 'text-red-600' : ''}`} />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Mobile</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('wallet')}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${paymentMethod === 'wallet' ? 'border-red-600 bg-red-600/5 text-foreground' : 'border-border dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/50 text-muted-foreground'}`}
                      >
                        <Wallet className={`w-5 h-5 ${paymentMethod === 'wallet' ? 'text-red-600' : ''}`} />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Wallet</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('bank')}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${paymentMethod === 'bank' ? 'border-red-600 bg-red-600/5 text-foreground' : 'border-border dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/50 text-muted-foreground'}`}
                      >
                        <Landmark className={`w-5 h-5 ${paymentMethod === 'bank' ? 'text-red-600' : ''}`} />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Bank</span>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Card Details</label>
                      <Input 
                        placeholder="Card Holder Name" 
                        className="bg-zinc-100 dark:bg-zinc-900 border-border dark:border-white/10"
                        value={cardDetails.holder}
                        onChange={(e) => setCardDetails({...cardDetails, holder: e.target.value})}
                      />
                      <Input 
                        placeholder="Card Number (0000 0000 0000 0000)" 
                        className="bg-zinc-100 dark:bg-zinc-900 border-border dark:border-white/10"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input 
                          placeholder="MM/YY" 
                          className="bg-zinc-100 dark:bg-zinc-900 border-border dark:border-white/10"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        />
                        <Input 
                          placeholder="CVC" 
                          className="bg-zinc-100 dark:bg-zinc-900 border-border dark:border-white/10"
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                        />
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod !== 'card' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-border dark:border-white/5 text-center"
                    >
                      <p className="text-sm text-muted-foreground italic">Redirecting to secure {paymentMethod} gateway after confirmation...</p>
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between px-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total Amount</div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    ${(parseFloat(selectedMerchItem?.price.replace('$', '')) * purchaseQuantity).toFixed(2)}
                  </div>
                </div>

                <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="ghost" onClick={() => setIsPaymentDialogOpen(false)} className="bg-zinc-100 dark:bg-zinc-900 font-bold uppercase tracking-widest text-xs h-12 hover:bg-zinc-200 dark:hover:bg-zinc-800">Cancel</Button>
                  <Button onClick={processPayment} className="flex-grow bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs h-12 shadow-[0_0_20px_rgba(220,38,38,0.3)]">Confirm Payment</Button>
                </DialogFooter>
              </motion.div>
            )}

            {paymentStep === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center justify-center py-20 px-8 text-center"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full border-4 border-zinc-200 border-t-red-600"
                  />
                  <Shield className="absolute inset-0 m-auto w-8 h-8 text-red-600 animate-pulse" />
                </div>
                <h3 className="text-xl font-black mt-8 uppercase tracking-[0.2em] text-foreground">Processing Securely</h3>
                <p className="text-muted-foreground mt-2 text-sm">Authenticating with JYP Secure Gate...</p>
              </motion.div>
            )}

            {paymentStep === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16 px-8 text-center"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <Check className="w-10 h-10 text-white stroke-[3px]" />
                </div>
                <h3 className="text-2xl font-black mt-8 uppercase tracking-[0.2em] text-foreground">Purchase Complete!</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Thank you for supporting Stray Kids. <br />
                  A confirmation email has been sent for <br />
                  <span className="text-foreground font-bold">{selectedMerchItem?.item}</span>
                </p>
                <Button onClick={() => setIsPaymentDialogOpen(false)} className="mt-8 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-zinc-200 w-full h-12 rounded-xl font-bold uppercase tracking-widest">
                  Close Window
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
