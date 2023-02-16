# %%
TARGET_DIR = 'term2/'
import os,re
from bs4 import BeautifulSoup

# %%
def handle_html(file):
    tree = BeautifulSoup(open(file,encoding='utf-8'))
    qs = tree.select('.questionLi')
    store = []
    for one in qs:
        question = []
        for q in one:
            str = q.getText()
            if len(str) != 0 and str!='\n':
                str = str.replace('\n','').replace('\t','').replace(' ','')
                question.append(str)
        f = []
        for index,each in enumerate(question):
            if index==2:
                f.append("========")
                each=each.replace('：',':').replace('答案解析:','')
                each=each.split('正确')
                each=each[1]
            f.append(each)
        store.append(f)
    return store

# %%
def split_line(line):
    return re.sub(r'[B-Z]',lambda x: '\n'+x[0],line)

def handle_content(file):
    res = []
    with open(file) as f:
        lines = f.readlines()
        for ln, l in enumerate(lines, start=1):
            l = re.sub('[（）]',lambda x:'(' if x[0]=='（' else ')',l)
            if(ln % 5 == 2):
                res.append(split_line(l))
                continue
            elif(ln % 5 == 3):
                continue
            res.append(l)
    return res

# %%
html_files = []
for file in os.listdir(TARGET_DIR):
    if file.endswith('.html'):
        html_files.append(file)

res = []
for file in html_files:
    res.extend(handle_html(TARGET_DIR + file))

with open(TARGET_DIR + 'answer.txt','w',encoding='utf8') as f:
    for question in res:
        for line in question:
            f.write(line+'\n')
        f.write('\n')

# %%
res = handle_content(TARGET_DIR + 'answer.txt')
with open(TARGET_DIR + 'answer.txt','w') as f:
    for l in res:
        print(l)
        f.write(l)

# %%
answers = []
ans = []
with open(TARGET_DIR + 'answer.txt','r',encoding='utf8') as f:
    l = f.readlines()
    for line in l:
        if line != '\n':
            ans.append(line.replace('\n',''))
        else:
            answers.append(ans.copy())
            ans.clear()
# print(answers)

# %%
store = []
for question in answers:
    q = question[0]
    a = question[-1][3:]
    choice = question[1:-1]
    correct_ans = []
    for char in a:
        if char.lower() == 'a':
            correct_ans.append(0)
        elif char.lower() == 'b':
            correct_ans.append(1)
        elif char.lower() == 'c':
            correct_ans.append(2)
        elif char.lower() == 'd':
            correct_ans.append(3)
        elif char.lower() == 'e':
            correct_ans.append(4)
        elif char.lower() == 'f':
            correct_ans.append(5)
        elif char.lower() == 'g':
            correct_ans.append(6)
    store.append({
        'question': q,
        'choices': choice.copy(),
        'answers':correct_ans.copy()
    })
print(len(store))

# %%
import json
with open(TARGET_DIR + 'store.json','w',encoding='utf8') as f:
    json.dump(store,f,ensure_ascii=False,indent=True)


