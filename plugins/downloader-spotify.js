const fetch = require("node-fetch");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Masukkan URL!\n\nContoh:\n${usedPrefix + command} https://open.spotify.com/track/3zakx7RAwdkUQlOoQ7SJRt`;
  if (!args[0].match(/spotify/gi)) throw `URL Tidak Ditemukan!`;
  m.reply(wait);  
  try {
    const res = await fetch(
      `https://api.botcahx.live/api/download/spotify?url=${args[0]}&apikey=${btc}`
    );
    let jsons = await res.json();
    const { thumbnail, title, name, duration, url } = jsons.result.data;
    const { id, type } = jsons.result.data.artist;
    let captionvid = ` ∘ Title: ${title}\n∘ Id: ${id}\n∘ Duration: ${duration}\n∘ Type: ${type}`;
    let pesan = await conn.sendMessage(m.chat, {
      text: captionvid,
      contextInfo: {
        externalAdReply: {
          title: "",
          body: "Powered by",
          thumbnailUrl: thumbnail,
          sourceUrl: thumbnail,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true,
        },
      },
    });
    await conn.sendMessage(
      m.chat,
      { audio: { url: url }, mimetype: "audio/mpeg", contextInfo: {
        externalAdReply: {
          title: title,
          body: "",
          thumbnailUrl: thumbnail,
          sourceUrl: url,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true,
        }}} , { quoted: m }
    );
  } catch (e) {
    console.log(e);
    try {
      const resBackup = await fetch(
        `https://api.botcahx.live/api/download/spotify2?url=${args[0]}&apikey=${btc}`
      );
      let jsonsBackup = await resBackup.json();
      const { url: backupUrl, title: cap } = jsonsBackup.result;
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: backupUrl },
          mimetype: "audio/mpeg",
          contextInfo: {
            externalAdReply: {
              title: cap,
              body: "",
              thumbnailUrl: 'https://tinyurl.com/ynaxokc8',
              sourceUrl: backupUrl,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );
    } catch (e) {
      throw `*Server down!*`;
    }
  }
};
handler.help = ["spotify"];
handler.command = /^(spotify)$/i;
handler.tags = ["downloader"];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;
module.exports = handler;
