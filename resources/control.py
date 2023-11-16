from link import Client
from pynput import mouse,keyboard
from time import time,sleep
from os import listdir
from os.path import isdir,isfile,getsize
from wx import Frame,Panel,Bitmap,StaticBitmap,RESIZE_BORDER,App
from threading import Thread
print('請輸入連線位址:')
#link_address='192.168.31.82:5000'
#link_address='192.168.171.130:5000'
link_address='192.168.31.94:5000'
client=Client(2)
client.link(link_address)
control_rect=[0,0,1920,1080]#[50,30,1770,1000]     #控制方形(自己相機的x,y,w,h)
be_controlled_size=(1920,1080)     #被控制方的螢幕大小
def transform_position(x,y):
    return (int(be_controlled_size[0]*(x-control_rect[0])/control_rect[2]),int(be_controlled_size[1]*(y-control_rect[1])/control_rect[3]))
class Mouse_listener:
    def __init__(self):
        def on_move(x,y):
            if control_mode == 1:
                if time()>self.move_t:
                    print('move',x,y)
                    self.move_t=time()+0.2
                    x,y=transform_position(x,y)
                    client.send_text(f'move,{x},{y}$')
        def on_click(x,y,button,pressed):
            if control_mode == 1:
                print('click',x,y,button,pressed)
                x, y = transform_position(x, y)
                client.send_text(f'click,{x},{y},{button},{pressed}$')
        def on_scroll(x,y,dx,dy):
            if control_mode == 1:
                print('scroll',x,y,dx,dy)
                x, y = transform_position(x, y)
                client.send_text(f'scroll,{x},{y},{dx},{dy}$')
        self.move_t=0
        self.listener = mouse.Listener(on_move=on_move,on_click=on_click,on_scroll=on_scroll)
    def start(self):
        self.listener.start()
class Keyboard_listener:
    def __init__(self):
        def on_press(key):
            global control_mode
            if control_mode==1:
                print('press',key)
                if key==keyboard.Key.esc:
                    control_mode=0
                    print('關閉控制模式')
                else:
                    client.send_text(f'press,{key}$')  #此處key可能有包含"'"
        def on_release(key):
            if control_mode == 1:
                print(f'{key} release')
                client.send_text(f'release,{key}$')
        self.listener = keyboard.Listener(on_press=on_press,on_release=on_release)
    def start(self):
        self.listener.start()
def transform_speed(speed):
    units=('MB','KB','B')
    for i in range(3):
        unit_size=2**(10*(2-i))
        if speed>unit_size:
            return f'{round(speed/unit_size,2)}{units[i]}'
def transform_time(tim):
    units = ('時', '分', '秒')
    time_box=[]
    for i in range(3):
        unit_size = 60**(2-i)
        quo=int(tim//unit_size)
        if quo>0 or i==2:
            time_box.append(f'{quo}{units[i]}')
        tim-=quo*unit_size
    return ''.join(time_box)
mler=Mouse_listener()
kler=Keyboard_listener()
mler.start()
kler.start()
control_mode=0          #0:選擇模式，1:鍵盤屬標控制模式
def send_file(filepath,filename,hint=''):
    filesize = getsize(filepath)
    speed = 2 ** 16
    client.send_text(f'send_file,{filename},{filesize},{speed}$')
    print('正在等待回應...\r',end='')
    ok = client.recv()
    print('正在傳送檔案...', filepath)
    total = 0
    speed_box = []  # 計算平均傳輸速率
    speed_size=0
    with open(filepath, 'rb') as f:
        st = time()
        while total < filesize:
            send_size = client.send(f.read(speed))
            speed_size+=send_size
            total += send_size
            process = int(30 * total / filesize)
            interval=time() - st
            if interval>0.5 or total>=filesize:
                if interval==0:
                    send_speed=speed_size
                else:
                    send_speed = speed_size / interval
                speed_size=0
                st=time()
                speed_box.append(send_speed)
                if len(speed_box) > 30:
                    del speed_box[0]
                average_speed = sum(speed_box) / len(speed_box)
                process_line=f'[' + '▇' * process + ' ' * (30 - process) + f']{round(100 * total / filesize, 1)}%'
                p_space=' '*(43-len(process_line))
                speed_line=f'speed={transform_speed(average_speed)}/s'
                s_space=' '*(20-len(speed_line))
                remain_line=f'尚須{transform_time((filesize - total) / average_speed)}'
                r_space=' '*(15-len(remain_line))
                print(f'{process_line}{p_space}{speed_line}{s_space}{remain_line}{r_space}{hint}\r',end='')
    print('\n等待ok訊息...',end='')
    ok=client.recv()
    print('\r傳送完成          ')
def get_all_file(folder_path):
    def get_all(road):
        o=listdir(road)
        for i in o:
            file=f'{road}/{i}'
            filename=file[skip_n:]
            if isfile(file):
                cmd_box.append((0,file,filename))
            elif isdir(file):
                cmd_box.append((1,filename))
                get_all(file)
    folder_path=folder_path.replace('\\','/')
    root_folder=folder_path.split('/')[-1]
    skip_n=len(folder_path)-len(root_folder)
    cmd_box=[(1,root_folder)]
    get_all(folder_path)
    return cmd_box
hint='''----------------------------
請命令:
send filename   =>傳送檔案
control         =>控制鍵盤鼠標
live            =>開啟直播串流
exit            =>關閉連線
'''
print(hint)
while True:
    a=input()
    if len(a)>0:
        cmd=a.split(' ')
        if cmd[0]=='control':
            control_mode=1
            print('已開啟控制模式，按下enter關閉...')
            while control_mode==1:
                sleep(0.5)
            print('控制模式已關閉')
            control_mode=0
        elif cmd[0] == 'live':
            def update_screen():
                while start_live:
                    client.send_text('live_stream$',channel=0)    #從0進入
                    filesize=int(client.recv_text(channel=1))
                   # print(filesize)
                    client.send_text('continue$',channel=1)
                    screen_byte=client.recv(filesize,channel=1)
                    f=open('tem.png','wb')
                    f.write(screen_byte)
                    f.close()
                    try:
                        image.SetBitmap(Bitmap("tem.png"))
                    except:pass
                    client.send_text('ok',channel=1)
                    sleep(0.1)
            start_live=True
            control_mode=1
            app=App()
            frame=Frame(None, title='live streaming',pos=(0,0),size=(1280,720))
            image=StaticBitmap(frame,bitmap=Bitmap("screenshot/tem.png"))
            frame.ShowFullScreen(True)
            Thread(target=update_screen).start()
            app.MainLoop()
            control_mode=0
            start_live=False
        elif cmd[0]=='send':
            filepath=a[5:]
            if isfile(filepath):
                send_file(filepath,filepath.replace('\\','/').split('/')[-1])
            elif isdir(filepath):
                cmd_box=get_all_file(filepath)
                k=1
                n=len(cmd_box)
                cmds=('send_file','creat_folder')
                for line in cmd_box:
                    if line[0]==0:
                        send_file(line[1],line[2],hint=f'檔案數:{k}/{n}')
                    elif line[0]==1:
                        client.send_text(f'creat_folder,{line[1]}$')
                        print(f'創建:   {line[1]}   資料夾     檔案數:{k}/{n}')
                        ok=client.recv()
                    k+=1
            else:
                print('檔案路徑不存在!')
        elif cmd[0]=='exit':
            print('離開')
            client.send_text('exit$')
            break
print('exit')
#client.send_text('exit$')
