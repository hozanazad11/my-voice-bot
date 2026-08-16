const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ئایدی کەناڵەکان لێرە بنووسە
const BOT_TOKEN = process.env.BOT_TOKEN;
const VOICE_CHANNEL_ID = '1538115365274394698';
const LOG_CHANNEL_ID = '1538115365274394697';

client.once('ready', async () => {
    console.log(`LoggedIn as ${client.user.tag}!`);

    try {
        const guild = client.guilds.cache.first();
        if (!guild) return console.log('Bot is not in any server!');

        const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);
        if (channel) {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            });
            console.log(`Joined Voice Channel: ${channel.name}`);
        }

        // ناردنی ڕیکلام بە شێوەی خولی (هەر ۱۰ خولەک جارێک)
        const logChannel = guild.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) {
            setInterval(() => {
                logChannel.send('**سڵاو! بۆتەکە ۲٤ کاتژمێر لە ڤۆیس ئۆنلاینە.**');
            }, 10 * 60 * 1000);
        }

    } catch (error) {
        console.error('Error during startup:', error);
    }
});

// وەرگرتنی تووکن لە Environment Variables بۆ پاراستنی
client.login(process.env.BOT_TOKEN);
