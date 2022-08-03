from socket import gethostname,gethostbyname
from github import Github
from redis import Redis

from os import listdir,stat,mkdir
from os.path import isdir,isfile,getsize

from time import localtime,time,sleep
from win32com.client import Dispatch
from threading import Thread
class Indexer_socket:
    def __init__(self):
        self.name=gethostname()
        self.ip=gethostbyname(self.name)
        self.redis = Redis(host='redis-15004.c124.us-central1-1.gce.cloud.redislabs.com', port=15004,password='jQbuxoNwqIeLVpiEV2XemQo8XXRbEo0W', decode_responses=True)
        self.repo = Github('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').get_user().get_repo('server')
        self.objShell = Dispatch("WScript.Shell")
        self.shortcut=['磁碟','桌面','文件', '最近', '開始', '啟動', '程式集', '所有程式']
        self.send_progress=[0,0] #檔案數,總大小
        self.listening=False
        self.link_hostname=None
    def easy_convert(self,string):
        box,o={},string.split('|')
        for i in o:  #key**args|key2**args
            c=i.split('**')
            box[c[0]]=c[1]
        return box
    def easy_convert_back(self,dictionary):
        text=''
        for i in dictionary:
            text+=i+'**'+dictionary[i]+'|'
        return text[:-1]
    def listen(self):
        def displaytime(time):
            try:
                t = localtime(time)
                return f'{t.tm_year}/{t.tm_mon}/{t.tm_mday}/{t.tm_hour}:{t.tm_min}:{t.tm_sec}'
            except:return time
        def listening():
            try:now_servers = self.easy_convert(self.redis.get('servers'))
            except:now_servers = {}
            now_servers[self.ip] = 'wait'
            self.redis.set('servers', self.easy_convert_back(now_servers))
            while self.listening:
                sleep(1)
                now_servers = self.easy_convert(self.redis.get('servers'))
                if now_servers[self.ip] != 'wait':
                    self.listenbox+=[now_servers[self.ip]]
                    self.redis.set(now_servers[self.ip],'ok')
                    now_servers[self.ip]='wait'
                    self.redis.set('servers', self.easy_convert_back(now_servers))
                for ip in self.listenbox:
                    cmd=self.redis.get(ip).split('**')
                    if cmd[0] == 'listdir':
                        box = ''
                        if cmd[1] == '':
                            for disk in 'CDE':
                                try:
                                    e = listdir(f'{disk}:/')
                                    box += f'{disk}:|'
                                except:break
                        else:
                            if cmd[1][-1] == ':': cmd[1] += '/'
                            for i in listdir(cmd[1]):
                                if isdir(f'{cmd[1]}/{i}'):
                                    box += i + '|'
                                elif isfile(f'{cmd[1]}/{i}'):
                                    box += f'{i}**' + str(getsize(f'{cmd[1]}/{i}')) + '**' + displaytime(stat(f'{cmd[1]}/{i}').st_mtime) + '|'
                        self.redis.set(self.ip+'-'+ip,box)
                        self.redis.set(ip,'ok')
        self.listening=True
        self.listenbox=[]
        Thread(target=listening).start()
    def connect(self,ip):
        now_servers = self.easy_convert(self.redis.get('servers'))
        self.link_ip=ip
        now_servers[ip]=self.ip
        self.redis.set('servers', self.easy_convert_back(now_servers))
    def listdir(self,folderpath):
        self.redis.set(self.ip,f'listdir**{folderpath}')
        while True:
            sleep(0.2)
            if self.redis.get(self.ip)=='ok':break
        box, text = [],self.redis.get(self.link_ip+'-'+self.ip).split('|')
        for i in text:
            c = i.split('**')
            if len(c) == 1:
                box += [c]
            else:box += [(c[0], int(c[1]), c[2])]
        return box
if __name__ == '__main__':
    iso=Indexer_socket()
    print(iso.ip)
    iso.listen()
    a=input()
    iso.listening=False
    print('連線結束')

