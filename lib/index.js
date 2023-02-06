const { KiviPlugin, segment } = require("@kivibot/core");

const utils = require("./utils");

const { version } = require("../package.json");
const plugin = new KiviPlugin("justsix", version);

const config = {};

plugin.onMounted((bot, admins) => {
    plugin.saveConfig(Object.assign(config, plugin.loadConfig()));

    plugin.onCmd("查6", (event, params, options) => {
        const [rankName, ...otherParams] = params;
        const data = plugin.loadConfig("data/plugins/justsix/data.json");
        if (Object.keys(data).length === 0) {
            event.reply("还没人6过");
            return;
        }

        let reply = "";
        switch (rankName) {
            case "次数":
                reply = utils.getTime(data);
                break;
            case "长度":
                reply = utils.getMaximumLengthOfASix(data);
                break;

            default:
                reply = "justsix：参数不正确";
                break;
        }
        event.reply(reply);
    });

    plugin.onMessage((event, bot) => {
        isBotSelf = event.sender.user_id == plugin.bot.uin;
        if (isBotSelf) {
            return;
        }

        const { time, sender, group_id, group_name, raw_message } = event;
        // re
        const patt1 = /6{3}6*/;
        if (raw_message === "6") {
            saveLog(1);
            event.reply("6");
        } else if (patt1.test(raw_message)) {
            const match = raw_message.match(patt1);
            saveLog(match[0].length);
            event.reply(match);
        }

        // 保存记录
        function saveLog(num) {
            let date = new Date(time * 1000);
            // 记录格式
            let record = {
                time:
                    date.getFullYear() +
                    "年" +
                    (date.getMonth() + 1) +
                    "月" +
                    date.getDate() +
                    "日" +
                    date.getHours() +
                    "时" +
                    date.getMinutes() +
                    "分" +
                    date.getSeconds() +
                    "秒",
                sender: {
                    id: sender.user_id,
                    name: sender.nickname,
                    sex: sender.sex,
                    age: sender.age,
                },
                group: {
                    id: group_id,
                    name: group_name,
                },
                num: num,
            };

            const oldData = plugin.loadConfig("data/plugins/justsix/data.json");
            if (oldData.length == undefined) {
                plugin.saveConfig([record], "data/plugins/justsix/data.json");
            } else {
                oldData.push(record);
                plugin.saveConfig(oldData, "data/plugins/justsix/data.json");
            }
        }
    });
});

module.exports = { plugin };
