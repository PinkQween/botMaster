// module.exports = {
//     name: 'delete',
//     description: 'Bulk delete messages',
//     async execute(message, args) {
//         // if (args[0]) {
//         //     const limit =  + 2;
//         //     continue;
//         // }

//         console.log(args[0]);

//         if (!args[0]) {
//             return await message.channel.messages.fetch({ limit: 3 }).then(messages => {
//                 message.channel.send(`<@${message.author.id}>, deleting messages`);
//                 message.channel.messages.fetch({ limit: 3 }).then(messagesPlus => {
//                     setTimeout(function() { 
//                         message.channel.bulkDelete(messagesPlus);
//                     }, 5000);
//                 });
//             });
//         } else if (isNaN(args[0])) {
//             return message.channel.send(`Please enter a real number <@${message.author.id}>`);
//         } else {
//             return await message.channel.messages.fetch({ limit: parseInt(args[0]) + 2 }).then(messages => {
//                 message.channel.send(`<@${message.author.id}>, deleting messages`);
//                 message.channel.messages.fetch({ limit: parseInt(args[0]) + 2 }).then(messagesPlus => {
//                     setTimeout(function() { 
//                         message.channel.bulkDelete(messagesPlus);
//                     }, 5000);
//                 });
//             });
//         }
//     }
// }