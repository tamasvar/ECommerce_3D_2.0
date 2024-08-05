 // Define meta data based on filters
 export const generateMeta = (style?: string, universes?: string) => {
 let metaTitle = "High-Quality 3D Printed Figurines and Resin Kits - Sultry3dPrints";
 let metaDescription = "Explore Sultry3dPrints for NSFW 3D printed figurines, adult-themed miniatures, and high-quality resin kits. Find SFW/NSFW anime-inspired designs, miniatures, and pinups. Shop now!";
 let metaKeywords = "3D Printed Figurines, Resin Kits, Scale Models, Art Prints, Model Kits, NSFW 3D Figurines, Adult Miniatures, Unpainted Models, Anime-Inspired Designs, Miniatures, Pinups, Resin Art";

 if (style) {
   if (style === 'NSFW') {
     metaTitle = "NSFW 3D Printed Figurines - Sultry3dPrints";
     metaDescription = "Browse our collection of NSFW 3D printed figurines and adult-themed miniatures at Sultry3dPrints. High-quality, detailed models perfect for collectors and hobbyists.";
     metaKeywords += ", NSFW 3D Figurines, Adult Miniatures";
   } else if (style === 'SFW') {
     metaTitle = "SFW 3D Printed Figurines - Sultry3dPrints";
     metaDescription = "Explore our range of SFW 3D printed figurines and miniatures at Sultry3dPrints. High-quality, detailed models perfect for all ages.";
     metaKeywords += ", SFW 3D Figurines, Miniatures";
   } else if (style === 'Futa') {
     metaTitle = "Futanari 3D Printed Figurines - Sultry3dPrints";
     metaDescription = "Discover our selection of Futanari 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and enthusiasts.";
     metaKeywords += ", Futanari 3D Figurines, Futa";
   }
 }

 if (universes) {
   switch (universes) {
     case 'addamsfamily':
       metaTitle = "The Addams Family 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore our collection of The Addams Family 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors.";
       metaKeywords += ", The Addams Family 3D Figurines, Addams Family Miniatures";
       break;
     case 'animalcrossing':
       metaTitle = "Animal Crossing 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover our Animal Crossing 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and fans.";
       metaKeywords += ", Animal Crossing 3D Figurines, Animal Crossing Miniatures";
       break;
     case 'assassinscreed':
       metaTitle = "Assassin's Creed 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse our Assassin's Creed 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Assassin's Creed 3D Figurines, Assassin's Creed Miniatures";
       break;
     case 'baldursgate3':
       metaTitle = "Baldur's Gate 3 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Baldur's Gate 3 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for enthusiasts and collectors.";
       metaKeywords += ", Baldur's Gate 3 3D Figurines, Baldur's Gate 3 Miniatures";
       break;
     case 'battlechasers':
       metaTitle = "Battle Chasers 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Battle Chasers 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Battle Chasers 3D Figurines, Battle Chasers Miniatures";
       break;
     case 'bighero6':
       metaTitle = "Big Hero 6 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Big Hero 6 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and fans.";
       metaKeywords += ", Big Hero 6 3D Figurines, Big Hero 6 Miniatures";
       break;
     case 'bleach':
       metaTitle = "Bleach 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Bleach 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and enthusiasts.";
       metaKeywords += ", Bleach 3D Figurines, Bleach Miniatures";
       break;
     case 'borderlands':
       metaTitle = "Borderlands 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Borderlands 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and fans.";
       metaKeywords += ", Borderlands 3D Figurines, Borderlands Miniatures";
       break;
     case 'cyberpunk':
       metaTitle = "CyberPunk 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore CyberPunk 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and enthusiasts.";
       metaKeywords += ", CyberPunk 3D Figurines, CyberPunk Miniatures";
       break;
     case 'darkstalkers':
       metaTitle = "Darkstalkers 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Darkstalkers 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and fans.";
       metaKeywords += ", Darkstalkers 3D Figurines, Darkstalkers Miniatures";
       break;
     case 'dc':
       metaTitle = "DC 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover DC 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and enthusiasts.";
       metaKeywords += ", DC 3D Figurines, DC Miniatures";
       break;
     case 'eldenring':
       metaTitle = "Elden Ring 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Elden Ring 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Elden Ring 3D Figurines, Elden Ring Miniatures";
       break;
     case 'evangelion':
       metaTitle = "Evangelion 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Evangelion 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and enthusiasts.";
       metaKeywords += ", Evangelion 3D Figurines, Evangelion Miniatures";
       break;
     case 'finalfantasy':
       metaTitle = "Final Fantasy 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Final Fantasy 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and fans.";
       metaKeywords += ", Final Fantasy 3D Figurines, Final Fantasy Miniatures";
       break;
     case 'fireforce':
       metaTitle = "Fire Force 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Fire Force 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Fire Force 3D Figurines, Fire Force Miniatures";
       break;
     case 'fivenightsatfreddy':
       metaTitle = "Five Nights at Freddy's 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Five Nights at Freddy's 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and enthusiasts.";
       metaKeywords += ", Five Nights at Freddy's 3D Figurines, Five Nights at Freddy's Miniatures";
       break;
     case 'fostershome':
       metaTitle = "Foster's Home 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Foster's Home 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and fans.";
       metaKeywords += ", Foster's Home 3D Figurines, Foster's Home Miniatures";
       break;
     case 'frozen':
       metaTitle = "Frozen 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Frozen 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Frozen 3D Figurines, Frozen Miniatures";
       break;
     case 'harrypotter':
       metaTitle = "Harry Potter 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Harry Potter 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and enthusiasts.";
       metaKeywords += ", Harry Potter 3D Figurines, Harry Potter Miniatures";
       break;
     case 'helluvaboss':
       metaTitle = "Helluva Boss 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Helluva Boss 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Helluva Boss 3D Figurines, Helluva Boss Miniatures";
       break;
     case 'hoteltransylvania':
       metaTitle = "Hotel Transylvania 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Hotel Transylvania 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Hotel Transylvania 3D Figurines, Hotel Transylvania Miniatures";
       break;
     case 'kimpossible':
       metaTitle = "Kim Possible 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Kim Possible 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Kim Possible 3D Figurines, Kim Possible Miniatures";
       break;
     case 'killlakill':
       metaTitle = "Kill la Kill 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Kill la Kill 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Kill la Kill 3D Figurines, Kill la Kill Miniatures";
       break;
     case 'leagueoflegends':
       metaTitle = "League of Legends 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore League of Legends 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", League of Legends 3D Figurines, League of Legends Miniatures";
       break;
     case 'marvel':
       metaTitle = "Marvel 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Marvel 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Marvel 3D Figurines, Marvel Miniatures";
       break;
     case 'mastersoftheuniverse':
       metaTitle = "Masters of the Universe 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Masters of the Universe 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Masters of the Universe 3D Figurines, Masters of the Universe Miniatures";
       break;
     case 'metroid':
       metaTitle = "Metroid 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Metroid 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Metroid 3D Figurines, Metroid Miniatures";
       break;
     case 'mistressofthedark':
       metaTitle = "Mistress of the Dark 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Mistress of the Dark 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Mistress of the Dark 3D Figurines, Mistress of the Dark Miniatures";
       break;
     case 'monstermusume':
       metaTitle = "Monster Musume 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Monster Musume 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Monster Musume 3D Figurines, Monster Musume Miniatures";
       break;
     case 'mushokutensei':
       metaTitle = "Mushoku Tensei 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Mushoku Tensei 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Mushoku Tensei 3D Figurines, Mushoku Tensei Miniatures";
       break;
     case 'nier':
       metaTitle = "NieR: Automata 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse NieR: Automata 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", NieR: Automata 3D Figurines, NieR: Automata Miniatures";
       break;
     case 'onepiece':
       metaTitle = "One Piece 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover One Piece 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", One Piece 3D Figurines, One Piece Miniatures";
       break;
     case 'onepunchman':
       metaTitle = "One Punch Man 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore One Punch Man 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", One Punch Man 3D Figurines, One Punch Man Miniatures";
       break;
     case 'original':
       metaTitle = "Original 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Original 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for collectors and enthusiasts.";
       metaKeywords += ", Original 3D Figurines, Original Miniatures";
       break;
     case 'overwatch':
       metaTitle = "Overwatch 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Overwatch 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Overwatch 3D Figurines, Overwatch Miniatures";
       break;
     case 'pokemon':
       metaTitle = "Pokémon 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Pokémon 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Pokémon 3D Figurines, Pokémon Miniatures";
       break;
     case 'residentevil':
       metaTitle = "Resident Evil 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Resident Evil 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Resident Evil 3D Figurines, Resident Evil Miniatures";
       break;
     case 'roadtoeldorado':
       metaTitle = "The Road to Eldorado 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover The Road to Eldorado 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", The Road to Eldorado 3D Figurines, The Road to Eldorado Miniatures";
       break;
     case 'scoobydoo':
       metaTitle = "Scooby-Doo 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Scooby-Doo 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Scooby-Doo 3D Figurines, Scooby-Doo Miniatures";
       break;
     case 'scp':
       metaTitle = "SCP 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse SCP 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", SCP 3D Figurines, SCP Miniatures";
       break;
     case 'spyxfamily':
       metaTitle = "Spy x Family 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Spy x Family 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Spy x Family 3D Figurines, Spy x Family Miniatures";
       break;
     case 'starfox':
       metaTitle = "Star Fox 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Star Fox 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Star Fox 3D Figurines, Star Fox Miniatures";
       break;
     case 'starwars':
       metaTitle = "Star Wars 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Star Wars 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Star Wars 3D Figurines, Star Wars Miniatures";
       break;
     case 'streetfighter':
       metaTitle = "Street Fighter 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Street Fighter 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Street Fighter 3D Figurines, Street Fighter Miniatures";
       break;
     case 'supermario':
       metaTitle = "Super Mario 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Super Mario 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Super Mario 3D Figurines, Super Mario Miniatures";
       break;
     case 'thelegendofzelda':
       metaTitle = "The Legend of Zelda 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse The Legend of Zelda 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", The Legend of Zelda 3D Figurines, The Legend of Zelda Miniatures";
       break;
     case 'thelordoftherings':
       metaTitle = "The Lord of The Rings 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover The Lord of The Rings 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", The Lord of The Rings 3D Figurines, The Lord of The Rings Miniatures";
       break;
     case 'thewitcher':
       metaTitle = "The Witcher 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore The Witcher 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", The Witcher 3D Figurines, The Witcher Miniatures";
       break;
     case 'tombraider':
       metaTitle = "Tomb Raider 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Tomb Raider 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Tomb Raider 3D Figurines, Tomb Raider Miniatures";
       break;
     case 'toystory':
       metaTitle = "Toy Story 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Toy Story 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Toy Story 3D Figurines, Toy Story Miniatures";
       break;
     case 'undertaleuniverse':
       metaTitle = "Undertale Universe 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore Undertale Universe 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Undertale Universe 3D Figurines, Undertale Universe Miniatures";
       break;
     case 'warhammer40k':
       metaTitle = "Warhammer 40k 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Browse Warhammer 40k 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Warhammer 40k 3D Figurines, Warhammer 40k Miniatures";
       break;
     case 'worldofwarcraft':
       metaTitle = "World of Warcraft 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Explore World of Warcraft 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", World of Warcraft 3D Figurines, World of Warcraft Miniatures";
       break;
     case 'xenawarriorprincess':
       metaTitle = "Xena: Warrior Princess 3D Printed Figurines - Sultry3dPrints";
       metaDescription = "Discover Xena: Warrior Princess 3D printed figurines at Sultry3dPrints. High-quality, detailed models perfect for fans and collectors.";
       metaKeywords += ", Xena: Warrior Princess 3D Figurines, Xena: Warrior Princess Miniatures";
       break;
   }
 }
 return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
  };
};