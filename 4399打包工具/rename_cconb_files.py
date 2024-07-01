import os

def find_file(file_path):
    if os.path.isfile(file_path):
        portion = os.path.splitext(file_path)
        if portion[1] == '.cconb':
            newname = portion[0] + '._cconb.dbbin'
            os.rename(file_path, newname)
    else:
        for file_ls in os.listdir(file_path):
            find_file(os.path.join(file_path, file_ls))

# 获取当前运行路径
current_path = os.getcwd()

# 构建 web-mobile 文件夹路径
web_mobile_path = os.path.join(current_path, 'web-mobile')

# 执行文件名修改
find_file(web_mobile_path)
