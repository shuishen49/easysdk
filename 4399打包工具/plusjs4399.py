import os
import sys

class InsertLine(object):
    def __init__(self, file, keyword, newline):
        self.__file = file
        self.__key = keyword
        self.__newline = newline

    def _get_specify_lineno(self):
        i = 1
        try:
            with open(self.__file, 'r', encoding='utf-8') as f:
                while True:
                    line = f.readline()
                    if not line:
                        break
                    if self.__key in line:
                        return i
                    i += 1
        except IOError as e:
            print(e.strerror + ' "%s"' % e.filename)
            sys.exit(1)

    def _check_existing(self):
        try:
            with open(self.__file, 'r', encoding='utf-8') as f:
                for line in f:
                    if self.__newline in line:
                        return True
            return False
        except IOError as e:
            print(e.strerror + ' "%s"' % e.filename)
            sys.exit(1)

    def _inserted_newline_list(self):
        line_no = self._get_specify_lineno()
        if line_no:
            with open(self.__file, 'r', encoding='utf-8') as f:
                li = f.readlines()
            li.insert(line_no, self.__newline + os.linesep)
            return li

    def inserted_new_file(self):
        if self._check_existing():
            print('The script tag already exists.')
            return

        lines = self._inserted_newline_list()
        if lines:
            # 直接写入修改后的文件
            with open(self.__file, 'w', encoding='utf-8') as f:
                f.writelines(lines)
        else:
            print('No such keyword "%s"' % self.__key)

def _main():
    # 获取当前运行路径
    current_path = os.getcwd()

    # 构建 web-mobile 文件夹路径
    web_mobile_path = os.path.join(current_path, 'web-mobile', 'index.html')

    file = InsertLine(
        web_mobile_path,
        "<body>",
        "<script src=\"https://h.api.4399.com/h5mini-2.0/h5api-interface.php\"></script>"
    )
    file.inserted_new_file()

if __name__ == "__main__":
    _main()
