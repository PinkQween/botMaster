const { EmbedBuilder } = require('discord.js');
const words = require("./../badWords.json");
const UserWarnings = require("./../models/UserWarnings");
const UserXp = require("./../models/UserXp");
const GuildSettings = require("./../models/GuildSettings")

module.exports = {
	name: "messageCreate",
	async execute(message) {
        if (message.author.bot) return;

        // let warningNumber = 0;

        // if (typeof warnings !== 'undefined') {
        //     if (UserWarnings.warnings == 0) warningNumber = "1st";
        //     if (UserWarnings.warnings == 1) warningNumber = "2nd";
        //     if (UserWarnings.warnings == 2) warningNumber = "3rd";
        //     if (UserWarnings.warnings == 3) message.author.ban();
        // }

        let gainXp = true;

        wordArray = words.records.map(item => item.word.toLowerCase());

        for (var i = 0; i < wordArray.length; i++) {
            console.log(wordArray[i]);
            if (message.content.toLowerCase().includes(wordArray[i])) {
                console.log("Found match");

                UserWarnings.findOne({ user_id: message.author.id }, (err, warnings) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!warnings) {
                        warnings = new UserWarnings({
                            user_id: message.author.id,
                            warnings: 1
                        });
                    } else {
                        warnings.warnings = warnings.warnings + 1;
                    }
        
                    warnings.save(err => {
                        if (err) console.log(err);
                    });

                    const warningEmbed = new EmbedBuilder()
                        .setColor("#eed202")
                        .setTitle("Warning")
                        .setDescription(`You have ${warnings.warnings} warning(s), ${message.author}, if you keep up this behavior you'll get banned`)
                        .setThumbnail("https://www.clipartmax.com/png/small/34-343829_big-image-electricity-warning-sign-png.png")
                        .setTimestamp();

                    console.log(message.content);
                    console.log(warnings.warnings);

                    message.channel.send({
                        embeds: [warningEmbed] 
                    });

                    let member = message.author;

                    message.delete();

                    if (warnings > 2) {
                        setTimeout(function(){ 
                            member.ban(); 
                        }, 10000);
                    }
                });

                gainXp = false;
            }
        }
        
        const gain = () => {
            UserXp.findOne({ user_id: message.author.id }, (err, xp,) => {       
                if (err) {
                    console.log(err);
                    return;
                }

                GuildSettings.findOne({ guild_id: message.guild.id }, (err, settings) => {       
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!xp) {
                        xp = new UserXp({
                            user_id: message.author.id,
                            xp: 5,
                            levels: 0
                        });
                    } else {
                        xp.xp = xp.xp + 5;
                    }

                    console.log(xp.xp);

                    if ((xp.xp % 100) == 0) {
                        xp.levels = xp.levels + 1;

                        const levelUp = new EmbedBuilder()
                            .setColor("#3385ff")
                            .setTitle("Level up!")
                            .setDescription(`You have leveled up, ${message.author}, congratulations! You're now level ${xp.levels}`)
                            .setThumbnail(message.author.banner)
                            .setTimestamp();

                        message.guild.channels.cache.get(settings.level_up_channel_id).send({
                            embeds: [levelUp] 
                        });
                    }
            
                    xp.save(err => {
                        if (err) console.log(err);
                    });
                });
            });
        }

        if (gainXp == true) gain(); 
    }
} 