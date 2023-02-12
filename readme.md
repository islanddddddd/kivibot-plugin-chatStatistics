# chatStatistics for KiviBot

[![npm-version](https://img.shields.io/npm/v/kivibot-plugin-chatstatistics?color=527dec&label=kivibot-plugin-chatstatistics&style=flat-square)](https://npm.im/kivibot-plugin-chatstatistics)
[![dm](https://shields.io/npm/dm/kivibot-plugin-chatstatistics?style=flat-square)](https://npm.im/kivibot-plugin-chatstatistics)

[`KiviBot`](https://beta.kivibot.com) 的 聊天统计 插件。

# 安装

```
/plugin add chatstatistics
```

# 启用

```
/plugin on chatstatistics
```

# 使用

## 机器人管理员输入以下消息指令打开或关闭聊天记录功能
```
/聊天记录 on 或/聊天记录 off
```

## 输入以下消息指令查看时间段内当前群发了多少条消息。

startTime跟endTime的格式要能被正确的转换成日期格式，也可不填写，不填写就返回从有记录到当前日期所有聊天记录的次数。
```
/聊天记录 次数 [startTime] [endTime]
```

## 输入以下消息指令查看时间段内当前群聊消息的热词

还没加时间过滤，现在默认返回全部时间段的热门词
```
/聊天记录 词云
```
## 定时播报功能

每天早上八点自动播报昨天的聊天次数跟热词
（以后还会加点别的）




# TODO
1. 统计
   1. ~~高频词~~
   2. 词云
   3. 发消息最多的人（龙王）
2. ~~权限组：每个群开启权后才会开始监控~~
3. 过滤
   1. ~~根据某段时间~~
   2. 根据某个关键词
4. ~~周期性统计报告~~
   1. 可自定义报告时间
5. 可自定义日期显示格式
  
