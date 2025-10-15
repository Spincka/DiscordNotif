const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.MessageReactionAdd] });

// === VARIABLES D'ENVIRONNEMENT ===
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN; // Ton token bot Discord
const GITHUB_REPO = process.env.GITHUB_REPO;             // Exemple : Spincka/DiscordNotif
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;           // Ton Personal Access Token GitHub

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'restart_timer') {
    await interaction.deferReply({ ephemeral: true });

    try {
      // POST vers GitHub API pour déclencher listener.yml
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/dispatches`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: 'karuta_restart'
        }),
      });

      if (!res.ok) {
        console.error('Erreur GitHub API:', res.status, await res.text());
        await interaction.editReply(`❌ Erreur lors du relancement du timer : ${res.status}`);
        return;
      }

      await interaction.editReply('⏰ Timer relancé avec succès !');
    } catch (err) {
      console.error(err);
      await interaction.editReply('❌ Erreur lors de la connexion à GitHub.');
    }
  }
});

client.login(DISCORD_BOT_TOKEN);
