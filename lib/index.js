const { KiviPlugin, segment } = require("@kivibot/core");

const { saveLog } = require("./utils");

const { version } = require("../package.json");
const plugin = new KiviPlugin("chatStatistics", version);

const config = { enableGroup: [] };

plugin.onMounted((bot, admins) => {
    plugin.saveConfig(Object.assign(config, plugin.loadConfig()));

    // plugin.onCmd("查6", (event, params, options) => {
    //     const [rankName, ...otherParams] = params;
    //     const data = plugin.loadConfig("data/plugins/justsix/data.json");
    //     if (Object.keys(data).length === 0) {
    //         event.reply("还没人6过");
    //         return;
    //     }

    //     let reply = "";
    //     switch (rankName) {
    //         case "次数":
    //             reply = utils.getTime(data);
    //             break;
    //         case "长度":
    //             reply = utils.getMaximumLengthOfASix(data);
    //             break;

    //         default:
    //             reply = "justsix：参数不正确";
    //             break;
    //     }
    //     event.reply(reply);
    // });

    plugin.onGroupMessage((event, bot) => {
        isBotSelf = event.sender.user_id == plugin.bot.uin;
        if (isBotSelf) {
            return;
        }

        const { time, sender, group_id, group_name, raw_message } = event;
        if (config.enableGroup.includes(group_id)) {
            saveLog(time, sender, group_id, group_name, raw_message, plugin);
        }
    });
});

module.exports = { plugin };
