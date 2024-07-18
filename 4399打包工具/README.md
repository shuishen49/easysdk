
# 4399打包工具介绍

## 项目简介
该项目包含了一系列工具和脚本，用于管理和打包 `web-mobile` 目录下的资源。本项目的核心是替换指定文件中的字符串，并对 `web-mobile` 目录进行打包。
该工具主要用于 4399 小游戏的打包，以确保符合 4399 小游戏的规范要求。

## 目录结构
```
build
├── main.py
├── plusjs4399.py
├── rename_cconb_files.py
├── replace_strings.py
├── run.bat
├── web-mobile
│   ├── assets
│   │   ├── main
│   │   │   ├── index.js
```

## 使用说明

1. **确认目录结构**：
    - 请确保在 `build` 目录下存在 `web-mobile` 文件夹。

2. **修改 `replace_strings.py` 文件**：
    - 打开 `replace_strings.py` 文件。
    - 修改 `strings_to_replace` 列表，添加需要替换的字符串。
    ```python
    # replace_strings.py

    import os

    def replace_strings_in_file(file_path, strings_to_replace):
        # 检查文件是否存在
        if not os.path.exists(file_path):
            print(f"文件 {file_path} 不存在。")
            return
        
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 替换指定的字符串
        for string in strings_to_replace:
            content = content.replace(string, '')

        # 将修改后的内容写回到文件中
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"文件 {file_path} 中的字符串已成功替换。")

    # 文件路径
    file_path = './web-mobile/assets/main/index.js'

    # 需要替换的字符串列表
    strings_to_replace = [
        'http://private-link1.com',  # 替换 http 私有链接
        'http://private-link2.com',  # 替换 http 私有链接
        # 可以添加更多需要替换的字符串
    ]

    replace_strings_in_file(file_path, strings_to_replace)
    ```

3. **运行打包脚本**：
    - 双击运行 `run.bat` 文件，开始打包过程。

## 注意事项
- 请确保 `replace_strings.py` 中的 `strings_to_replace` 列表包含了所有需要替换的字符串，特别是 4399 平台不允许的 http 私有链接。
- 运行 `run.bat` 文件前，请确保所有文件路径和目录结构正确。

## 许可证
请根据实际情况添加许可证信息。
