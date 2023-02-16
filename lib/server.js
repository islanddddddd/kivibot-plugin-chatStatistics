const { dayjs } = require("@kivibot/core");
const { extract } = require("@node-rs/jieba");
const { getNum, timeFilter, getHotman } = require("./utils");
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

        const reply = `昨天本群一共发送了${getNum(
            filteredData
        )}句消息，最热门的词是\r${cutWord(filteredData)}`;
        returnArray.push([enableGroup_id, reply]);
    }
    return returnArray;
}

function cutWord(data) {
    let text = "";
    for (let index = 0; index < data.length; index++) {
        const raw_message = data[index].raw_message;
        text += raw_message;
    }
    const words = extract(text, 10);
    let reply = "";
    for (let index = 0; index < words.length; index++) {
        const element = words[index];
        reply += `${index + 1}. ${element.keyword}\n`;
    }
    return reply;
}

function hotMan(start, end, group_id, plugin) {
    const data = plugin.loadConfig(
        `data/plugins/chatStatistics/${group_id}.json`
    );

    let filteredData = data;

    if (end == undefined) {
        if (start != undefined) {
            filteredData = timeFilter(data, new Date(start), new Date());
        } else {
        }
    } else {
        filteredData = timeFilter(data, new Date(start), new Date(end));
    }
    const hotArray = getHotman(filteredData);
    reply = `${dayjs(start).format(dateFormat)}到${dayjs().format(
        dateFormat
    )}的龙王是${hotArray[0]},他一共说了${hotArray[1]}句话`;
    return reply;
}

exports.getNumberOfMessagesByTime = getNumberOfMessagesByTime;
exports.all = all;
exports.cutWord = cutWord;
exports.hotMan = hotMan;
