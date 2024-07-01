import os
import zipfile

def zipdir(path, ziph):
    # ziph 是 zipfile.ZipFile 对象
    for root, dirs, files in os.walk(path):
        for file in files:
            # 将文件写入 zip 文件，并排除顶级目录
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, path)
            ziph.write(file_path, arcname)

# 获取当前运行路径
current_path = os.getcwd()

# 构建 web-mobile 文件夹路径
web_mobile_path = os.path.join(current_path, 'web-mobile')

# 构建 zip 文件路径
zip_file_path = os.path.join(current_path, 'web-mobile.zip')

# 创建 zip 文件并写入内容
with zipfile.ZipFile(zip_file_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipdir(web_mobile_path, zipf)

print(f"web-mobile 文件夹已成功打包成 {zip_file_path}")
