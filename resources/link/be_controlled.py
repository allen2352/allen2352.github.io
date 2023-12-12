from link import Server
from pynput import mouse,keyboard
from pynput.keyboard import Key
from os import mkdir,listdir
from os.path import isdir
from time import time,sleep
from pyautogui import screenshot
from threading import Thread
server=Server(2)
server.wait_linked()
exit=False

m_ctr=mouse.Controller()
k_ctr=keyboard.Controller()
key_dict={'up':Key.up,'down':Key.down,'left':Key.left,'right':Key.right,'space':Key.space,'ctrl_l':Key.ctrl_l,
          'ctrl_r':Key.ctrl_r,'shift':Key.shift,'alt_l':Key.alt_l,'alt_gr':Key.alt_gr,'esc':Key.esc,
          'cmd':Key.cmd,'num_lock':Key.num_lock,'enter':Key.enter,'caps_lock':Key.caps_lock,'tab':Key.tab,
          'backspace':Key.backspace,'delete':Key.delete,'print_screen':Key.print_screen,'insert':Key.insert,
          'cmd_r':Key.cmd_r,'alt':Key.alt,'end':Key.end,'ctrl':Key.ctrl,'home':Key.home,' media_next':Key.media_next,
          ' media_play_pause':Key. media_play_pause,'media_previous':Key.media_previous,'media_volume_down':Key.media_volume_down,
          'media_volume_mute':Key.media_volume_mute,'media_volume_up':Key.media_volume_up,'menu':Key.menu,'shift_r':Key.shift_r,
          'f1':Key.f1,'f2':Key.f2,'f3':Key.f3,'f4':Key.f4,'f5':Key.f5,'f6':Key.f6,'f7':Key.f7,'f8':Key.f8,'f9':Key.f9,
          'f10':Key.f10,'f11':Key.f11,'f12':Key.f12,'f13':Key.f13,'f14':Key.f14,'f15':Key.f15,'f16':Key.f16,'f17':Key.f17,
          'f18':Key.f18,'f19':Key.f19,'f20':Key.f20,'f21':Key.f21,'f22':Key.f22,'f23':Key.f23,'f24':Key.f24,}
while not exit:
    command=server.recv_text()
    k=0
    n=len(command)
    while k<n:
        end=command.index('$',k)
        cmd=command[k:end].split(',')
      #  print('接收到:',cmd)
        if cmd[0]=='move':
            position=(int(cmd[1]),int(cmd[2]))
            print('定位至',position)
            m_ctr.position=position
        elif cmd[0]=='click':
            position = (int(cmd[1]), int(cmd[2]))
            button_type=cmd[3].split('.')[-1]
            button=None
            if button_type=='left':
                button=mouse.Button.left
            elif button_type=='right':
                button=mouse.Button.right
            elif button_type=='middle':
                button=mouse.Button.middle
            if button!=None:
                if cmd[4]=='True':
                    print('按下',position,button)
                    m_ctr.press(button)
                elif cmd[4]=='False':
                    print('放開',position,button)
                    m_ctr.release(button)
        elif cmd[0]=='scroll':
            position = (int(cmd[1]), int(cmd[2]))
            dx=int(cmd[3])
            dy=int(cmd[4])
            print('滑動:',dx,dy)
            m_ctr.scroll(dx, dy)
        elif cmd[0]=='press':
            if 'Key.'==cmd[1][:4]:   #代表是特殊鍵
                skey=cmd[1][4:]
                print('press,skey=',skey)
                k_ctr.press(key_dict[skey])
            else:
                char=cmd[1][1:-1]     #去除"'"
                print('press:key=',char)
                k_ctr.press(char)
        elif cmd[0]=='release':
            if 'Key.'==cmd[1][:4]:   #代表是特殊鍵
                skey=cmd[1][4:]
                print('release,skey=',skey)
                k_ctr.release(key_dict[skey])
            else:
                char=cmd[1][1:-1]
                print('release:key=',char)
                k_ctr.release(char)
        #-----------------------------------------------
        elif cmd[0]=='send_file':
            filename=cmd[1]
            filesize=int(cmd[2])
            speed=int(cmd[3])
            if 'resources' not in listdir():
                mkdir('resources')
            f = open(f'resources/{filename}', 'wb')
            recv=0
            server.send_text('ok')
            print('正在等待檔案...',cmd[1])
            while recv<filesize:
                byte=server.recv(speed)
                recv+=len(byte)
                f.write(byte)
                process = int(30 * recv / filesize)
                print(f'[' + '▇' * process + ' ' * (30 - process) + f']{round(100 * recv / filesize, 1)}%\r',end='')
              #  server.send(b'continue')
            print('\n檔案接受完成')
            server.send_text('ok')       #傳送ok訊息
            f.close()
        elif cmd[0]=='live_stream':
            def send_screenshot():
                myScreenshot = screenshot(region=(0, 0, 1920, 1080))
                myScreenshot.save('tem.png')
                screen_bytes=open('tem.png','rb').read()           #myScreenshot.tobytes()
                server.send_text(str(len(screen_bytes)),channel=1)
                continue_cmd=server.recv(channel=1)
                server.send(screen_bytes,channel=1)
                ok=server.recv(channel=1)
            Thread(target=send_screenshot).start()
        elif cmd[0]=='creat_folder':
            filename=cmd[1]
            if not isdir(f'resources/{filename}'):
                mkdir(f'resources/{filename}')
            server.send_text('ok')  # 傳送ok訊息
        elif cmd[0]=='exit':
            print('接受到離開命令')
            exit=True
            break
        k=end+1
print('\n')
k=3
while k>0:
    print(f'遠端連線已被關閉，本程式將於{k}秒後自動關閉\r',end='')
    sleep(1)
    k-=1
print('\n')
