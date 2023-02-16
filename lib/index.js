const { KiviPlugin, segment } = require("@kivibot/core");

const { saveLog } = require("./utils");

const { version } = require("../package.json");
const {
    getNumberOfMessagesByTime,
    all,
    cutWord,
    hotMan,
    wordCloud,
} = require("./server");
const { plugins } = require("@kivibot/core/lib/core/start");
const plugin = new KiviPlugin("chatStatistics", version);

plugin.onMounted((bot, admins) => {
    plugin.onAdminCmd("/聊天记录", (event, params, options) => {
        const [isOn, ...otherParams] = params;
        let config = plugin.loadConfig();
        if (config.enableGroup == undefined) {
            config = {
                enableGroup: [],
            };
        }

        const { group_id } = event;

        if (isOn == "on") {
            if (!config.enableGroup.includes(group_id)) {
                config.enableGroup.push(group_id);
                event.reply("本群已开启历史记录统计");
            } else {
                event.reply("本群已开启历史记录统计");
            }
        } else if (isOn == "off") {
            const index = config.enableGroup.indexOf(group_id);

            if (index > -1) {
                config.enableGroup.splice(index, 1);
                event.reply("本群已关闭历史记录统计");
            } else {
                event.reply("本群本就未开启历史纪录统计");
            }
        }
        plugin.saveConfig(config);
    });
    plugin.onCmd("/聊天记录", (event, params, options) => {
        const [mode, start, end, ...otherParams] = params;
        try {
            const { group_id } = event;

            let reply = "默认回复内容";

            switch (mode) {
                case "on":
                    return;
                case "off":
                    return;
                case "次数":
                    reply = getNumberOfMessagesByTime(
                        start,
                        end,
                        group_id,
                        plugin
                    );
                    break;
                case "词云":
                    reply = wordCloud(start, end, group_id, plugin);
                    break;
                case "龙王":
                    reply = hotMan(start, end, group_id, plugin);
                    break;
                default:
                    reply = "聊天记录插件：参数不正确";
                    break;
            }
            return event.reply(reply);
        } catch (error) {
            return event.reply(error);
        }
    });
    // 保存记录
    plugin.onGroupMessage((event, bot) => {
        isBotSelf = event.sender.user_id == plugin.bot.uin;
        if (isBotSelf) {
            return;
        }
        const config = plugin.loadConfig();
        try {
            const { time, sender, group_id, group_name, raw_message } = event;
            if (config.enableGroup.includes(group_id)) {
                saveLog(
                    time,
                    sender,
                    group_id,
                    group_name,
                    raw_message,
                    plugin
                );
            }
        } catch (error) {
            event.reply(error);
        }
    });
    // 定时播报
    const task = plugin.cron("0 8 * * *", () => {
        const enableGroup = all(plugin);

        for (let index = 0; index < enableGroup.length; index++) {
            const element = enableGroup[index];
            bot.pickGroup(element[0]).sendMsg(element[1]);
        }
    });
});

module.exports = { plugin };
