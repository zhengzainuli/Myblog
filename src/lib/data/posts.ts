export interface PostContent {
  slug: string;
  title: string;
  date: string;
  content: {
    en: {
      paragraphs: string[];
      npcDialog?: string;
    };
    zh: {
      paragraphs: string[];
      npcDialog?: string;
    };
  };
}

export const postsData: PostContent[] = [
  {
    slug: "exploring-pixeltown",
    title: "Exploring Pixeltown",
    date: "12 Nov",
    content: {
      en: {
        paragraphs: [
          "Welcome to Pixeltown! A place where every block tells a story and every corner is crafted with love. I recently spent some time wandering through these 8-bit streets, and the nostalgia hit me like a truck.",
          "The architecture here is simple yet profound. Limited color palettes force creators to focus on form and shading. It's a great reminder that constraints breed creativity.",
          "If you ever decide to visit, don't miss the local tavern—they serve the best low-res ale you'll ever taste!"
        ],
        npcDialog: "Hey traveler! Don't forget to save your game before venturing into the Dark Forest!"
      },
      zh: {
        paragraphs: [
          "欢迎来到像素小镇！在这个地方，每个方块都在诉说着一个故事，每个角落都充满了创作者的爱。最近我花了一些时间漫步在这些 8-bit 街道上，强烈的怀旧感扑面而来。",
          "这里的建筑简单而深刻。有限的调色板迫使创作者专注于形态和阴影。这很好地提醒了我们：限制往往能孕育出更大的创造力。",
          "如果你决定来参观，千万不要错过当地的酒馆——他们提供你尝过的最棒的低分辨率麦酒！"
        ],
        npcDialog: "嘿，旅行者！在冒险进入黑暗森林之前，别忘了保存你的游戏进度！"
      }
    }
  },
  {
    slug: "my-favorite-tools",
    title: "My Favorite Tools",
    date: "10 Nov",
    content: {
      en: {
        paragraphs: [
          "Every developer has their trusty toolbelt. For me, it's a mix of modern efficiency and retro aesthetics. VS Code is my daily driver, but I've themed it to look like a terminal from the 90s.",
          "When it comes to design, Aseprite is an absolute lifesaver for creating these pixel art graphics. It's intuitive, lightweight, and built specifically for sprite animations.",
          "What are the tools you can't live without? Let me know in the comments below!"
        ],
        npcDialog: "A sword is only as good as the warrior who wields it... but a good mechanical keyboard certainly helps."
      },
      zh: {
        paragraphs: [
          "每个开发者都有自己信赖的工具带。对我来说，它是现代效率与复古美学的结合。VS Code 是我日常使用的主力，但我把它配置成了 90 年代终端的样式。",
          "在设计方面，Aseprite 绝对是我制作这些像素艺术图形的救星。它直观、轻量，专为精灵图动画而生。",
          "有哪些是你离不开的工具呢？在下方评论区告诉我吧！"
        ],
        npcDialog: "剑的威力取决于挥舞它的战士……不过，一把好的机械键盘肯定也有很大帮助。"
      }
    }
  },
  {
    slug: "spaceship-adventures",
    title: "Spaceship Adventures",
    date: "08 Nov",
    content: {
      en: {
        paragraphs: [
          "Space: the final frontier. Last weekend, I prototyped a small top-down space shooter in React. Yes, you heard that right—React!",
          "Using requestAnimationFrame and a canvas element, I managed to get a smooth 60 FPS experience. Managing the state of dozens of asteroids and lasers was a fun challenge in optimization.",
          "The codebase is a bit messy, but the feeling of blasting pixel aliens is incredibly satisfying."
        ],
        npcDialog: "Captain, our shields are down to 20%! We need to refactor the hyperdrive module immediately!"
      },
      zh: {
        paragraphs: [
          "宇宙：最终的边疆。上周末，我用 React 制作了一个小型的自上而下太空射击游戏原型。是的，你没听错——React！",
          "通过使用 requestAnimationFrame 和 canvas 元素，我成功实现了流畅的 60 FPS 体验。管理几十个小行星和激光的状态是一项有趣且具有挑战性的优化工作。",
          "虽然代码库有点乱，但是轰击像素外星人的感觉简直太爽了。"
        ],
        npcDialog: "舰长，我们的护盾只剩 20% 了！我们需要立刻重构超空间引擎模块！"
      }
    }
  },
  {
    slug: "rogue-like-mechanics",
    title: "Rogue-like Mechanics",
    date: "05 Nov",
    content: {
      en: {
        paragraphs: [
          "Rogue-likes have taken the gaming world by storm. Procedural generation, permadeath, and high difficulty are the core pillars of this genre.",
          "I've been studying the algorithms behind dungeon generation. Using Cellular Automata to carve out caves creates incredibly organic-looking levels compared to standard BSP trees.",
          "Balancing the difficulty is the hardest part. You want the player to feel challenged, not cheated."
        ],
        npcDialog: "Another soul lost to the dungeon. Will you be the one to finally break the curse?"
      },
      zh: {
        paragraphs: [
          "Rogue-like 游戏风靡了整个游戏界。程序化生成、永久死亡和高难度是这一类型的核心支柱。",
          "我一直在研究地牢生成背后的算法。与标准的 BSP 树相比，使用元胞自动机（Cellular Automata）雕刻出的洞穴看起来更加自然有机。",
          "平衡难度是最困难的部分。你希望玩家感到挑战，而不是觉得被系统欺骗了。"
        ],
        npcDialog: "又一个在地下城中迷失的灵魂。你会是最终打破诅咒的那个人吗？"
      }
    }
  },
  {
    slug: "coffee-review",
    title: "Coffee Review",
    date: "01 Nov",
    content: {
      en: {
        paragraphs: [
          "Code turns into software, and coffee turns into code. Today I'm reviewing the 'Midnight Ethiopian Roast' from my local roaster.",
          "It has a dark, earthy flavor with a hint of dark chocolate. It's the perfect companion for those late-night debugging sessions when the bugs just won't quit.",
          "I rate this brew a solid 9/10. Highly recommended for full-stack developers."
        ],
        npcDialog: "Drink this potion. It restores 50 MP and grants 'Hyper Focus' for 4 hours."
      },
      zh: {
        paragraphs: [
          "代码变成软件，而咖啡变成代码。今天我来评测一下本地烘焙店的“午夜埃塞俄比亚烘焙”。",
          "它有着深沉泥土的风味，并带有一丝黑巧克力的香气。当深夜面对那些顽固的 bug 时，它是最完美的伴侣。",
          "我给这款咖啡打 9/10 分。强烈推荐给所有的全栈开发者。"
        ],
        npcDialog: "喝下这瓶药水。它能恢复 50 点 MP，并赋予你 4 小时的‘超级专注’状态。"
      }
    }
  },
  {
    slug: "retro-game-design",
    title: "Retro Game Design",
    date: "28 Oct",
    content: {
      en: {
        paragraphs: [
          "Designing a retro game isn't just about using big pixels. It's about capturing a specific era of game feel. The jump physics, the sound of collecting a coin, the screen transitions.",
          "Modern engines like Godot make it incredibly easy to mimic old hardware limitations, like locking the resolution to 320x180 and snapping sprites to the pixel grid.",
          "True retro design is an exercise in minimalism."
        ],
        npcDialog: "Back in my day, we only had 3 lives and no save points! Kids these days have it too easy."
      },
      zh: {
        paragraphs: [
          "设计一款复古游戏不仅仅是使用大像素。它是关于捕捉一个特定时代的游戏手感。跳跃的物理反馈、收集硬币的音效，以及屏幕的过渡效果。",
          "像 Godot 这样的现代引擎让我们能非常容易地模仿旧硬件的限制，比如将分辨率锁定在 320x180，并让精灵图吸附到像素网格上。",
          "真正的复古设计，是一场极简主义的修行。"
        ],
        npcDialog: "想当年，我们只有 3 条命，而且没有存档点！现在的年轻人过得太安逸了。"
      }
    }
  }
];