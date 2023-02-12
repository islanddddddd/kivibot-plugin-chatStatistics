const { plugin } = require(".");
const { getNum, timeFilter } = require("./utils");

function getNumberOfMessagesByTime(start, end, group_id, plugin) {
    const data = plugin.loadConfig(
        `data/plugins/chatStatistics/${group_id}.json`
    );

    if (end == undefined) {
        if (start != undefined) {
            const filteredData = timeFilter(data, new Date(start), new Date());

            reply = `${new Date(start).format(
                "yyyy-MM-dd"
            )}到${new Date().format("yyyy-MM-dd")}本群一共发了${getNum(
                filteredData
            )}句消息`;
        } else {
            reply = `本群记录的最早的消息是${new Date(data[0].date).format(
                "yyyy-MM-dd"
            )}，直到${new Date().format("yyyy-MM-dd")}本群一共发了${
                data.length
            }句消息`;
        }
    } else {
        const filteredData = timeFilter(data, new Date(start), new Date(end));

        reply = `${new Date(start).format("yyyy-MM-dd")}到${new Date(
            end
        ).format("yyyy-MM-dd")}本群一共发了${getNum(filteredData)}句消息`;
    }

    return reply;
}

exports.getNumberOfMessagesByTime = getNumberOfMessagesByTime;
