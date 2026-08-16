const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel, Partials.Message]
});

// Zaniaryakant lera dabne
const BOT_TOKEN = 'MTUzODExNjkyMjQwOTg4MTYxMA.GVpgHr.BROYlhqXtQ1OxSAQQrGj5Q0r0hpIyIGoIwVgy0';
const VOICE_CHANNEL_ID = '1538115365274394698';
const LOG_CHANNEL_ID = '1538115365274394697';

client.once('ready', () => {
    console.log(`بۆت ئۆنلاین بوو: ${client.user.tag}`);
    try {
        const guild = client.guilds.cache.first();
        const voiceChannel = guild.channels.cache.get(VOICE_CHANNEL_ID);
        if (voiceChannel) {
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfDeaf: true,
            });
            console.log("بۆتەکە بە سەرکەوتوویی چوو ناو VC!");
        }
    } catch (e) {
        console.error("کێشە لە چوونە ناو VC:", e);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Direct Message (DM) Handling
    if (!message.guild) {
        try {
            const logChannel = await client.channels.fetch(LOG_CHANNEL_ID);
            if (message.attachments.size > 0 || message.content) {
                let text = message.content ? `\n**پەیام:** ${message.content}` : '';
                await logChannel.send({
                    content: `📩 پەیامی نوێ لەلایەن **${message.author.tag}**:${text}`,
                    files: Array.from(message.attachments.values()).map(a => a.url)
                });
                message.reply("سوپاس! پەیامەکەت گەیشت.");
            }
        } catch (err) {
            console.error(err);
        }
        return;
    }
});

client.login(BOT_TOKEN);
