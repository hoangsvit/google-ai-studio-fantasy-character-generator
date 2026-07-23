import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));
  const PORT = 3000;

  // Initialize Gemini AI client lazily if key is provided
  const getAi = () => {
    if (!process.env.GEMINI_API_KEY) return null;
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Endpoint to generate 1-2 sentence unique backstory
  app.post("/api/generate-backstory", async (req, res) => {
    try {
      const { fullName, title, race, characterClass, alignment } = req.body;

      const ai = getAi();
      if (ai) {
        try {
          const prompt = `Write a compelling, unique, exactly 1 to 2 sentence fantasy backstory/origin story for a character named ${fullName} (${title}), a ${race} ${characterClass} of ${alignment} alignment. Keep it concise, dramatic, and immersive. Do not include quotes around the story or markdown syntax.`;

          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
          });

          const text = response.text?.trim();
          if (text) {
            return res.json({ backstory: text, source: "gemini-ai" });
          }
        } catch (geminiError) {
          console.warn("Gemini backstory generation fallback:", geminiError);
        }
      }

      // Procedural fallback for unique 1-2 sentence story
      const origins = [
        `Born in the misty peaks of Mount Drakon, ${fullName} discovered their awakening powers when an ancient guardian dragon bestowed a glowing rune upon them.`,
        `Once a humble apprentice in the sunken city of Oakhaven, ${fullName} took up arms when shadowy specters threatened their realm.`,
        `Exiled from a noble guild for defying a corrupt lord, ${fullName} now wanders the borderlands defending travelers from hidden dangers.`,
        `After deciphering forbidden scrolls in the Sunken Temple, ${fullName} unlocked secrets that drew both loyal allies and deadly rival hunters to their trail.`,
        `Raised by nomadic desert dwellers, ${fullName} mastered ancient survival magic before setting out to reclaim their family's lost ancestral artifact.`
      ];

      const goals = [
        `Now bound by a sacred oath, they walk the realm seeking to restore balance to the broken kingdoms.`,
        `Driven by an unrelenting quest for truth, they search forgotten ruins for the key to their lineage's true destiny.`,
        `With blade and magic at the ready, they forge a new legacy across treacherous lands where few dare to tread.`,
        `Their name is now spoken in whispers of awe among tavern keepers and battlefield commanders alike.`
      ];

      const randomOrigin = origins[Math.floor(Math.random() * origins.length)];
      const randomGoal = goals[Math.floor(Math.random() * goals.length)];
      const fallbackBackstory = `${randomOrigin} ${randomGoal}`;

      return res.json({ backstory: fallbackBackstory, source: "procedural" });
    } catch (error) {
      console.error("Error generating backstory:", error);
      res.status(500).json({ error: "Failed to generate backstory" });
    }
  });

  // API Endpoint to generate cartoon/video-game style portrait
  app.post("/api/generate-portrait", async (req, res) => {
    try {
      const { characterClass, race, fullName, title } = req.body;

      const classPrompts: Record<string, string> = {
        Warrior: "armored warrior holding a glowing steel greatsword, heroic knight armor, video game avatar",
        Mage: "mystical mage wizard with glowing arcane spell rune staff, starry robes, fantasy video game icon",
        Rogue: "shadow rogue assassin with hooded cloak and poison daggers, stealthy ninja, cartoon game character",
        Paladin: "holy paladin champion with shining golden plate armor and sacred hammer, divine halo glow",
        Ranger: "woodland ranger hunter with recurve bow and quiver, emerald leather cloak, fantasy game artwork",
        Cleric: "celestial cleric priest with holy mace and radiant light aura, divine armor robes",
        Bard: "charismatic bard minstrel playing a magical lute, feathered hat, vibrant colorful fantasy art",
        Warlock: "dark warlock spellcaster with glowing purple eldritch flames and skull amulet",
        Druid: "primal druid shapeshifter adorned with wild antlers, leaves, and wooden staff",
        Monk: "agile martial arts monk with glowing ki energy fists, prayer wraps, martial pose",
        Necromancer: "dark necromancer summoning skeletal spectral magic, bone armor, emerald flame eyes",
        Sorcerer: "raw sorcerer channeling dragon fire and chaotic lightning arcana from bare hands",
        Barbarian: "wild barbarian berserker with massive battleaxe, tribal fur harness, fierce battle roar",
      };

      const classDetails = classPrompts[characterClass] || "heroic fantasy adventurer";
      const imagePrompt = `A high quality 2D cartoon video-game style portrait avatar of a ${race} ${characterClass} named ${fullName}, ${classDetails}. Vibrant 3D digital art style, clean vector game character portrait, expressive features, dramatic fantasy lighting, centered profile icon, rich color scheme, 4k detail.`;

      const ai = getAi();

      if (ai) {
        try {
          // Attempt Gemini image generation
          const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite-image",
            contents: {
              parts: [{ text: imagePrompt }],
            },
            config: {
              imageConfig: {
                aspectRatio: "1:1",
              },
            },
          });

          if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData?.data) {
                const mimeType = part.inlineData.mimeType || "image/png";
                return res.json({
                  imageUrl: `data:${mimeType};base64,${part.inlineData.data}`,
                  source: "gemini-ai",
                });
              }
            }
          }
        } catch (geminiError) {
          console.warn("Gemini image generation fallback triggered:", geminiError);
        }
      }

      // High quality fallback cartoon video game portrait generator via Pollinations AI
      const seed = Math.floor(Math.random() * 1000000);
      const encodedPrompt = encodeURIComponent(
        `vibrant cartoon video game portrait of a ${race} ${characterClass}, ${classDetails}, highly detailed 2d digital fantasy art, video game character icon, clean outline`
      );
      const fallbackUrl = `https://pollinations.ai/p/${encodedPrompt}?width=512&height=512&seed=${seed}&nologo=true`;

      return res.json({ imageUrl: fallbackUrl, source: "pollinations" });
    } catch (error) {
      console.error("Error generating portrait:", error);
      res.status(500).json({ error: "Failed to generate character portrait" });
    }
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
