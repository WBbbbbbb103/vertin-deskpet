# 维尔汀 · 雨夜书桌

以《重返未来：1999》的维尔汀为灵感制作的 Windows 像素桌宠。可以把她拖到桌面一角，点帽子打招呼、聊几句、开一段专注计时，或者在休息时拾雨、翻看箱中档案。

<img src="preview/desk.png" alt="维尔汀桌宠与快捷工具条" width="250"> <img src="preview/wardrobe.png" alt="衣橱中的外勤相机试穿预览" width="250">

## Windows 安装教程

### 1. 安装 Node.js

打开 [Node.js 下载页](https://nodejs.org/en/download)，下载 Windows 安装程序（`.msi`）。本项目使用的 Electron 需要 **Node.js 22.12.0 或更高版本**。安装时保留默认组件，包含 npm 和添加到 PATH 的选项。

装好后重新打开 PowerShell，运行下面两个命令检查版本号。

```powershell
node --version
npm.cmd --version
```

### 2. 下载并解压项目

在 GitHub 仓库页面点击绿色 **Code → Download ZIP**。右键 ZIP，选择「全部解压缩」，然后打开解压后的 `vertin-deskpet-main` 文件夹。看到 `package.json`、`Start-Vertin.bat` 和 `assets` 文件夹后，就到了正确的位置。 [GitHub 下载源码说明](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives)

如果电脑已经安装 Git，也可以在 PowerShell 中克隆仓库。

```powershell
git clone https://github.com/WBbbbbbb103/vertin-deskpet.git
cd vertin-deskpet
```

### 3. 安装依赖并首次启动

在项目文件夹的资源管理器地址栏输入 `powershell`，按回车。接着依次运行下面两条命令。

```powershell
npm.cmd ci --include=dev
npm.cmd start
```

等第一条命令完成再运行第二条。第一次启动可能会下载 Electron 运行文件，请保持联网。看到桌面上的维尔汀或系统托盘里的桌宠图标后，安装就完成了。之后可以双击同目录下的 `Start-Vertin.bat`。 [npm 安装命令说明](https://docs.npmjs.com/cli/v11/commands/npm-ci/) · [Electron 下载说明](https://www.electronjs.org/docs/latest/tutorial/installation)

### 4. 显示、隐藏和退出

- 拖动维尔汀可以调整桌面位置。点击角色、右键角色或点击旁边的菜单按钮，可以打开对话和功能入口。
- 找不到她时，按 `Ctrl + Shift + V`，或在任务栏右下角的托盘菜单里选择显示。托盘图标可能收在「显示隐藏的图标」里。
- 关闭面板或隐藏桌宠后，应用仍会在后台运行。需要结束运行时，从托盘菜单选择「退出」。

## 可以做什么

| 操作 | 功能 |
| --- | --- |
| 点击头部、帽子或身体 | 摸头、抬帽或闲聊 |
| `C` | 打开聊天输入框，默认使用离线台词 |
| `F` | 15、25、45 分钟专注，或 5、10 分钟小憩 |
| `G` / `P` | 开始 20 秒拾雨，游戏中暂停或继续 |
| `R` | 打开旧日记录。进入「箱中档案」可搜索国服 4.1 的 139 个可玩角色条目和 27 个剧情人物条目 |
| `W` | 打开衣橱，试穿、换装和查看解锁条件 |
| `S` | 打开设置，调整角色大小、音效、置顶、语言和主动发言频率 |
| `Esc` | 关闭当前对话、菜单或面板 |

通过「更多 → 角色资料」可以看今日陪伴、等级轨迹和累积记录。亲密度最高可升到 Lv.30，衣橱目前有 18 件外观，包括蓝石领巾、外勤相机、箱侧合影和外勤调查服。中英文界面可以在设置中切换。

## 可选配置 DeepSeek 聊天

离线模式可以直接聊天。想让模型生成回复时，按以下步骤设置。

1. 在 [DeepSeek 开放平台](https://platform.deepseek.com/api_keys) 创建自己的 API Key。
2. 按 `S` 打开桌宠设置，找到「DeepSeek 连接」，填入 Key。接口默认是 `https://api.deepseek.com`，模型默认是 `deepseek-chat`。
3. 点击「保存」，再点击「测试连接」。测试成功后，勾选「用 DeepSeek 生成聊天回复」并保存。
4. 按 `C` 试发一句话。请求失败或超时时，桌宠会使用本地台词。

启用后，聊天内容和生成回复所需的少量角色资料或陪伴记录会发往你配置的接口，调用费用由对应账号承担。Key 通过 Windows 系统加密保存在本机。陪伴记录和最近话题可以在设置里关闭或清空。

## 更新与备份

- 从 ZIP 安装时，下载新版并解压到新目录，按安装步骤重新运行。用 Git 安装时，先从托盘退出桌宠，再执行 `git pull` 和 `npm.cmd ci --include=dev`。
- 默认优先沿用已有的用户数据目录，通常是 `%APPDATA%\VertinDeskPet`。如果应用在项目目录使用了 `userdata`，更新前请备份该目录。可以在资源管理器地址栏输入 `%APPDATA%\VertinDeskPet`，查看其中是否有 `startup.log`。
- 若以前用的是便携版，数据可能在原便携版文件夹的 `userdata` 里。退出旧版后再备份。迁移到另一台电脑后，建议重新填写 DeepSeek Key，系统加密的旧 Key 可能无法解开。

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| 找不到 `node` 或 `npm.cmd` | 安装 Node.js 后重开终端。仍找不到时，检查安装时是否将 Node.js 加入 PATH。 |
| PowerShell 提示禁止运行 `npm.ps1` | 用教程里的 `npm.cmd` 运行命令。 |
| `npm` 提示找不到 `package.json` | 检查当前目录是否是解压后含 `package.json` 的那一层。 |
| 双击脚本提示缺少 Electron | 先按第 3 步安装依赖并用 `npm.cmd start` 完成首次启动。 |
| 首次启动下载失败或超时 | 检查网络是否能访问 npm 仓库和 GitHub。恢复连接后再次运行 `npm.cmd start`。 |
| 已运行但看不到角色 | 在托盘菜单中显示桌宠，或按 `Ctrl + Shift + V`。若系统已有一个桌宠实例，第二次启动会唤回原窗口。 |
| DeepSeek 测试失败 | 检查 Key、接口地址、模型名、账号额度和网络。保存后再测一次。 |

如果浏览器能通过本机代理访问 GitHub，但 Electron 下载仍超时，可让当前 PowerShell 窗口沿用代理。将示例中的地址和端口改成自己正在使用的 HTTP 代理，再重新启动。 [Electron 代理配置说明](https://www.electronjs.org/docs/latest/tutorial/installation#proxies)

```powershell
$env:HTTPS_PROXY = 'http://127.0.0.1:7897'
$env:HTTP_PROXY = $env:HTTPS_PROXY
$env:ELECTRON_GET_USE_PROXY = '1'
npm.cmd start
```

## 项目结构与素材

- `main.js` 和 `preload.js` 管理桌宠窗口、托盘、数据目录与聊天请求。
- `renderer/` 包含像素场景、互动、衣橱、专注计时、拾雨和角色档案。
- `assets/` 包含随应用载入的像素素材、图标和字体。

这是非商业同人项目。《重返未来：1999》及维尔汀角色版权归深蓝互动（Bluepoch）所有。桌宠中的同人对话与旧日记录包含原创演绎。思源宋体由 Adobe 发布，随仓库附带 [SIL Open Font License 1.1](assets/fonts/OFL-SourceHanSerif.txt) 和 [版权说明](assets/fonts/NOTICE-SourceHanSerif.txt)。
