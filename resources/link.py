from socket import socket,AF_INET,SOCK_STREAM,gethostname,gethostbyname,SOL_SOCKET,SO_REUSEADDR
class Server:
    def __init__(self):
        self.server=None
    def wait_linked(self):       #等待自己被連線
        my_ip=gethostbyname(gethostname())
        print(f'連線位址:{my_ip}:5000')
        print('正在等待連線...')
        self.listener=socket(AF_INET,SOCK_STREAM)
        self.listener.setsockopt(SOL_SOCKET,SO_REUSEADDR, 1)
        self.listener.bind((my_ip,5000))
        self.listener.listen(5)
        self.server, addr = self.listener.accept()
        print('connected by ' + str(addr))
    def send(self,byte_msg):
        return self.server.send(byte_msg)
    def recv(self,number=1024):
        return self.server.recv(number)
    def send_text(self,msg):
        return self.server.send(msg.encode('utf-8'))
    def recv_text(self,number=1024):
        return self.server.recv(number).decode('utf-8')

class Client:           #簡易連接器
    def __init__(self):
        self.client=None
    def link(self,address):
        host,post=address.split(':')
        self.client=socket(AF_INET,SOCK_STREAM)
        self.client.connect((host,int(post)))
        print(f'連線 {address} 成功!\n')
    def send(self, byte_msg):
        return self.client.send(byte_msg)
    def recv(self, number=1024):
        return self.client.recv(number)
    def send_text(self, msg):
        return self.client.send(msg.encode('utf-8'))
    def recv_text(self, number=1024):
        return self.client.recv(number).decode('utf-8')