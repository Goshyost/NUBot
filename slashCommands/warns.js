const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const restr = require("../restricciones.json")
const db = require('megadb');
const { ComponentType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warns")
    .setDescription("Gestiona los warns de los usuarios.")
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers)
    .addSubcommand(sub => 
                  sub.setName("remover")
                  .setDescription("Remover una cantidad especifica de advertencias de un usuario")
                  .addUserOption(option => 
                    option.setName("usuario")
                   	.setDescription("Usuario al que se le removeran las advertencia")
                    .setRequired(true)
                    )
    			  .addNumberOption(option => 
                    option.setName("numero")
                    .setDescription("Especifica cuantas advertencias quieres remover.")
                    .setRequired(true)
                    )
                  )
    .addSubcommand(sub => 
                  sub.setName("ver")
                  .setDescription("Ve las advertencias totales de un usuario.")
    			  .addUserOption(option => 
                                option.setName("usuario")
                                .setDescription("El usuario del que se mostraran las advertencias totales")
                                .setRequired(true))
                   )
    .addSubcommand(sub =>
                  sub.setName("restablecer")
                  .setDescription("Restablece las advertencias a 0 de un usuario especifico.")
                  .addUserOption(option => 
                                option.setName("usuario")
                                .setDescription("Usuario a el que se restableceran las advertencias")
                                .setRequired(true))
                   )
    .addSubcommand(sub =>
                  sub.setName("totales")
                  .setDescription("Muestra todos los warns que han sido aplicados al servidor.")
                   ),
    				
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
    let warns = new db.crearDB("warns")
    
  	let user = interaction.options.getUser("usuario")
  	let numero = interaction.options.getNumber("numero")
    
      if(interaction.options.getSubcommand() === "remover"){
      
  
  let warnstotales = warns.obtener(user.id)
  if(warns.tiene(user.id) === true){
      
      if(numero > await warns.obtener(user.id)) return interaction.reply({ content: "❌ | El usuario no tiene mas de **"+await warns.obtener(user.id)+"** warns.", ephemeral: true })
      
      if(numero < 1) return interaction.reply({ content: "❌ | No puedes retirar un valor nulo de warns."}) 
      
   	   warns.restar(user.id, numero)
       const Embed1 = new Discord.EmbedBuilder()
      .setThumbnail(user.displayAvatarURL())
      .setAuthor({ name: `Administrador: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
 	  .setTitle(`Advertencia Removidas`)
      .setColor("Red")
 	  .setDescription(`Se han removido **${numero}** advertencias del usuario **${user.displayName}**, Numero de advertencias totales: **`+await warns.obtener(user.id)+"**")
      .setFooter({ text: "New Undergrounds Moderation"})
      .setTimestamp()
      if(await warns.obtener(user.id) > 4) Embed1.addFields({ name: "⚠️ Usuario potencialmente peligroso ⚠️", value: "este usuario esta marcado como un usuario potencialmente peligroso debido a que tiene 5 o mas advertencias totales.", inline: true })
	  interaction.reply({ content: `<@${user.id}>`, embeds: [Embed1] })
  } else {
      interaction.reply({ content: " ❌ | El usuario no tiene warns aun.", ephemeral: true })
  }
      }
      
      if(interaction.options.getSubcommand() === "ver"){
          
       const Embed1 = new Discord.EmbedBuilder()
      .setThumbnail(user.displayAvatarURL())
      .setAuthor({ name: `Solicitado por: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
 	  .setTitle(`Advertencias de ${user.displayName}`)
      .setColor("Green")
 	  .setDescription("El usuario todavia no tiene advertencias, buen trabajo 🥳")
      .setFooter({ text: "New Undergrounds Moderation"})
      .setTimestamp()
       
  if(warns.tiene(user.id) === false){
	  interaction.reply({ embeds: [Embed1] })
  } else if(await warns.obtener(user.id) === 0){
      interaction.reply({ embeds: [Embed1] })
  } else if(warns.tiene(user.id) === true){
      const Embed2 = new Discord.EmbedBuilder()
      .setThumbnail(user.displayAvatarURL())
      .setAuthor({ name: `Solicitado por: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
 	  .setTitle(`Advertencias de ${user.displayName}`)
 	  .setDescription("El usuario tiene **"+await warns.obtener(user.id)+"** advertencias totales.")
      .setFooter({ text: "New Undergrounds Moderation"})
      .setTimestamp()
      if(await warns.obtener(user.id) > 4) {
          Embed2.addFields({ name: "⚠️ Usuario potencialmente peligroso ⚠️", value: "este usuario esta marcado como un usuario potencialmente peligroso debido a que tiene 5 o mas advertencias totales.", inline: true })
          Embed2.setColor("Red")
      }
      if(await warns.obtener(user.id) < 5) Embed2.setColor("Orange")
  
	  interaction.reply({ embeds: [Embed2] })
  }
          
      }
      
      if(interaction.options.getSubcommand() === "restablecer"){
          
          const SuccEmbed = new Discord.EmbedBuilder()
          .setThumbnail(user.displayAvatarURL())
   	      .setAuthor({ name: `Solicitado por: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
          .setTitle("Advertencias Restablecidas 🥳")
          .setDescription(`Las advertencias de <@${user.id}> han sido removidas completamente, disfruta tu reinicio!`)
          .setColor("Red")
    	  .setFooter({ text: "New Undergrounds Moderation"})
   	      .setTimestamp()
          
          if(warns.tiene(user.id) === false){
              interaction.reply({ content: "❌ | Este usuario no tiene advertencias.", ephemeral: true })
              return
          } else if(await warns.obtener(user.id) === 0){
              interaction.reply({ content: "❌ | Este usuario no tiene advertencias.", ephemeral: true })
              return
          } else if(await warns.get(user.id) > 4){
              const confirm = new Discord.ButtonBuilder()
              .setLabel("Confirmar")
              .setCustomId("confirm")
              .setStyle(Discord.ButtonStyle.Success)
              
              const cancel = new Discord.ButtonBuilder()
              .setLabel("Cancelar")
              .setCustomId("cancel")
              .setStyle(Discord.ButtonStyle.Danger)
              
              const row = new Discord.ActionRowBuilder()
              .addComponents(confirm)
              .addComponents(cancel)
              
              const response = await interaction.reply({ content: "❓ | Este usuario esta marcado como **⚠️ Usuario potencialmente peligroso ⚠️**\n¿Estas seguro de que quieres restablecer las advertencias de este usuario?", components: [row], ephemeral: true })
              
const collectorFilter = i => i.user.id === interaction.user.id;
try {
	const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

	if (confirmation.customId === 'confirm') {
        warns.delete(user.id)                    
        await confirmation.update({ content: `<@${user.id}>`, embeds: [SuccEmbed], components: [], ephemeral: false })
	} else if (confirmation.customId === 'cancel') {
		await confirmation.update({ content: 'Operacion cancelada.', components: [] });
	}
} catch (e) {
	await interaction.update({ content: 'Confirmacion no recibida, operacion cancelada', components: [] });
}
return
          }
          
          if(warns.tiene(user.id) === true){
              warns.delete(user.id)
              interaction.reply({ content: `<@${user.id}>`, embeds: [SuccEmbed] })
          } 
          
      }
      
      if(interaction.options.getSubcommand() === "totales"){

        warns.map(false, (v, key) => `Usuario: <@${key}>, warns: **${v}**`).then(datos => {
         const Warns = new Discord.EmbedBuilder()
         .setTitle("Warns totales")
         .setDescription(datos.join("\n"))
  	     .setColor(0x00aebd)
   	     .setTimestamp()
     	 .setFooter({ text: "New Undergrounds Moderation" })
         interaction.reply({ embeds: [Warns] })
            
        })
      }
      
  },
};