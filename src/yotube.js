// module.exports = {
//     name: 'youtube',
//     description: 'Adds a YouTube channel',
//     options: [
//         {
//             name: 'channel',
//             description: 'The YouTube channel you want',
//             required: true,
//         },
//         {
//             name: 'user',
//             description: 'The use the YouTube channel belongs to',
//             required: true,
//         },
//     ],
//     execute(message, args, command, client) {
//         if (command === "addChannel") {
//             if (message.member.permissions.has('ADMINISTRATOR')) {
//                 if (args.length === 0) return message.reply(`<@${message.author.id}>, Please a channel URI`);
//                 let URI = args[0];
//                 let channel = message.mentions.channels.first() || message.channel;
//                 let user = message.mentions.users.first() || message.author;
//                 client.YTP.setChannel(URI, channel, user).then(data => {
//                     message.channel.send(`Added the channel <@${message.author.id}>`);
//                 }).catch(e => {
//                     message.channel.send(`<@${message.author.id}>, sorry there was an error adding the channel`);
//                 })
//             } else {
//                 message.reply(`I'm sorry <@${message.author.id}> you don't have permissions to add a channel`);
//             }
//         } else if (command === "removeChannel") {
//             if (message.member.permissions.has('ADMINISTRATOR')) {
//                 if (args.length === 0) return message.reply(`<@${message.author.id}>, Please specify the channel URI`);
//                 let URI = args[0];
//                 client.YTP.deleteChannel(message.guild.id, URI).then(data => {
//                     message.channel.send(`removed the channel <@${message.author.id}>`);
//                 }).catch(e => {
//                     message.channel.send(`<@${message.author.id}>, sorry there was an error removing the channel`);
//                 })
//             } else {
//                 message.reply(`I'm sorry <@${message.author.id}> you don't have permissions to remove a channel`);
//             }
//         } else if (command === "removeAllChannel") {
//             if (message.member.permissions.has('ADMINISTRATOR')) {
//                 client.YTP.deleteAllChannel(message.guild.id, URI).then(data => {
//                     message.channel.send(`removed every channel <@${message.author.id}>`);
//                 }).catch(e => {
//                     message.channel.send(`<@${message.author.id}>, sorry there was an error removing all the channels`);
//                 })
//             } else {
//                 message.reply(`I'm sorry <@${message.author.id}> you don't have permissions to remove all channels`);
//             }
//         }
//     }
// }