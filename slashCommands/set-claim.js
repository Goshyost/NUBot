const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const db = require("megadb")
const codes = new db.crearDB("claim_codes")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-claim")
    .setDescription("Agrega codigos a la base de datos")
    .addStringOption(p => p.setName("codigo").setDescription("codigo que vas a autorizar").setRequired(true).setMaxLength(19).setMinLength(4))
    .addStringOption(p => p.setName("metodo").setDescription("Elige si quieres quitar el codigo de la base de datos o agregarlo").setRequired(true)
                    .addChoices(
        						{ name: 'Agregar', value: 'agregar'},
        						{ name: 'Eliminar', value: 'elim'},
    								))
    .addRoleOption(p => p.setName("prize").setDescription("Selecciona el rol que se entregara por el codigo (NO PONER SI VAS A QUITAR UN CODIGO)").setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
      
       if(interaction.user.id !== "1144403268076830730") return interaction.reply({ content: "This command is currently developer-only, this may change in the future.", ephemeral: true })
  
  let code = interaction.options.getString("codigo")
  let prize = interaction.options.getRole("prize")
  let method = interaction.options.getString("metodo")
  
  if(!prize){
      if(method === "elim"){
          if(codes.tiene(code)){
              interaction.reply({ content: "✅ | Se ha eliminado el codigo: **"+code+"** completamente de la base de datos.", ephemeral: true })
              codes.eliminar(code)
              return
          } else {
              interaction.reply({ content: "❓ | El codigo que especificaste no esta en la base de datos.", ephemeral: true })
              return
          }
      } else {
          interaction.reply({ content: "❌ | Debes agregar un premio para el codigo, a menos que quieras eliminarlo.", ephemeral: true })
          return
      }
  }
	if(prize){
        if(method === "elim"){
          if(codes.tiene(code)){
              interaction.reply({ content: "✅ | Se ha eliminado el codigo: **"+code+"** completamente de la base de datos.", ephemeral: true })
              codes.eliminar(code)
              return
          } else {
              interaction.reply({ content: "❓ | El codigo que especificaste no esta en la base de datos.", ephemeral: true })
              return
          }
    }
    }
  if(codes.tiene(code)) return interaction.reply({ content: "❌ | El codigo que ingresaste, esta repetido. ", ephemeral: true })
  codes.set(code, { prize: prize.name, roleid: prize.id })
  interaction.reply({ content: `✅ | Se ha agregado el codigo: **"${code}"** a la base de datos con el premio: ${prize}`, ephemeral: true })
  
  
  
  
  
  
  
  },
};