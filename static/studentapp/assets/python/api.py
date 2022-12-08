import json
import requests
from pprint import pprint


def writer():
    group_num = [921732]
    # group_num = [921701, 921702, 921703, 921704, 921731, 921732]
    for n in range(0, len(group_num)):
        url = f'https://journal.bsuir.by/api/v1/studentGroup/schedule?studentGroup={group_num[n]}'
        print(url)
        response = requests.get(url)
        # print(response.encoding)
        with open('timetable.json', 'w') as file:
            for piece in response.iter_content(chunk_size=500000):
                print('Successfully!')
                file.write(piece.decode('utf-8'))


writer()


def reader(filename):
    with open(filename, 'r', encoding='windows-1251') as file:
        return json.load(file)


# print(reader('timetable.json'))
# print(reader('timetable.json')['studentGroup']['name'])
# print(reader('timetable.json')['schedules'][0]['schedule'][0])
week_day = reader('timetable.json')['schedules'][0]['schedule'][0]['employee'][0]['photoLink']
print(week_day)
# print(weekday1)
# print(weekday2)
# print(weekday3)
# print(weekday4)
# print(weekday5)
# input()
