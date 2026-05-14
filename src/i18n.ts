import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        members: 'Members',
        music: 'Music',
        schedule: 'Schedule',
        game: 'SKZOO Game',
        merch: 'Merch',
        fanZone: 'Fan Zone',
        training: 'Training Hub'
      },
      hero: {
        title: 'STRAY KIDS',
        subtitle: 'EVERYWHERE ALL AROUND THE WORLD',
        cta: 'Explore the World'
      },
      members: {
        title: 'MEMBERS',
        bangchan: 'Bang Chan',
        leeknow: 'Lee Know',
        changbin: 'Changbin',
        hyunjin: 'Hyunjin',
        han: 'HAN',
        felix: 'Felix',
        seungmin: 'Seungmin',
        i_n: 'I.N',
        bio: {
          bangchan: 'The reliable leader and core producer of 3RACHA. Known for his caring nature and "Chan\'s Room" broadcasts. Fun fact: He speaks English, Korean, Japanese, and a bit of Chinese.',
          leeknow: 'A powerful main dancer with a unique "4D" personality. He has a sharp wit and loves his three cats. Fun fact: He was a backup dancer for BTS during their Wings tour.',
          changbin: 'The "dark" rapper with a soft heart. A prolific producer who brings intense energy to the group. Fun fact: He can\'t sleep without his Munchlax plushie, Gyu.',
          hyunjin: 'A captivating performer known for his expressive dancing and artistic flair. He loves painting and photography. Fun fact: He is allergic to cat fur but has a beloved dog named Kkami.',
          han: 'An all-rounder who can rap, sing, and produce. Despite his high energy on stage, he is quite introverted. Fun fact: He used to live and study in Malaysia.',
          felix: 'Famous for his deep, gravelly voice and angelic personality. He is the group\'s sunshine. Fun fact: He is a master at baking brownies and often shares them with staff.',
          seungmin: 'The group\'s reliable main vocalist with a clean and powerful voice. He is known for his diligence. Fun fact: He dreamed of being a baseball player when he was younger.',
          i_n: 'The adorable youngest member with a bright smile. He has a unique vocal tone and loves trot music. Fun fact: He used to be a child model and is known for his "desert fox" looks.'
        }
      },
      music: {
        title: 'DISCOGRAPHY',
        latest: 'Latest Release',
        albums: 'Albums',
        videos: 'Music Videos',
        searchPlaceholder: 'Search albums or songs...',
        noResults: 'No results found for',
        clearSearch: 'Clear Search',
        desc: {
          giant: "Stray Kids' second Japanese full-length album, featuring powerful tracks that showcase their growth and 'giant' presence in the music industry.",
          ate: "A mini album that explores the concept of 'devouring' the music scene, featuring the hit title track 'Chk Chk Boom'.",
          rockstar: "An album that captures the rebellious and energetic spirit of Stray Kids, emphasizing their unique 'rockstar' attitude.",
          fivestar: "A critically acclaimed studio album that solidified their global status, featuring diverse genres and experimental sounds.",
          maxident: "A mini album centered around the theme of an 'accident' of love, blending intense energy with emotional depth."
        }
      },
      schedule: {
        title: 'SCHEDULE',
        upcoming: 'Upcoming Events'
      },
      game: {
        title: 'SKZOO CATCH',
        score: 'Score',
        start: 'Start Game',
        highScore: 'High Score',
        instructions: 'Click the SKZOO characters as they appear!',
        characterGuide: 'Meet the characters',
        characters: {
          wolfchan: 'The reliable leader who protects the pack.',
          leebit: 'A mischievous rabbit with incredible dance moves.',
          dwaekki: 'A powerful pig-rabbit hybrid with a heart of gold.',
          jiniret: 'An elegant ferret known for his artistic flair.',
          hanquokka: 'A multi-talented quokka who loves cheesecake.',
          bbokari: 'A sunshine chick with a deep, surprising voice.',
          puppym: 'A diligent puppy with a clear and powerful vocal.',
          foxiny: 'The adorable desert fox and beloved youngest.'
        }
      },
      merch: {
        title: 'MERCHANDISE',
        subtitle: 'Official JYP Shop Items',
        buy: 'Buy Now',
        plush: 'SKZOO Plush',
        photocard: 'Member Photocard Set',
        lightstick: 'Official Lightstick Ver.2',
        album: 'Special Edition Album',
        sort: {
          label: 'Sort by Price',
          lowToHigh: 'Price: Low to High',
          highToLow: 'Price: High to Low',
          default: 'Default'
        }
      },
      fanZone: {
        title: 'FAN ZONE',
        subtitle: 'Share your love for Stray Kids',
        uploadCta: 'Submit Fan Content',
        uploadTitle: 'Share Your Content',
        uploadDesc: 'Upload your fan art or leave a message for the boys!',
        labelName: 'Your Name',
        labelType: 'Content Type',
        labelMessage: 'Your Message',
        labelImage: 'Fan Art Image',
        typeArt: 'Fan Art',
        typeMessage: 'Message',
        submit: 'Submit to Fan Zone',
        success: 'Thank you for sharing! Your content will be reviewed.',
        noContent: 'No fan content yet. Be the first to share!',
        placeholderName: 'Stay Name',
        placeholderMessage: 'Write something sweet...'
      },
      training: {
        title: "Christopher's Training Hub",
        subtitle: 'Encrypted Archive Access Required',
        lockTitle: 'Secure Verification',
        placeholder: '',
        error: 'Access Denied. Incorrect Key.',
        button: 'ENTER',
        footer: "This archive contains classified training data regarding the group's protective leadership. Unauthorized access will be recorded."
      },
      footer: {
        shop: 'JYP Shop',
        fanclub: 'Fan Club',
        social: 'Social',
        official: 'Official',
        disclaimer: 'This is a fan-made website dedicated to Stray Kids. All rights belong to JYP Entertainment.',
        contact: {
          title: 'Contact Us',
          name: 'Name',
          email: 'Email',
          message: 'Message',
          send: 'Send Message',
          success: 'Message sent successfully!',
          placeholderName: 'Your name',
          placeholderEmail: 'your@email.com',
          placeholderMessage: 'How can we help?'
        }
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: '首頁',
        members: '成員',
        music: '音樂',
        schedule: '行程',
        game: 'SKZOO 遊戲',
        merch: '週邊',
        fanZone: '粉絲專區',
        training: '訓練中心'
      },
      hero: {
        title: 'STRAY KIDS',
        subtitle: 'EVERYWHERE ALL AROUND THE WORLD',
        cta: '探索世界'
      },
      members: {
        title: '成員介紹',
        bangchan: '方燦',
        leeknow: '李旻浩',
        changbin: '彰彬',
        hyunjin: '鉉辰',
        han: '韓知城',
        felix: '李龍馥',
        seungmin: '金昇玟',
        i_n: '梁精寅',
        bio: {
          bangchan: '可靠的隊長，也是 3RACHA 的核心製作人。以溫柔的性格和「燦的房」直播聞名。趣事：會說英文、韓文、日文和一點中文。',
          leeknow: '擁有獨特「四次元」性格的實力派主舞。機智過人，非常愛他的三隻貓。趣事：曾在 BTS 的 Wings 巡演中擔任伴舞。',
          changbin: '外表黑暗但內心柔軟的饒舌歌手。高產的製作人，為團體帶來強大能量。趣事：睡覺時一定要抱著他的小卡比獸玩偶 Gyu。',
          hyunjin: '充滿魅力的表演者，以富有表現力的舞蹈和藝術天賦著稱。喜歡繪畫和攝影。趣事：對貓毛過敏，但養了一隻心愛的狗叫 Kkami。',
          han: '全能型選手，能饒舌、唱歌和製作。雖然在舞台上活力四射，私下卻相當內向。趣事：曾在馬來西亞生活和讀書。',
          felix: '以深沉的低音炮和天使般的性格聞名。是團體中的陽光。趣事：是烤布朗尼的大師，經常分享給工作人員吃。',
          seungmin: '團體中可靠的主唱，聲音乾淨且富有力量。以勤奮著稱。趣事：小時候的夢想是成為一名棒球選手。',
          i_n: '擁有燦爛笑容的可愛忙內。擁有獨特的音色，喜歡演歌。趣事：曾是童星模特，以「沙漠狐狸」般的長相聞名。'
        }
      },
      music: {
        title: '音樂作品',
        latest: '最新發行',
        albums: '專輯',
        videos: '音樂錄影帶',
        searchPlaceholder: '搜尋專輯或歌曲...',
        noResults: '找不到符合的結果：',
        clearSearch: '清除搜尋',
        desc: {
          giant: "Stray Kids 的第二張日語正規專輯，收錄了展現他們在音樂產業中不斷成長和「巨人」般存在感的強大曲目。",
          ate: "一張探索「吞噬」音樂界概念的迷你專輯，收錄了熱門主打歌 'Chk Chk Boom'。",
          rockstar: "這張專輯捕捉了 Stray Kids 叛逆且充滿活力的精神，強調了他們獨特的「搖滾明星」態度。",
          fivestar: "一張廣受好評的正規專輯，鞏固了他們的全球地位，融合了多種音樂風格和實驗性音效。",
          maxident: "以愛情的「意外」為主題的迷你專輯，將強大的能量與情感深度完美融合。"
        }
      },
      schedule: {
        title: '行程表',
        upcoming: '即將到來的活動'
      },
      game: {
        title: '捕捉 SKZOO',
        score: '得分',
        start: '開始遊戲',
        highScore: '最高分',
        instructions: '點擊出現的 SKZOO 角色！',
        characterGuide: '認識角色',
        characters: {
          wolfchan: '保護狼群的可靠領袖。',
          leebit: '擁有驚人舞技的淘氣兔子。',
          dwaekki: '內心柔軟、力量強大的豬兔。',
          jiniret: '以藝術天賦聞名的優雅雪貂。',
          hanquokka: '喜歡起司蛋糕的多才多藝短尾矮袋鼠。',
          bbokari: '擁有驚人深沉嗓音的陽光小雞。',
          puppym: '聲音乾淨且富有力量的勤奮小狗。',
          foxiny: '可愛的沙漠狐狸，受人喜愛的忙內。'
        }
      },
      merch: {
        title: '官方週邊',
        subtitle: 'JYP 商店熱賣物品',
        buy: '立即購買',
        plush: 'SKZOO 玩偶',
        photocard: '成員小卡套裝',
        lightstick: '官方應援棒 Ver.2',
        album: '特別版專輯',
        sort: {
          label: '價格排序',
          lowToHigh: '價格：從低到高',
          highToLow: '價格：從高到低',
          default: '預設'
        }
      },
      fanZone: {
        title: '粉絲專區',
        subtitle: '分享你對 Stray Kids 的愛',
        uploadCta: '提交粉絲內容',
        uploadTitle: '分享你的內容',
        uploadDesc: '上傳你的粉絲創作或給成員們留言！',
        labelName: '您的暱稱',
        labelType: '內容類型',
        labelMessage: '您的訊息',
        labelImage: '粉絲創作圖片',
        typeArt: '粉絲創作',
        typeMessage: '留言',
        submit: '提交至粉絲專區',
        success: '感謝分享！您的內容將在審核後顯示。',
        noContent: '目前還沒有粉絲內容。成為第一個分享的人吧！',
        placeholderName: 'Stay 暱稱',
        placeholderMessage: '寫下一些溫溫暖的話...'
      },
      training: {
        title: "Christopher's Training Hub",
        subtitle: '需要加密檔案存取權限',
        lockTitle: '安全驗證',
        placeholder: '',
        error: '存取拒絕。金鑰錯誤。',
        button: 'ENTER',
        footer: '此檔案包含有關團體保護性領導的機密訓練數據。未經授權的存取將被記錄。'
      },
      footer: {
        shop: 'JYP 商店',
        fanclub: '粉絲俱樂部',
        social: '社群媒體',
        official: '官方連結',
        disclaimer: '這是一個專為 Stray Kids 製作的粉絲網站。所有權利歸 JYP 娛樂所有。',
        contact: {
          title: '聯絡我們',
          name: '姓名',
          email: '電子郵件',
          message: '訊息',
          send: '發送訊息',
          success: '訊息已成功發送！',
          placeholderName: '您的姓名',
          placeholderEmail: '您的電子郵件',
          placeholderMessage: '我們能如何幫助您？'
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
