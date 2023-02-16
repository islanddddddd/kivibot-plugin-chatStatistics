const { dayjs, segment } = require("@kivibot/core");
const { extract } = require("@node-rs/jieba");
const {
    getNum,
    timeFilter,
    getHotman,
    cutWord,
    getCutWord,
} = require("./utils");
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

// 播报昨天的情况
function all(plugin) {
    const config = plugin.loadConfig();
    const enableGroup = config.enableGroup;

    let returnArray = [];
    try {
        for (let index = 0; index < enableGroup.length; index++) {
            const enableGroup_id = enableGroup[index];
            const end = dayjs();
            const start = end.subtract(1, "day");

            const data = plugin.loadConfig(
                `data/plugins/chatStatistics/${enableGroup_id}.json`
            );
            const filteredData = timeFilter(data, dayjs(start), dayjs());

            // 词云
            const words = getCutWord(filteredData);
            let words_str = "";
            for (let index = 0; index < words.length; index++) {
                const element = words[index];
                words_str += `${index + 1}. ${element.keyword}\n`;
            }

            // 龙王
            const hotMan_id = getHotman(filteredData)[0];
            const hotMan_num = getHotman(filteredData)[1];
            // reply
            const reply = `昨天本群一共发送了${getNum(
                filteredData
            )}句消息，最热门的词是\r${words_str}`;
            const msgs = [
                reply,
                "龙王是",
                segment.at(hotMan_id),
                `,他/她一共说了${hotMan_num}句话。`,
            ];

            returnArray.push([enableGroup_id, msgs]);
        }
    } catch (error) {
        plugin.log(error);
    }

    return returnArray;
}
function wordCloud(start, end, group_id, plugin) {
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

    const words = getCutWord(filteredData);
    let words_str = "";
    for (let index = 0; index < words.length; index++) {
        const element = words[index];
        words_str += `${index + 1}. ${element.keyword}\n`;
    }

    reply = `${dayjs(start).format(dateFormat)}到${dayjs().format(
        dateFormat
    )}的高频词是${words_str}`;

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
    const reply = [
        `${dayjs(start).format(dateFormat)}到${dayjs().format(
            dateFormat
        )}的龙王是`,
        segment.at(hotArray[0]),
        `,他/她一共说了${hotArray[1]}句话。`,
    ];
    return reply;
}

exports.getNumberOfMessagesByTime = getNumberOfMessagesByTime;
exports.all = all;
exports.wordCloud = wordCloud;
exports.hotMan = hotMan;
