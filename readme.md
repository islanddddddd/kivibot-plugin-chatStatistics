# justsix for KiviBot

[![npm-version](https://img.shields.io/npm/v/kivibot-plugin-justsix?color=527dec&label=kivibot-plugin-justsix&style=flat-square)](https://npm.im/kivibot-plugin-justsix)
[![dm](https://shields.io/npm/dm/kivibot-plugin-justsix?style=flat-square)](https://npm.im/kivibot-plugin-justsix)

[`KiviBot`](https://beta.kivibot.com) 的 666 插件，它没什么用，但是会跟着你发 6

**安装**

```shell
/plugin add justsix
```

**启用**

```shell
/plugin on justsix
```

**使用**

只要检测到单独的 6 或者大于 3 个 6，他就会跟着你发同样数量的 6

单独的 6 是精确匹配，大于三个 6 是模糊匹配，并只回应第一个

比如：

```
6 回 6
66 不回
666 回 666
6666 回 6666
66666 回 66666
666666 回 666666
6666666 回 6666666
66666666 回 66666666
666666666 回 666666666
.......................
```

**TODO**
1. 6的排行
   1. 根据时间跨度排行，每天，每周，每月...
   2. 排行种类
      1. 总的次数
      2. 单人次数
      3. 单次长度
      4. 固定时间内的次数，总长度
   3. 排行定时播报 
  
