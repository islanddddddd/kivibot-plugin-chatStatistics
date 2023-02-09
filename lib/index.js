const { KiviPlugin, segment } = require("@kivibot/core");

const { saveLog } = require("./utils");

const { version } = require("../package.json");
const { stringify } = require("querystring");
const plugin = new KiviPlugin("chatStatistics", version);
plugin.onMounted((bot, admins) => {
    plugin.onAdminCmd("/聊天记录", (event, params, options) => {
        const [isOn, ...otherParams] = params;

        const config = plugin.loadConfig();

        const { group_id } = event;

        if (isOn == "on") {
            if (!config.enableGroup.includes(group_id)) {
                config.enableGroup.push(group_id);
                event.reply("本群已开启历史记录统计");
            } else {
                event.reply("本群已开启历史记录统计");
            }
        } else if (isOn == "off") {
            plugin.log("ison off");
            const index = config.enableGroup.indexOf(group_id);
            plugin.log(index);

            if (index > -1) {
                config.enableGroup.splice(index, 1);
                event.reply("本群已关闭历史记录统计");
            } else {
                event.reply("本群本就未开启历史纪录统计");
            }
        }
        plugin.saveConfig(config);
    });
    // plugin.onCmd("/聊天记录", (event, params, options) => {
    //     const [rankMode, ...otherParams] = params;
    //     let reply = "";
    //     switch (rankMode) {
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
    //     return event.reply(reply);
    // });
    // 保存记录
    plugin.onGroupMessage((event, bot) => {
        isBotSelf = event.sender.user_id == plugin.bot.uin;
        if (isBotSelf) {
            return;
        }
        const config = plugin.loadConfig();

        const { time, sender, group_id, group_name, raw_message } = event;
        if (config.enableGroup.includes(group_id)) {
            saveLog(time, sender, group_id, group_name, raw_message, plugin);
        }
    });
});

module.exports = { plugin };
