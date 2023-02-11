const { KiviPlugin, segment } = require("@kivibot/core");

const { saveLog, getNum, timeFilter } = require("./utils");

const { version } = require("../package.json");
const plugin = new KiviPlugin("chatStatistics", version);
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

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
    plugin.onCmd("/聊天记录", (event, params, options) => {
        const [mode, start, end, ...otherParams] = params;
        try {
            const { time, sender, group_id, group_name, raw_message } = event;

            const data = plugin.loadConfig(
                `data/plugins/chatStatistics/${group_id}.json`
            );

            let reply = "默认回复内容";

            switch (mode) {
                case "on":
                    return;
                case "off":
                    return;

                case "次数":
                    if (end == undefined) {
                        if (start != undefined) {
                            const filteredData = timeFilter(
                                data,
                                new Date(start),
                                new Date()
                            );
                            reply = `${new Date(start).format(
                                "yyyy-MM-dd"
                            )}到${new Date().format(
                                "yyyy-MM-dd"
                            )}${group_name}一共发了${getNum(
                                filteredData,
                                event
                            )}句消息`;
                        } else {
                            reply = getNum(data, event);
                        }
                    } else {
                        const filteredData = timeFilter(
                            data,
                            new Date(start),
                            new Date(end)
                        );
                        reply = `${new Date(start).format(
                            "yyyy-MM-dd"
                        )}到${new Date(end).format(
                            "yyyy-MM-dd"
                        )}${group_name}一共发了${getNum(
                            filteredData,
                            event
                        )}句消息`;
                    }
                    break;
                default:
                    reply = "聊天记录插件：参数不正确";
                    break;
            }
            return event.reply(reply);
        } catch (error) {
            return event.reply(error);

            plugin.log(error);
        }
    });
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
