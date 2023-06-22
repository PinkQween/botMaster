// module.exports = {
//     name: 'ticket',
//     aliases: [],
//     Permissions: [],
//     description: 'Creates a ticket',
//     async execute(message, args, command, client) {
//         const channel = await message.guild.channels.create(`ticket: ${message.author.id}`);
//         channel.setParent('1037737857810452501');

//         channel.updateOverwrite(message.guild.id, {
//             SEND_MESSAGE: false,
//             VIEW_CHANNEL: false,
//         });
//         channel.updateOverwrite(message.author, {
//             SEND_MESSAGE: true,
//             VIEW_CHANNEL: true,
//         });

//         const reactionMessage = await channel.send(`Thanks for opening a ticket <@${message.author.id}>, staff will be in contact shortly`);

//         try {
//             await reactionMessage.react("🔒");
//             await reactionMessage.react("⛔");
//         } catch (err) {
//             throw err;
//         }
//         const collector = reactionMessage.createReactionCollector((reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission('ADMINISTRATOR'), { dispose: true });

//         collector.on('collect', (reaction, user) => {
//             switch (reaction.emoji.name) {
//                 case "🔒":
//                     channel.updateOverwrite(message.author, {
//                         SEND_MESSAGE: false,
//                         VIEW_CHANNEL: false,
//                     });
//                     break;
//                 case "⛔":
//                     channel.send('Deleting this channel');
//                     setTimeout(() => channel.delete(), 5000);
//                     break;
//             }
//         });
//     },
// };