// 保存记录
function saveLog(time, sender, group_id, group_name, raw_message, plugin) {
    try {
        let date = new Date(time * 1000);
        // 记录格式
        let record = {
            date: date,
            sender_id: sender.user_id,
            raw_message,
        };
        const oldData = plugin.loadConfig(
            `data/plugins/chatStatistics/${group_id}.json`
        );
        if (oldData.length == undefined) {
            plugin.saveConfig(
                [record],
                `data/plugins/chatStatistics/${group_id}.json`
            );
        } else {
            oldData.push(record);
            plugin.saveConfig(
                oldData,
                `data/plugins/chatStatistics/${group_id}.json`
            );
        }
    } catch (error) {
        return "err";
    }
    return "success";
}
// 时间过滤
function timeFilter(data, time) {}
// 聊天记录得数量
function getNum(data, event) {
    const { time, sender, group_id, group_name, raw_message } = event;

    return `${group_name}说了${data.length}句`;
}

exports.saveLog = saveLog;
exports.getNum = getNum;
