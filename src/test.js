// module.exports = {
//     name: 'test',
//     description: 'Tests the embeds',
//     execute(message, args, command, client, EmbedBuilder) {
//         const embed = new EmbedBuilder()
//         .setColor('#323435')
//         .setTitle('Test')
//         .setURL('https://youtube.com')
//         .setDescription('This is a test')
//         .addFields(
//             { name: 'Test', value: 'test value' }
//         )
//         .setFooter({ text: 'one last test' });
//         message.channel.send({ embeds: [embed] });
//     }
// }