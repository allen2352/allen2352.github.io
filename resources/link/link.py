from socket import socket,AF_INET,SOCK_STREAM,gethostname,gethostbyname,SOL_SOCKET,SO_REUSEADDR
class Server:
    def __init__(self,channel=1):
        self.channel=channel
        self.servers=[None]*channel
    def wait_linked(self):       #等待自己被連線
        my_ip=gethostbyname(gethostname())
        print(f'連線位址:{my_ip}:5000')
        print('正在等待連線...')
        self.listener=socket(AF_INET,SOCK_STREAM)
        self.listener.setsockopt(SOL_SOCKET,SO_REUSEADDR, 1)
        self.listener.bind((my_ip,5000))
        self.listener.listen(self.channel)
        for i in range(self.channel):
            self.servers[i],addr = self.listener.accept()
            print('connected by ' + str(addr))
    def send(self,byte_msg,channel=0):
        return self.servers[channel].send(byte_msg)
    def recv(self,number=1024,channel=0):
        return self.servers[channel].recv(number)
    def send_text(self,msg,channel=0):
        return self.servers[channel].send(msg.encode('utf-8'))
    def recv_text(self,number=1024,channel=0):
        return self.servers[channel].recv(number).decode('utf-8')
class Client:           #簡易連接器
    def __init__(self,channel=1):
        self.channel=channel
        self.clients=[None]*channel
    def link(self,address):
        host,post=address.split(':')
        for i in range(self.channel):
            self.clients[i]=socket(AF_INET,SOCK_STREAM)
            self.clients[i].connect((host,int(post)))
            print(f'連線 {address} 成功!\n')
    def send(self, byte_msg,channel=0):
        return self.clients[channel].send(byte_msg)
    def recv(self, number=1024,channel=0):
        return self.clients[channel].recv(number)
    def send_text(self, msg,channel=0):
        return self.clients[channel].send(msg.encode('utf-8'))
    def recv_text(self, number=1024,channel=0):
        return self.clients[channel].recv(number).decode('utf-8')