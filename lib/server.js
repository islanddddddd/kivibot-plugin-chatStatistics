const { dayjs } = require("@kivibot/core");
const { plugin } = require(".");
const { getNum, timeFilter } = require("./utils");
const dateFormat = "YYYY/M/D";

function getNumberOfMessagesByTime(start, end, group_id, plugin) {
    const data = plugin.loadConfig(
        `data/plugins/chatStatistics/${group_id}.json`
    );

    if (end == undefined) {
        if (start != undefined) {
            const filteredData = timeFilter(data, new Date(start), new Date());
            reply = `${dayjs(start).format(dateFormat)}到${dayjs().format(
                dateFormat
            )}本群一共发了${getNum(filteredData)}句消息`;
        } else {
            reply = `本群记录的最早的消息是${dayjs(data[0].date).format(
                dateFormat
            )}，直到${dayjs().format(dateFormat)}本群一共发了${
                data.length
            }句消息`;
        }
    } else {
        const filteredData = timeFilter(data, new Date(start), new Date(end));

        reply = `${dayjs(start).format(dateFormat)}到${dayjs(end).format(
            dateFormat
        )}本群一共发了${getNum(filteredData)}句消息`;
    }

    return reply;
}

function all(plugin) {
    const config = plugin.loadConfig();
    const enableGroup = config.enableGroup;

    let returnArray = [];

    for (let index = 0; index < enableGroup.length; index++) {
        const enableGroup_id = enableGroup[index];
        const end = dayjs();
        const start = end.subtract(1, "day");

        const data = plugin.loadConfig(
            `data/plugins/chatStatistics/${enableGroup_id}.json`
        );
        const filteredData = timeFilter(data, dayjs(start), dayjs());
        const reply = `昨天本群一共发送了${getNum(filteredData)}句消息`;
        returnArray.push([enableGroup_id, reply]);
    }
    return returnArray;
}

exports.getNumberOfMessagesByTime = getNumberOfMessagesByTime;
exports.all = all;
