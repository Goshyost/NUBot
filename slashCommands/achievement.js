const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logro")
    .setDescription("Genera un logro de minecraft con un texto personalizado")
    .addStringOption(p => p.setName("texto").setDescription("Descripcion del logro").setRequired(true).setMaxLength(28)),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
      
      let desc = interaction.options.getString("texto")
      
  let messages = ["egg", "apple", "arrow" , "bedrock" , "bed" , "blaze_powder" , "blaze_rod" , "block_of_diamond" , "block_of_iron" , "block_of_gold", "boat", "bone" , "bonemeal", "book" , "bottle_of_enchanting" , "bow" , "bread" , "cake" , "chest", "compass", "cobblesonte", "cookie", "dirt", "feather", "ender_pearl", "enchantment_table", "furnance", "iron_ore", "music_disk"]
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
const { ICONS, AchievementCreator } = require("mc-achievements")

AchievementCreator.create(randomMessage, "¡Logro Desbloqueado!", desc).then(
	(buffer) => {
		/*
    Buffer of the achievement you created.
    Do whatever you want with buffer.
    In this example, we save buffer as a local file.
    */
		interaction.reply({ files: [buffer] })
	},
);
 
  
  },
};