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
    'https://tanchidefangkuai.oss-cn-chengdu.aliyuncs.com/',  # 将 string1 替换为空字符串
    'https://tanchidefangkuai.oss-cn-chengdu.aliyuncs.com/share/share.jpg',  # 将 string2 替换为空字符串
    # 可以添加更多需要替换的字符串
]

replace_strings_in_file(file_path, strings_to_replace)
