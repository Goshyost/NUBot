const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const chalk = require("chalk")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Introduce una pregunta y el bot te respondera")
    .addStringOption(option => 
                   option.setName("pregunta")
                   .setDescription("Escribe la pregunta que quieres hacerle al bot")
                   .setRequired(true)),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
  
      let pregunta = interaction.options.getString("pregunta")
       const ballEmbed666 = new Discord.EmbedBuilder()
      .setAuthor({ name: "╎ᓭ  ᔑリ||𝙹リᒷ  ⊣𝙹╎リ⊣  ℸ ̣ 𝙹  ⎓╎リ↸  ℸ ̣ ⍑╎ᓭ?", iconURL: interaction.user.displayAvatarURL() })
      .setTitle("ꖌᒷᒷ!¡  ᓭᒷᔑ∷ᓵ⍑╎リ⊣  ⎓𝙹∷  ᓭᒷᓵ∷ᒷℸ ̣ ᓭ  ᔑリ↸  ||𝙹⚍  ᔑ∷ᒷ  ⊣𝙹╎リ⊣  ℸ ̣ 𝙹  ⎓╎リ↸  𝙹⚍ℸ ̣")
      .addFields(
            { name: 'ℸ ̣ ⍑ᒷ∷ᒷᓭ  リ𝙹  ᒷᓭᓵᔑ!¡ᒷ', value: `∴⍑ᔑℸ ̣   ᔑᒲ  ╎  ↸𝙹╎リ⊣  ∴╎ℸ ̣ ⍑  ᒲ||  ꖎ╎⎓ᒷ?` },
            { name: 'ᓭℸ ̣ 𝙹!¡  ∷ᒷᓭ╎ᓭℸ ̣ ╎リ⊣', value: `!¡ᔑ╎リℸ ̣   ℸ ̣ ⍑ᒷ  ∴𝙹∷ꖎ↸  ∷ᒷ↸` },
        )
      .setColor("Red")
      .setFooter({ text: "リᒷ∴  ⚍リ↸ᒷ∷⊣∷𝙹⚍リ↸ᓭ?  ∴⍑ᔑℸ ̣   ↸𝙹ᒷᓭ  ℸ ̣ ⍑ᔑℸ ̣   ᒷ⍊ᒷリ  ᒲᒷᔑリ" })
      .setThumbnail("https://media.discordapp.net/attachments/1263972053212725278/1275587451049607241/1f3b1.png?ex=66c66ee3&is=66c51d63&hm=4608414a437af6d7c4210b19becd4620129693f582f1805fe2bf8b58f139c1c3&=&format=webp&quality=lossless&width=640&height=640")
       let lowerCaseString = pregunta.toLowerCase();
      if(lowerCaseString === "my mind will be filled with the knowledge i fear"){
          console.log(chalk.red.bold("MY MIND WILL BE FILLED WITH THE KNOWLEDGE I FEAR"))
          interaction.reply({ content: "||𝙹⚍  ꖎ𝙹⍊ᒷ  ᓭᒷᓵ∷ᒷℸ ̣ ᓭ  ∷╎⊣⍑ℸ ̣ ?", embeds: [ballEmbed666], ephemeral: true })
          return
      }
      
  const messages = ["Puede ser", "Si", "No", "Probablemente Si", "Probablemente No", "Tal vez", "Existe una probabilidad", "En ningun universo existente", "Rotundamente", "Imposible", "¡Claro que si!", "¡Claro que no!", "Estoy seguro de que no", "Estoy seguro de que si", "No lo dudes", "100% Si", "100% No"]

	const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
      const ballEmbed = new Discord.EmbedBuilder()
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
      .setTitle("8ball 🎱")
      .addFields(
            { name: 'Pregunta', value: `${pregunta}` },
            { name: 'Respuesta', value: `${randomMessage}` },
        )
      .setColor("Yellow")
      .setFooter({ text: "NEW UNDERGROUNDS" })
      .setTimestamp()
      .setThumbnail("https://media.discordapp.net/attachments/1263972053212725278/1275587451049607241/1f3b1.png?ex=66c66ee3&is=66c51d63&hm=4608414a437af6d7c4210b19becd4620129693f582f1805fe2bf8b58f139c1c3&=&format=webp&quality=lossless&width=640&height=640")
      
      await interaction.deferReply()
      
      setTimeout(() => {
          interaction.editReply({ embeds: [ballEmbed]})
      }, 2000)
      
  },
};