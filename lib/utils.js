// 时间过滤
function timeFilter(data, time) {}
// 6的数量
function getTime(data) {
    return `6了 ${data.length} 次`;
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

exports.getTime = getTime;
exports.getMaximumLengthOfASix = getMaximumLengthOfASix;
