const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Secrets
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO; // ex: Spincka/DiscordNotif
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'restart_timer') {
    await interaction.deferReply({ ephemeral: true });

    // POST vers GitHub API pour déclencher listener.yml
    await fetch(`https://api.github.com/repos/${GITHUB_REPO}/dispatches`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `token ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        event_type: 'karuta_restart'
      }),
    });

    await interaction.editReply('⏰ Timer relancé !');
  }
});

client.login(DISCORD_BOT_TOKEN);
