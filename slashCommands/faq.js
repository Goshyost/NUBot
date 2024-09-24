const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faq")
    .setDescription("¿Tienes una duda sobre el servidor? Mira las preguntas frecuentes.")
    .addStringOption(option => 
                    option.setName("preguntas")
                    .setDescription("Listado de preguntas frecuentes")
                    .setRequired(true)
                    .addChoices(
                        { name: '❓ | ¿Como puedo formar parte del STAFF?', value: 'question_staff' },
                        { name: '❓ | ¿Cual es la IP del servidor?', value: 'question_ip' },
                        { name: '❓ | ¿Como puedo comprar rango VIP?', value: 'question_vip' },
                        { name: '❓ | ¿Como me hago creador de contenido del servidor?', value: 'question_yt' },
                        { name: '❓ | ¿Como puedo adquirir rangos?', value: 'question_rangos' },
                        { name: '❓ | ¿Como puedo comprar un Hint?', value: 'question_hint' },
                    ))
    .addBooleanOption(option =>
                     option.setName("oculto")
                     .setDescription("Si seleccionas True, la respuesta del bot solo la podras ver tu.")
                     .setRequired(false)),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
      
  const opcion = interaction.options.getString("preguntas")
  const bol = interaction.options.getBoolean("privado")
  
      const QuestionIPEmbed = new Discord.EmbedBuilder()
      .setTitle("¿Cual es la IP del servidor?")
      .setDescription(`¡Hola ${interaction.user}! \n\nLa direccion IP del servidor es: **191.96.186.123:7877**\n\nPara entrar al servidor via IP, deberas entrar a el apartado de **Servidores** en el juego\n\nDespues deberas presionar en el boton **Conexion Directa**.\n\nDespues, inserta la direccion de IP en el recuadro: **Enter IP/Hostname**`)
      .setImage("https://media.discordapp.net/attachments/1204694109898547232/1273524030976032874/image.png?ex=66beed2d&is=66bd9bad&hm=74ca0e135e3a99b850b9772987cd6e080557def186ce2862e86f79ad22aee4db&=&format=webp&quality=lossless&width=1021&height=477")
      .setColor("Yellow")
      .setTimestamp()
      .setFooter({ text: "NEW UNDERGROUNDS" })
      
      const QuestionStaffEmbed = new Discord.EmbedBuilder()
      .setTitle("¿Como puedo formar parte del STAFF?")
      .setDescription(`¡Hola ${interaction.user}! \n\nEl proceso para ser staff consta en tener un tiempo de 1 mes en el servidor y ser muy activo, además de portarse bien con el staff y con el resto de usuarios\n\nSe publicara en el canal de anuncios cuando las postulaciones sean abiertas.\n\nEste proceso se realiza a travez de un formulario que deberas rellenar, despues tus respuestas seran evaluadas y se te hara saber si has sido seleccionado para formar parte del Staff. `)
      .setImage("https://media.discordapp.net/attachments/1204694109898547232/1273778695701532796/image.png?ex=66bfda5a&is=66be88da&hm=2b228487c61247ea50dcf7a53b87b45052748631020810636cc25e07d18b8c0c&=&format=webp&quality=lossless&width=1382&height=550")
      .setColor("Yellow")
      .setTimestamp()
      .setFooter({ text: "NEW UNDERGROUNDS" })
      
      const QuestionVipEmbed = new Discord.EmbedBuilder()
      .setTitle("¿Como puedo comprar rango VIP?")
      .setDescription(`¡Hola ${interaction.user}! \n\npara comprar un rango **VIP** solo tienes que abrir un ticket general y solicitarlo. En nuestro canal de <#1095409292485591162> estan sus precios\n\nPuedes pagar via **Patreon** o **Paypal**. `)
      .setImage("https://media.discordapp.net/attachments/1204694109898547232/1273780555917557780/image.png?ex=66bfdc16&is=66be8a96&hm=e1d2a7fdad8a7a6052e71f1a3a2920fc952faf4db538ba893eb1ad71a2cee2c5&=&format=webp&quality=lossless&width=365&height=66")
      .setColor("Blue")
      .setTimestamp()
      .setFooter({ text: "NEW UNDERGROUNDS" })
      
      
      const QuestionHintEmbed = new Discord.EmbedBuilder()
      .setTitle("¿Como puedo comprar un Hint?")
      .setDescription(`¡Hola ${interaction.user}!\n\nPuedes comprar un Hint por tan solo **1 Dolar** en el canal <#1069455495598977034>\n\n**¿Que es un Hint?**\nUn Hint es el texto que aparece abajo cuando eres espectador en el servidor, estos mensajes rotaran aleatoriamente, puedes comprar uno y poner el mensaje que quieras, mientras este cumpla las normativas del servidor.\n\nEntra a el canal #HintShop para mas informacion\n\nPuedes pagar via **Paypal**. `)
      .setColor("Yellow")
      .setTimestamp()
      .setFooter({ text: "NEW UNDERGROUNDS" })
      
      const QuestionYTEmbed = new Discord.EmbedBuilder()
      .setTitle("¿Como me hago creador de contenido del servidor?")
          .setDescription(`¡Hola ${interaction.user}!\n\nPara ser creador de contenido en el servidor y obtener el rol **Youtuber** o **Streamer**\n\nSimplemente tienes que abrir un ticket en **Soporte Administrativo** y le atenderemos para darle su respectivo rango. \n\nPero tienes que ser moderadamente constante o puedes perder el rol, así como otros rangos que tengas que solicitar.`)
      .setColor("Yellow")
      .setImage("https://media.discordapp.net/attachments/1225744850050351115/1275004944168255500/image.png?ex=66c45063&is=66c2fee3&hm=fbe7c7bbd1f4a4d869e853a04dca45b7085b30f9cd6d1a1747568acf66efa6d0&=&format=webp&quality=lossless&width=320&height=43")
      .setTimestamp()
      .setFooter({ text: "NEW UNDERGROUNDS" })
      
  if(opcion === "question_ip"){
      interaction.reply({ embeds: [QuestionIPEmbed], ephemeral: bol })
  }
  if(opcion === "question_staff"){
      interaction.reply({ embeds: [QuestionStaffEmbed], ephemeral: bol })
  }
  if(opcion === "question_vip"){
      interaction.reply({ embeds: [QuestionVipEmbed], ephemeral: bol })
  }
  if(opcion === "question_hint"){
      interaction.reply({ embeds: [QuestionHintEmbed], ephemeral: bol })
  }
  if(opcion === "question_rangos"){
      interaction.reply({ content: "Esta opcion todavia no esta disponible...", ephemeral: true })
  }
  if(opcion === "question_yt"){
      interaction.reply({ embeds: [QuestionYTEmbed], ephemeral: bol })
  }
      
  },
};