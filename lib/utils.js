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
function timeFilter(data, startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);

    return data.filter((item) => {
        const date = new Date(item.date);
        return date >= start && date <= end;
    });
}
// 聊天记录的数量
function getNum(data) {
    return data.length;
}

function getHotman(data) {
    let sender = {};
    data.forEach((element) => {
        // 如果这个数字已经出现过，将它的次数加一
        if (sender[element.sender_id]) {
            sender[element.sender_id]++;
        }
        // 否则，将这个数字的次数设置为1
        else {
            sender[element.sender_id] = 1;
        }
    });
    const maxKey = Object.entries(sender).reduce(
        (max, [key, value]) => (value > max[1] ? [key, value] : max),
        ["", -Infinity]
    )[0];
    return [maxKey, sender[maxKey]];
}
exports.saveLog = saveLog;
exports.getNum = getNum;
exports.timeFilter = timeFilter;
exports.getHotman = getHotman;
