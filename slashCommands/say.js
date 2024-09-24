const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Manda un mensaje utilizando al bot")
    .addStringOption(p => 
                    p.setName("texto")
                    .setDescription("Especifica el texto que vas a mandar")
                    .setRequired(false))
    .addChannelOption(p => 
                     p.setName("canal")
                     .setDescription("Especifica el canal al que se mandara el mensaje (opcional)")
                     .addChannelTypes(Discord.ChannelType.GuildText)
                     .setRequired(false))
    .addAttachmentOption(p => p.setName("imagen")
                        .setDescription("Manda un archivo multimedia")
                        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
  
  let text = interaction.options.getString("texto")
  let canal = interaction.options.getChannel("canal")
  let img = interaction.options.getAttachment("imagen")
	
  if(canal){
      if(text){
		if(img){
            client.channels.cache.get(canal.id).send({ content: text, files: [img] })
  		    interaction.reply({ content: "Se ha mandado correctamente al canal: <#"+canal.id+">", ephemeral: true })
        } else {
            client.channels.cache.get(canal.id).send({ content: text })
            interaction.reply({ content: "Se ha mandado correctamente al canal: <#"+canal.id+">", ephemeral: true })
        }
      } else if(!text){
		if(img){
            client.channels.cache.get(canal.id).send({ files: [img] })
  		    interaction.reply({ content: "Se ha mandado correctamente al canal: <#"+canal.id+">", ephemeral: true })
            return
        }
          interaction.reply({ content: "Solo puedes mandar un mensaje vacio si se adjunta una imagen", ephemeral: true })
      }
      
  } else {
      
       if(text){
           
		if(img){
            client.channels.cache.get(interaction.channel.id).send({ content: text, files: [img] })
  		    interaction.reply({ content: "Se ha mandado correctamente a este canal de texto.", ephemeral: true })
        } else {
            client.channels.cache.get(interaction.channel.id).send({ content: text })
              interaction.reply({ content: "Se ha mandado correctamente a este canal de texto.", ephemeral: true })
        }
      } else if(!text){
          
		if(img){
            client.channels.cache.get(interaction.channel.id).send({ files: [img] })
  		    interaction.reply({ content: "Se ha mandado correctamente a este canal de texto.", ephemeral: true })
            return
        }
          interaction.reply({ content: "Solo puedes mandar un mensaje vacio si se adjunta una imagen", ephemeral: true })
      }
  }
  },
};