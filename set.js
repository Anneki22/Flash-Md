const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0FMYWxPa2ZlWFNZTW9qZVhoSkRJR3JJNElReHR3L1FycnVvckYxVWlGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielRmTUZFNEE2WC8xa1VQbHd2V2dDSnIrZ2FaY0lURW1iSEgzN1lMeDRUWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4R01FMlBuUlVuTS9TQXgzcnBGaDZpY0F0QTRtOXhqK1A0Wmo1Q3RBN2trPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSUJTTkorT1ZoT1UrNjRnb2NWK3NNZktqS2E0R2VIWXZzZVN4MHlNVGg0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktEa2ExdExMWmNaaEtSMWI3MllvcmNmRnl1QnJIdEZSTnNLS3FmK252bGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNKNHU5amFaZnhUYzBlYVVQYysva1djV0dwS2VCQzFSQURFK2Q1bnp1ekk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEFCdHRwblNKTm1NNzFwV1RvZi9ETUlZZ3ZJZVZJOUMyQytMQWowdDVXRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEszOVk1QmJMN2FKV1hXL01lNkRnTmVPdVEyL09uR2Q1bUpDZFJCOXIwOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ildqcy8yNmxqOVQ0eklabUxBVFdJRHlrVVd4Nm1qcFNkNEE0TTRxK1N6VEdqdTJqZnUvSDZlL1lFNmxWbjIyZWxmTW9MUnBiUk85dTBQNnFYY1NzTENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJsT2VwVU1XdVhNZlFxbWJrUkllUy9BYTBmR1RuTnlwOSt3WVUvSlA3MEhJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwNzc4MjU1OTVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOEEwOTFBRjZBNjFFRDc5QjI0QTQ0N0I0NDNEQUI2RjMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczNDEzMTQwNn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiWmpES0Y2TkdSRDJwU185TV9IUFdSQSIsInBob25lSWQiOiIyOWNjOTg4Ny1lN2U3LTQxM2YtYTNiZi1mYTg5YzI2OTI2Y2MiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVB1ZFlZL0hQNGhGVm0zelZtWkNFSkpsN1BJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRpWHp0T0Z5dEsxNWZ3a2QrOStHUHphN1luWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI0TEhXODczQSIsIm1lIjp7ImlkIjoiMjM0ODA3NzgyNTU5NTozN0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLmrbtf77yu77yl77yt77yl77yz77yp77y4In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJT3M0aWtRdC8zeXVnWVlDaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJCRk0zZktRSVNXR2FNQjI5TG9DL0dHa0drNXJ5N1dLS2lPQ1c3OU1CeEdBPSIsImFjY291bnRTaWduYXR1cmUiOiJGQUdyOVFsTGtzWTNSSDJjWGp0cUVqNWE2VmdqUGpKYTA1bVpMdzNWS3BGNU1tMndWZ2szV2NGUm5SRW1SZzd6dUpHeUpzNUFjVHJjNzIxZTQvRFpCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiM1JNMDY5Mlp0NzNkdnZTbTVZZEk2TndLVG1ROEpNc2dFYmt5aTAzVHZFTGkvaTFUVkRUYWlHU2xuK1l6clcxNkgxVk5uNzhYK3VBeC9aditTbm85Q2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDc3ODI1NTk1OjM3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFSVE4zeWtDRWxobWpBZHZTNkF2eGhwQnBPYTh1MWlpb2pnbHUvVEFjUmcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQxMzEzOTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQm1SIn0=',
    PREFIXES: (process.env.PREFIX || 'X').split('X').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "死_ＮＥＭＥＳＩＸ",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2348077825595",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "off",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
