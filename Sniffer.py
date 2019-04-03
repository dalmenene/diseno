from socket import * #libreria para leer la informacion del puerto
import datetime
import pymysql.cursors
import pytz

IPv4 = ('172.31.92.243' )
Port = 1610  # puerto udp
print("Esperando")
tz = pytz.timezone('Asia/Yekaterinburg')
ServerSock = socket(AF_INET, SOCK_DGRAM)  # creacion del socketServerSock.close((IPv4,Port))
ServerSock.bind((IPv4, Port))

while True:
    
    data, addr = ServerSock.recvfrom(2048)
    data = str(data)
    print(data)
    if data[3:6] == "REV":
        semanas = str(data[8:12])
        semana = float(semanas)
        dia = str(data[12])
        dian = float(dia)
        hora = str(data[13:18])
        horan = float(hora)
        semanan = semana * 604800 + horan + 315964800 + dian * 86400 - 18000
        print(semanan)
        string = str(datetime.datetime.fromtimestamp(int(semanan)))
        fecha = string[2:12]
        hora = string[13:21]
        sem = str(datetime.datetime.fromtimestamp(int(semanan),tz))
        sem1 = sem[0:18]
        #semm = datetime.datetime.strptime(sem1, "%Y-%m-%d %H:%M:%S")
        #semm = semm.replace(tzinfo=pytz.timezone('UTC'))
        #semm=semm.astimezone(pytz.timezone('America/Bogota'))
        #print(semm)
        latitud = str(data[19:21] + "." + str(data[21:25]))
        longitud = str(data[26:27] + str(data[28:30]) + "." + str(data[30:35]))
        print("Latitud: {}  Longitud: {}   Fecha: {} ".format(latitud, longitud, sem1))
        # BD Connection
        if latitud.find("-") != -1:
            if longitud.find("-") == -1 or or longitud.find(";") == -1:
                print("error no se puede mandar a la base de datos")
            
        if latitud.find("-") == -1:
            if longitud.find("-") != -1 or longitud.find(";") != -1:
                connection = pymysql.connect(host="diseno.cxmeswdphwpd.us-east-1.rds.amazonaws.com", user="dherreraj", passwd="9805jama",
                                     db="diseno")
                MyCursor = connection.cursor()
                sql = "INSERT INTO datosdiseno(Latitud,Longitud,Fecha) VALUES(%s,%s,%s);"
                MyCursor.execute(sql, (latitud, longitud, sem1))
                connection.commit()
                connection.close()