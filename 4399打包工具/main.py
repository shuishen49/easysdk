import subprocess
import os

def run_script(script_name):
    try:
        subprocess.run(["python", script_name], check=True)
        print(f"{script_name} executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while executing {script_name}: {e}")

if __name__ == "__main__":
    # 获取当前运行路径
    current_path = os.getcwd()

    # 脚本路径
    scripts = ["plusjs4399.py", "rename_cconb_files.py", "replace_strings.py", "zip_web_mobile.py"]

    # 依次执行每个脚本
    for script in scripts:
        script_path = os.path.join(current_path, script)
        run_script(script_path)
