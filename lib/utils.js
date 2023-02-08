// 保存记录
function saveLog(time, sender, group_id, group_name, raw_message, plugin) {
    try {
        let date = new Date(time * 1000);
        // 记录格式
        let record = {
            date: date,
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
            raw_message,
        };
        const oldData = plugin.loadConfig(
            `data/plugins/chatStatistics/${group_name}(${group_id}).json`
        );
        if (oldData.length == undefined) {
            plugin.saveConfig(
                [record],
                `data/plugins/chatStatistics/${group_name}(${group_id}).json`
            );
        } else {
            oldData.push(record);
            plugin.saveConfig(
                oldData,
                `data/plugins/chatStatistics/${group_name}(${group_id}).json`
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
function getTime(data) {
    return ` ${data.length} `;
}
// 最长的6
function getMaximumLengthOfASix(data) {
    // targetRecord
    let tr;

    data.forEach((record) => {
        if (tr == undefined) tr = record;
        else if (record.num > tr.num) tr = record;
    });
    return `最长的6是${tr.time}${tr.sender.name}(${tr.sender.id})发的${tr.num}个6`;
}

exports.saveLog = saveLog;
exports.getTime = getTime;
exports.getMaximumLengthOfASix = getMaximumLengthOfASix;
