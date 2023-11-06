from link import Server
from pynput import mouse,keyboard
from pynput.keyboard import Key

server=Server()
server.wait_linked()
exit=False

m_ctr=mouse.Controller()
k_ctr=keyboard.Controller()
key_dict={'up':Key.up,'down':Key.down,'left':Key.left,'right':Key.right,'space':Key.space,'ctrl_l':Key.ctrl_l,
          'ctrl_r':Key.ctrl_r,'shift':Key.shift,'alt_l':Key.alt_l,'alt_gr':Key.alt_gr,'esc':Key.esc,
          'cmd':Key.cmd,'num_lock':Key.num_lock,'enter':Key.enter,'caps_lock':Key.caps_lock,'tab':Key.tab,
          'backspace':Key.backspace,'delete':Key.delete,'print_screen':Key.print_screen,'insert':Key.insert,}
          #'f0':Key.f0,'f1':Key.f1,'f2':Key.f2,'f3':Key.f3,'f4':Key.f4,'f5':Key.f5,'f6':Key.f6,'f7':Key.f7,'f8':Key.f8,
          #'f9':Key.f9,'f10':Key.f10,'f11':Key.f11,'f12':Key.f12,}
while not exit:
    command=server.recv_text()
    k=0
    n=len(command)
    while k<n:
        end=command.index('$',k)
        cmd=command[k:end].split(',')
        if cmd[0]=='move':
            position=(int(cmd[1]),int(cmd[2]))
            print('定位至',position)
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
                elif cmd[4]=='False':
                    print('放開',position,button)
        elif cmd[0]=='scroll':
            position = (int(cmd[1]), int(cmd[2]))
            dx=int(cmd[3])
            dy=int(cmd[4])
            print('滑動:',dx,dy)
        elif cmd[0]=='press':
            if 'Key.'==cmd[1][:4]:   #代表是特殊鍵
                skey=cmd[1][4:]
                print('press,skey=',skey)
                k_ctr.press(key_dict[skey])
            else:
                print('press:key=',cmd[1])
                k_ctr.press(cmd[1])
        elif cmd[0]=='release':
            if 'Key.'==cmd[1][:4]:   #代表是特殊鍵
                skey=cmd[1][4:]
                print('release,skey=',skey)
                k_ctr.release(key_dict[skey])
            else:
                print('release:key=',cmd[1])
                k_ctr.release(cmd[1])
        #-----------------------------------------------
        elif cmd[0]=='send_file':
            filename=cmd[1]
            filesize=int(cmd[2])
            speed=int(cmd[3])
            f = open(f'test/{filename}', 'wb')
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
            f.close()
        elif cmd[0]=='exit':
            print('接受到離開命令')
            exit=True
            break
        k=end+1
