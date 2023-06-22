require('dotenv').config();
require('reflect-metadata');
require("./client/server/express.js");
const { createConnection } = require('typeorm');
const { Client, GatewayIntentBits, Partials, Constants, Collection, EmbedBuilder, SlashCommandBuilder, Events } = require('discord.js');
const fs = require('node:fs');
// const YoutubePoster = require("discord-yt-poster");
// const { DisTube } = require("distube");
// const { SpotifyPlugin } = require('@distube/spotify');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Database = require('./config/Database');
const db = new Database();
const GuildSettings = require("./models/GuildSettings");
// const axios = require('axios');

db.connect();

// const dash = require(`./client/settings.json`);
// const colors = require("colors");
// const Enmap = require("enmap");

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
	], partials: [
        Partials.Message,
        Partials.Reaction,
    ]
});

client.commands = new Collection();

// client.distube = new DisTube(client, {
//     emitNewSongOnly: true,
//     leaveOnFinish: true,
//     emitAddSongWhenCreatingQueue: false,
//     plugins: [new SpotifyPlugin()]
// });

module.exports = client;

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

// client.on(Events.InteractionCreate, async interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const command = interaction.client.commands.get(interaction.commandName);

// 	if (!command) {
// 		console.error(`No command matching ${interaction.commandName} was found.`);
// 		return;
// 	} try {
// 		await commands.execute(interaction);
// 	} catch (error) {
// 		console.error(`Error executing ${interaction.commandName}`);
// 		console.error(error);
// 	}
// });

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (err) {
		if (err) console.error(err);
		await interaction.reply({
			content: "An error occurred while executing that command.",
			ephemeral: true,
		});
	}
});


client.on('ready', async () => {
    // require('./client/test/index.js')(client);
    // require('./client/server.js');

    // require('./client/api/server')

    console.log(`Logged in as ${client.user.tag}`);

    // client.YTP = YoutubePoster(client, {
    //     loop_delays_in_min: 0
    // });

    // const guildId = '992098142445109258';
    // const guild = client.guilds.cache.get(guildId)
    // let commands

    // if (guild) {
    //     commands = guild.commands;
    // } else {
    //     commands = client.application?.commands
    // }

    // commands?.create({
    //     name: 'ping',
    //     description: 'Replies with pong!'
    // });

    // commands?.create({
    //     name: 'Kick',
    //     description: 'Kicks a user',
    //     options: [
    //         {
    //             name: 'User',
    //             description: 'The user you want to kick',
    //             required: true,
    //             //type: Constants.ApplicationCommandOptionTypes.NUMBER
    //         }
    //     ]
    // });

    // commands?.create({
    //     name: 'Ban',
    //     description: 'Bans a user'
    // });
})

// const prefix = "!";

// client.on('messageCreate', async (message) => {
//     if (!message.author.bot && message.content.startsWith(prefix)) {
//         const [command, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
        
//         console.log(command);
//         console.log(args)

//         if (command === "ping") {
//             client.commands.get('ping').execute(message, args);
//         } else if (command === "kick") {
//             client.commands.get('kick').execute(message, args);
//         } else if (command === "ban") {
//             client.commands.get('ban').execute(message, args);
//         } else if (command === "delete") {
//             client.commands.get('delete').execute(message, args);
//         } else if (command === "test") {
//             client.commands.get('test').execute(message, args, command, client, EmbedBuilder);
//         } else if (command === "addChannel" || command === "removeChannel" || command === "removeAllChannels") {
//             client.commands.get('youtube').execute(message, args, command, client);
//         } else {
//             message.reply(`Not a valid command <@${message.author.id}>`)
//         }
//     }
// });

client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id)
    if (reaction.message.id === '1037423510433300540') {
        switch (name) {
            case '🟥':
                member.roles.add('1037423018537926706');
                break
            case '🟩':
                member.roles.add('1037423066172624966');
                break
        }
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id)
    if (reaction.message.id === '1037423510433300540') {
        switch (name) {
            case '🟥':
                member.roles.remove('1037423018537926706');
                break
            case '🟩':
                member.roles.remove('1037423066172624966');
                break
        }
    }
});

// (async () => {
// 	try {
// 		console.log('Started refreshing application (/) commands.');

//     await rest.put(
//     	Routes.applicationGuildCommands(clientId, guildId),
//     	{ body: commands },
//     );

// 		console.log('Successfully reloaded application (/) commands.');
// 	} catch (error) {
// 		console.error(error);
// 	}
// })();

// client.on('interactionCreate', async (interaction) => {
//     if (!interaction.isCommand()) return;
    
//     const { commandName, options } = interaction

//     if (commandName === 'ping') {
//         interaction.reply('Pong!')
//     } else if (commandName === 'kick') {
//         if (interaction.member.permissions.has('KickMembers')) {
//             if (args.length === 0) return interaction.reply(`<@${interaction.author.id}>, Please provide a user`);
//             const member = interaction.mentions.members.first();
//             console.log(member)
//             if (member) {
//                 member.kick().then((member) => interaction.reply("successfully kicked <@${member.id}>")).catch((err) => message.reply(`<@${interaction.author.id}>, I'm sorry there was an error kicking <@${member.id}>`))
//             } else {
//                 interaction.reply(`<@${interaction.author.id}>, I'm sorry that user wasn't found`);
//             }
//         } else {
//             interaction.reply(`I'm sorry <@${interaction.author.id}> you don't have permissions to kick anyone`);
//         }
//     }
// })

// client.on("guildMemberAdd", async (member) => {
// 	const guildSettings = await GuildSettings.findOne({ guild_id: member.guild.id });

// 	if (!guildSettings && !guildSettings.welcome_channel_id) {
// 			return;
// 	}

// 	const newMemberEmbed = new EmbedBuilder()
// 		.setColor("#d81e5b")
// 		.setTitle("Member joined")
// 		.setDescription(`${member.user} has joined the server`)
// 		.setThumbnail(member.user.displayAvatarURL())
// 		.setTimestamp();
			
// 	console.log(guildSettings.welcome_channel_id);

// 	member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({
// 		embeds: [newMemberEmbed] 
// 	});
// });

// client.on("guildMemberRemove", async (member) => {
// 	const guildSettings = await GuildSettings.findOne({ guild_id: member.guild.id });

// 	if (!guildSettings && !guildSettings.goodbye_channel_id) {
// 			return;
// 	}

// 	const newMemberEmbed = new EmbedBuilder()
// 		.setColor("#d81e5b")
// 		.setTitle("Member left")
// 		.setDescription(`${member.user} has left the server`)
// 		.setThumbnail(member.user.displayAvatarURL())
// 		.setTimestamp();
			
// 	console.log(guildSettings.welcome_channel_id);

// 	member.guild.channels.cache.get(guildSettings.goodbye_channel_id).send({
// 		embeds: [newMemberEmbed] 
// 	});
// });

const eventFiles = fs
	.readdirSync("./src/events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}

client.login(token);